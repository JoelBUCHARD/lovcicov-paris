import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { products as localProducts } from '@/data/products';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';
import {
  useProductVisibility,
  setProductVisible,
  localKey,
  shopifyKey,
  type VisibilityKey,
} from '@/hooks/useProductVisibility';

type Row = {
  key: VisibilityKey;
  name: string;
  collection: string;
  source: 'Locale' | 'Shopify';
  link: string;
};

const ARIAL = 'Arial, sans-serif';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [filter, setFilter] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const { isVisible, loading: visLoading } = useProductVisibility();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);
      const admin = !!roles?.some((r) => r.role === 'admin');
      setIsAdmin(admin);
      setAuthChecked(true);
    })();
  }, [navigate]);

  useEffect(() => {
    fetchShopifyProducts(100).then(setShopifyProducts).catch(() => setShopifyProducts([]));
  }, []);

  const rows: Row[] = useMemo(() => {
    const result: Row[] = [];
    const seen = new Set<string>();

    for (const p of localProducts) {
      const k = localKey(p.id);
      seen.add(k);
      result.push({
        key: k,
        name: p.name,
        collection:
          p.collection === 'mystic' ? 'MysticLov'
          : p.collection === 'bijoux' ? 'StoneLov'
          : 'PowerLov',
        source: 'Locale',
        link: `/shop/${p.id}`,
      });
    }

    for (const sp of shopifyProducts) {
      const handle = sp.node.handle;
      // If a local product already covers this handle as its detail page,
      // we still expose the Shopify entry separately for shopify-only detail visibility.
      const k = shopifyKey(handle);
      if (seen.has(k)) continue;
      seen.add(k);
      result.push({
        key: k,
        name: sp.node.title,
        collection: sp.node.productType || '—',
        source: 'Shopify',
        link: `/product/${handle}`,
      });
    }

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [shopifyProducts]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.collection.toLowerCase().includes(q) ||
        r.key.toLowerCase().includes(q)
    );
  }, [rows, filter]);

  const handleToggle = async (key: VisibilityKey, next: boolean) => {
    setUpdating(key);
    try {
      await setProductVisible(key, next);
      toast.success(next ? 'Produit visible' : 'Produit masqué');
    } catch (e: any) {
      toast.error('Erreur', { description: e?.message ?? 'Impossible de mettre à jour.' });
    } finally {
      setUpdating(null);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-40 px-6 text-center text-sm text-muted-foreground">Chargement…</main>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-40 px-6 text-center">
          <h1 className="text-2xl font-light mb-4" style={{ fontFamily: ARIAL }}>Accès restreint</h1>
          <p className="text-sm text-muted-foreground">Cette page est réservée aux administrateurs.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24 px-6 md:px-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.22em] uppercase mb-3" style={{ fontFamily: ARIAL, color: '#888780' }}>
            Administration
          </p>
          <h1 className="italic" style={{ fontFamily: ARIAL, fontSize: 32, fontWeight: 200, color: '#1A1A1A' }}>
            Visibilité des produits
          </h1>
          <p className="text-[12px] mt-3 max-w-xl mx-auto" style={{ fontFamily: ARIAL, color: '#5F5E5A' }}>
            Activez ou désactivez l'affichage de chaque produit sur la boutique. Les produits masqués
            restent dans la base de données et peuvent être réactivés à tout moment.
          </p>
        </div>

        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Rechercher un produit…"
          className="w-full mb-6 px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground"
          style={{ fontFamily: ARIAL }}
        />

        {visLoading ? (
          <p className="text-center text-sm text-muted-foreground py-12">Chargement de la visibilité…</p>
        ) : (
          <div className="border border-border">
            <div
              className="hidden md:grid grid-cols-[1fr_140px_100px_120px] gap-4 px-4 py-3 border-b border-border text-[10px] uppercase tracking-[0.15em]"
              style={{ fontFamily: ARIAL, color: '#888780' }}
            >
              <span>Produit</span>
              <span>Collection</span>
              <span>Source</span>
              <span className="text-right">Visible</span>
            </div>
            {filtered.map((r) => {
              const visible = isVisible(r.key);
              return (
                <div
                  key={r.key}
                  className="grid grid-cols-1 md:grid-cols-[1fr_140px_100px_120px] gap-2 md:gap-4 px-4 py-4 border-b border-border last:border-b-0 items-center"
                >
                  <div>
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-foreground hover:underline"
                      style={{ fontFamily: ARIAL }}
                    >
                      {r.name}
                    </a>
                    <p className="text-[10px] text-muted-foreground mt-0.5" style={{ fontFamily: ARIAL }}>
                      {r.key}
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground" style={{ fontFamily: ARIAL }}>
                    {r.collection}
                  </span>
                  <span className="text-[11px] text-muted-foreground" style={{ fontFamily: ARIAL }}>
                    {r.source}
                  </span>
                  <div className="flex md:justify-end items-center gap-3">
                    <span className="text-[11px] text-muted-foreground" style={{ fontFamily: ARIAL }}>
                      {visible ? 'Visible' : 'Masqué'}
                    </span>
                    <Switch
                      checked={visible}
                      disabled={updating === r.key}
                      onCheckedChange={(v) => handleToggle(r.key, v)}
                    />
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-12">Aucun produit.</p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminProducts;

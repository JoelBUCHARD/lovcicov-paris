import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { products as localProducts } from '@/data/products';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';
import {
  useProductVisibility,
  setProductsVisible,
  localKey,
  shopifyKey,
  type VisibilityKey,
} from '@/hooks/useProductVisibility';

type Row = {
  id: string;
  keys: VisibilityKey[];
  name: string;
  collection: string;
  source: 'Locale' | 'Shopify' | 'Locale + Shopify';
  link: string;
};

const ARIAL = 'Arial, sans-serif';
const formatCollection = (collection: string) => (
  collection === 'mystic' ? 'MysticLov'
  : collection === 'bijoux' ? 'StoneLov'
  : 'PowerLov'
);

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
    const localRows = new Map<string, Row & { shopifyHandle?: string }>();
    const handleToLocalRows = new Map<string, Set<string>>();
    const shopifyOnlyRows = new Map<string, Row>();

    for (const p of localProducts) {
      const rowId = `local:${p.collection}:${p.name}`;
      const current = localRows.get(rowId);
      const nextKey = localKey(p.id);

      if (current) {
        if (!current.keys.includes(nextKey)) current.keys.push(nextKey);
      } else {
        localRows.set(rowId, {
          id: rowId,
          keys: [nextKey],
          name: p.name,
          collection: formatCollection(p.collection),
          source: 'Locale',
          link: `/shop/${p.id}`,
          shopifyHandle: p.shopifyHandle,
        });
      }

      if (p.shopifyHandle) {
        const linkedRows = handleToLocalRows.get(p.shopifyHandle) ?? new Set<string>();
        linkedRows.add(rowId);
        handleToLocalRows.set(p.shopifyHandle, linkedRows);
      }
    }

    for (const sp of shopifyProducts) {
      const handle = sp.node.handle;
      const linkedRows = [...(handleToLocalRows.get(handle) ?? [])];

      if (linkedRows.length === 1) {
        const row = localRows.get(linkedRows[0]);
        const visibilityKey = shopifyKey(handle);
        if (row && !row.keys.includes(visibilityKey)) {
          row.keys.push(visibilityKey);
          row.source = 'Locale + Shopify';
        }
        continue;
      }

      shopifyOnlyRows.set(handle, {
        id: `shopify:${handle}`,
        keys: [shopifyKey(handle)],
        name: sp.node.title,
        collection: sp.node.productType || '—',
        source: 'Shopify',
        link: `/product/${handle}`,
      });
    }

    return [...localRows.values(), ...shopifyOnlyRows.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [shopifyProducts]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.collection.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.keys.some((key) => key.toLowerCase().includes(q))
    );
  }, [rows, filter]);

   const handleToggle = async (row: Row, next: boolean) => {
    setUpdating(row.id);
    try {
      await setProductsVisible(row.keys, next);
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
      <SEO title="Admin produits — LOVCICOV Paris" description="Espace administration." path="/admin/products" noindex />
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
              const visible = r.keys.every((key) => isVisible(key));
              return (
                <div
                  key={r.id}
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
                      {r.keys.length === 1 ? r.keys[0] : `${r.keys.length} entrées liées`}
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
                      disabled={updating === r.id}
                      onCheckedChange={(v) => handleToggle(r, v)}
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

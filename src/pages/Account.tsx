import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JourneyContinuation from '@/components/JourneyContinuation';
import SEO from '@/components/SEO';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';
import { useWishlistStore } from '@/stores/wishlistStore';
import type { User } from '@supabase/supabase-js';

type Section = 'overview' | 'wishlist' | 'orders' | 'addresses' | 'profile';

const SECTIONS: { id: Section; label: string; subtitle: string }[] = [
  { id: 'overview', label: 'Aperçu', subtitle: 'Votre espace' },
  { id: 'wishlist', label: 'Mes Souhaits', subtitle: 'Votre collection personnelle' },
  { id: 'orders', label: 'Commandes', subtitle: 'Historique et suivi' },
  { id: 'addresses', label: 'Adresses', subtitle: 'Livraison et facturation' },
  { id: 'profile', label: 'Informations', subtitle: 'Votre profil' },
];

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

const getFirstName = (user: User | null) => {
  if (!user) return '';
  const meta = user.user_metadata as { first_name?: string; full_name?: string; name?: string } | undefined;
  return (
    meta?.first_name ||
    meta?.full_name?.split(' ')[0] ||
    meta?.name?.split(' ')[0] ||
    (user.email ? user.email.split('@')[0] : '')
  );
};

const EmptyState = ({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaTo,
}: {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaTo: string;
}) => (
  <div className="border border-border/60 py-20 px-8 text-center">
    <p className="text-brand text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-4">{eyebrow}</p>
    <h3 className="text-[20px] md:text-[24px] font-light tracking-wide mb-4">{title}</h3>
    <p className="text-[13px] text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">{body}</p>
    <Link
      to={ctaTo}
      className="inline-block text-[10px] tracking-[0.24em] uppercase border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
    >
      {ctaLabel}
    </Link>
  </div>
);

const SectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-10 md:mb-14 text-center md:text-left">
    <p className="text-brand text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">{eyebrow}</p>
    <h2 className="text-[22px] md:text-[30px] font-light tracking-wide">{title}</h2>
  </div>
);

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const rawSection = searchParams.get('section');
  const active: Section = (SECTIONS.find((s) => s.id === rawSection)?.id ?? 'overview') as Section;
  const navigate = useNavigate();

  const wishlistHandles = useWishlistStore((s) => s.handles);
  const removeFromWishlist = useWishlistStore((s) => s.remove);
  const [wishlistProducts, setWishlistProducts] = useState<ShopifyProduct[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);
      setIsAdmin(!!roles?.some((r) => r.role === 'admin'));
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Fetch wishlist products when needed
  useEffect(() => {
    if (wishlistHandles.length === 0) {
      setWishlistProducts([]);
      return;
    }
    let cancelled = false;
    setWishlistLoading(true);
    fetchShopifyProducts(250)
      .then((all) => {
        if (cancelled) return;
        const map = new Map(all.map((p) => [p.node.handle, p]));
        setWishlistProducts(
          wishlistHandles.map((h) => map.get(h)).filter((p): p is ShopifyProduct => !!p)
        );
      })
      .catch(() => { if (!cancelled) setWishlistProducts([]); })
      .finally(() => { if (!cancelled) setWishlistLoading(false); });
    return () => { cancelled = true; };
  }, [wishlistHandles]);

  const setSection = (id: Section) => {
    const next = new URLSearchParams(searchParams);
    if (id === 'overview') next.delete('section');
    else next.set('section', id);
    setSearchParams(next, { replace: true });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const firstName = useMemo(() => getFirstName(user), [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10 text-center">
          <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">Chargement…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Mon espace — LOVCICOV Paris"
        description="Votre espace membre LOVCICOV Paris : souhaits, commandes, adresses, informations."
        path="/account"
        noindex
      />
      <Navbar />

      <main className="flex-1 pt-36 md:pt-44 pb-24">
        {/* Welcome header */}
        <section className="px-6 md:px-10 mb-14 md:mb-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-brand text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-4">
              L'Espace Membre
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[26px] md:text-[38px] font-light tracking-wide mb-3"
            >
              Bienvenue{firstName ? `, ${firstName}` : ''}
            </motion.h1>
            <p className="text-[12px] md:text-[13px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Votre univers personnel LOVCICOV. Vos pièces favorites, vos commandes,
              votre histoire avec la Maison.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16">
          {/* Sidebar */}
          <aside aria-label="Navigation compte" className="md:border-r md:border-border/60 md:pr-10">
            <nav className="flex md:flex-col gap-1 md:gap-0 overflow-x-auto md:overflow-visible -mx-6 md:mx-0 px-6 md:px-0 pb-2 md:pb-0">
              {SECTIONS.map((s) => {
                const isActive = s.id === active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSection(s.id)}
                    className={`shrink-0 md:shrink text-left md:py-3 py-2 px-3 md:px-0 border md:border-0 md:border-b md:border-border/40 transition-colors ${
                      isActive
                        ? 'md:border-foreground text-foreground border-foreground'
                        : 'border-border/40 text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    <span className="text-brand text-[11px] tracking-[0.22em] uppercase block">
                      {s.label}
                    </span>
                    <span className="hidden md:block text-[10px] tracking-[0.14em] text-muted-foreground mt-1">
                      {s.subtitle}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden md:block mt-10 pt-6 border-t border-border/40 space-y-3">
              {isAdmin && (
                <Link
                  to="/admin/products"
                  className="block text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  Administration
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </aside>

          {/* Content */}
          <section aria-live="polite" className="min-w-0">
            {active === 'overview' && (
              <>
                <SectionHeader eyebrow="Votre espace" title="Aperçu" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div className="border border-border/60 p-6">
                    <p className="text-brand text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                      Souhaits
                    </p>
                    <p className="text-[26px] font-light mb-4">{wishlistHandles.length}</p>
                    <button
                      type="button"
                      onClick={() => setSection('wishlist')}
                      className="text-[10px] tracking-[0.22em] uppercase border-b border-foreground/70 pb-0.5 hover:opacity-60 transition-opacity"
                    >
                      Voir la collection
                    </button>
                  </div>
                  <div className="border border-border/60 p-6">
                    <p className="text-brand text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                      Commandes
                    </p>
                    <p className="text-[26px] font-light mb-4">0</p>
                    <button
                      type="button"
                      onClick={() => setSection('orders')}
                      className="text-[10px] tracking-[0.22em] uppercase border-b border-foreground/70 pb-0.5 hover:opacity-60 transition-opacity"
                    >
                      Voir l'historique
                    </button>
                  </div>
                </div>

                <div className="border border-border/60 p-6 mb-4">
                  <p className="text-brand text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">Email</p>
                  <p className="text-[13px] text-foreground">{user?.email}</p>
                </div>
                <div className="border border-border/60 p-6">
                  <p className="text-brand text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                    Membre depuis
                  </p>
                  <p className="text-[13px] text-foreground">{formatDate(user?.created_at)}</p>
                </div>

                <div className="md:hidden mt-10 pt-6 border-t border-border/40 flex flex-col gap-3">
                  {isAdmin && (
                    <Link
                      to="/admin/products"
                      className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Administration
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Se déconnecter
                  </button>
                </div>
              </>
            )}

            {active === 'wishlist' && (
              <>
                <SectionHeader eyebrow="Votre collection personnelle" title="Mes Souhaits" />
                {wishlistLoading && (
                  <p className="text-center text-[10px] tracking-[0.22em] uppercase text-muted-foreground py-16">
                    Chargement de votre collection…
                  </p>
                )}
                {!wishlistLoading && wishlistProducts.length === 0 && (
                  <EmptyState
                    eyebrow="Votre collection s'écrit ici"
                    title="Aucun souhait pour le moment"
                    body="Ajoutez les pièces qui vous ressemblent depuis nos univers PowerLov, MysticLov et StoneLov. Elles vous attendront ici."
                    ctaLabel="Découvrir les collections"
                    ctaTo="/shop"
                  />
                )}
                {!wishlistLoading && wishlistProducts.length > 0 && (
                  <>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-8">
                      {wishlistProducts.length} pièce{wishlistProducts.length > 1 ? 's' : ''} choisie{wishlistProducts.length > 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-12">
                      {wishlistProducts.map((p, i) => (
                        <div key={p.node.id} className="flex flex-col">
                          <ShopifyProductCard product={p} index={i} />
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(p.node.handle)}
                            className="mt-3 self-center text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Retirer
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {active === 'orders' && (
              <>
                <SectionHeader eyebrow="Votre histoire avec la Maison" title="Commandes" />
                <EmptyState
                  eyebrow="Votre premier chapitre"
                  title="Aucune commande pour l'instant"
                  body="Chaque pièce LOVCICOV est une intention. Lorsque vous choisirez la vôtre, elle apparaîtra ici, soigneusement archivée."
                  ctaLabel="Entrer dans l'univers"
                  ctaTo="/shop"
                />
              </>
            )}

            {active === 'addresses' && (
              <>
                <SectionHeader eyebrow="Livraison et facturation" title="Adresses" />
                <EmptyState
                  eyebrow="En préparation"
                  title="Bientôt disponible"
                  body="La gestion de vos adresses arrive prochainement. En attendant, elles sont enregistrées en toute discrétion lors de votre commande."
                  ctaLabel="Retour à l'aperçu"
                  ctaTo="/account"
                />
              </>
            )}

            {active === 'profile' && (
              <>
                <SectionHeader eyebrow="Votre profil" title="Informations personnelles" />
                <div className="space-y-4">
                  <div className="border border-border/60 p-6">
                    <p className="text-brand text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">Email</p>
                    <p className="text-[13px] text-foreground">{user?.email}</p>
                  </div>
                  <div className="border border-border/60 p-6">
                    <p className="text-brand text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                      Identifiant membre
                    </p>
                    <p className="text-[11px] text-muted-foreground font-mono break-all">{user?.id}</p>
                  </div>
                  <div className="border border-border/60 p-6">
                    <p className="text-brand text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                      Membre depuis
                    </p>
                    <p className="text-[13px] text-foreground">{formatDate(user?.created_at)}</p>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;

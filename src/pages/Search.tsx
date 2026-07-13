import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import SEO from '@/components/SEO';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';
import { useProductVisibility, shopifyKey } from '@/hooks/useProductVisibility';
import { products as siteProducts } from '@/data/products';

const siteHandles = new Set(
  siteProducts.map((p) => p.shopifyHandle).filter((h): h is string => !!h)
);

const UNIVERSES = [
  { to: '/powerlov', label: 'PowerLov', tagline: 'Force · Discipline · Énergie' },
  { to: '/mysticlov', label: 'MysticLov', tagline: 'Intuition · Mystère · Douceur' },
  { to: '/stonelov', label: 'StoneLov', tagline: 'Pierres · Vibrations · Rituel' },
  { to: '/sacs', label: 'LOVBAG', tagline: 'Cuir tressé · Fait main' },
];

const EDITORIAL_LINKS = [
  { to: '/manifeste', label: 'Le Manifeste' },
  { to: '/fondatrice', label: 'La Fondatrice' },
  { to: '/drops', label: 'Les Drops' },
  { to: '/le-cercle', label: 'Le Cercle' },
];

const SUGGESTIONS = ['T-shirt', 'Hoodie', 'PowerLov', 'MysticLov', 'Pierre', 'Sac', 'Noir', 'Naturel'];

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') ?? '';
  const [input, setInput] = useState(initialQ);
  const [query, setQuery] = useState(initialQ);
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isVisible } = useProductVisibility();

  useEffect(() => {
    setInput(initialQ);
    setQuery(initialQ);
  }, [initialQ]);

  // Fetch products once — used for both suggestions grid and search results
  useEffect(() => {
    let cancelled = false;
    setInitialLoading(true);
    fetchShopifyProducts(250)
      .then((data) => { if (!cancelled) setAllProducts(data); })
      .catch(() => { if (!cancelled) setAllProducts([]); })
      .finally(() => { if (!cancelled) setInitialLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const visibleAll = useMemo(
    () =>
      allProducts
        .filter((p) => siteHandles.has(p.node.handle))
        .filter((p) => isVisible(shopifyKey(p.node.handle))),
    [allProducts, isVisible]
  );

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return [];
    const q = normalize(trimmed);
    return visibleAll.filter((p) => {
      const node: any = p.node;
      const haystacks: string[] = [
        node.title ?? '',
        node.description ?? '',
        node.productType ?? '',
        node.vendor ?? '',
        node.handle ?? '',
        ...(Array.isArray(node.tags) ? node.tags : []),
      ];
      return haystacks.some((s) => normalize(String(s)).includes(q));
    });
  }, [trimmed, visibleAll]);

  // Live-typed suggestions (top 4 matches)
  const liveSuggestions = useMemo(() => {
    const v = input.trim();
    if (!v || v === query) return [];
    const q = normalize(v);
    return visibleAll
      .filter((p) => normalize(p.node.title).includes(q))
      .slice(0, 4);
  }, [input, query, visibleAll]);

  const bestSellers = visibleAll.slice(0, 4);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const runSearch = (v: string) => {
    const t = v.trim();
    setQuery(t);
    setSearchParams(t ? { q: t } : {});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(input);
  };

  const clearInput = () => {
    setInput('');
    runSearch('');
    inputRef.current?.focus();
  };

  const showEmptyState = !trimmed;
  const showNoResults = !!trimmed && !loading && !initialLoading && results.length === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Recherche — LOVCICOV Paris"
        description="Explorez l'univers LOVCICOV Paris : PowerLov, MysticLov, StoneLov, sacs en cuir tressé."
        path="/search"
      />
      <Navbar />

      <main className="flex-1 pt-40 md:pt-48 pb-24">
        {/* Search bar */}
        <section aria-label="Recherche" className="px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-brand text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-8">
              Explorer LOVCICOV
            </p>
            <form onSubmit={handleSubmit} className="relative" role="search">
              <label htmlFor="search-input" className="sr-only">Rechercher</label>
              <SearchIcon
                size={16}
                strokeWidth={1.25}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground/60 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="search-input"
                ref={inputRef}
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Un produit, un univers, une pierre…"
                className="w-full pl-10 pr-10 py-4 bg-transparent border-b border-foreground/20 focus:outline-none focus:border-foreground text-[15px] tracking-wide placeholder:text-foreground/40 placeholder:font-light transition-colors"
                autoComplete="off"
                enterKeyHint="search"
              />
              {input && (
                <button
                  type="button"
                  onClick={clearInput}
                  aria-label="Effacer la recherche"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <X size={15} strokeWidth={1.25} />
                </button>
              )}
            </form>

            {/* Live suggestions dropdown */}
            {liveSuggestions.length > 0 && (
              <ul className="mt-2 text-left bg-card border border-border/60 divide-y divide-border/40">
                {liveSuggestions.map((p) => (
                  <li key={p.node.id}>
                    <button
                      type="button"
                      onClick={() => { setInput(p.node.title); runSearch(p.node.title); }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-[12px] tracking-[0.08em] hover:bg-foreground/[0.03] transition-colors"
                    >
                      <SearchIcon size={12} strokeWidth={1.25} className="text-foreground/40" />
                      <span className="truncate">{p.node.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Popular searches */}
            {showEmptyState && (
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setInput(s); runSearch(s); }}
                    className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-foreground/15 text-foreground/70 hover:border-foreground hover:text-foreground transition-colors rounded-full"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {trimmed && (
          <section aria-label="Résultats de recherche" className="mt-16 px-6 md:px-10">
            <div className="max-w-6xl mx-auto">
              {(loading || initialLoading) && (
                <p className="text-center text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  Recherche en cours…
                </p>
              )}

              {!loading && !initialLoading && results.length > 0 && (
                <>
                  <p className="text-center text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-10">
                    {results.length} résultat{results.length > 1 ? 's' : ''} pour « {trimmed} »
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
                    {results.map((product, i) => (
                      <ShopifyProductCard key={product.node.id} product={product} index={i} />
                    ))}
                  </div>
                </>
              )}

              {showNoResults && (
                <div className="text-center max-w-xl mx-auto">
                  <p className="text-brand text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-4">
                    Aucun résultat pour « {trimmed} »
                  </p>
                  <h2 className="text-[22px] md:text-[26px] font-light tracking-wide mb-10">
                    Poursuivez la découverte
                  </h2>

                  {bestSellers.length > 0 && (
                    <>
                      <p className="text-brand text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-8">
                        Nos pièces phares
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 mb-16 text-left">
                        {bestSellers.map((product, i) => (
                          <ShopifyProductCard key={product.node.id} product={product} index={i} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Empty state — editorial guidance */}
        {showEmptyState && (
          <>
            <section aria-label="Univers LOVCICOV" className="mt-24 px-6 md:px-10">
              <div className="max-w-5xl mx-auto text-center">
                <p className="text-brand text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">
                  Nos univers
                </p>
                <h2 className="text-[22px] md:text-[28px] font-light tracking-wide mb-12">
                  Entrez dans une collection
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                  {UNIVERSES.map((u) => (
                    <Link
                      key={u.to}
                      to={u.to}
                      className="group block py-8 border border-foreground/10 hover:border-foreground/60 transition-colors"
                    >
                      <p className="text-brand text-[13px] tracking-[0.22em] uppercase mb-2 group-hover:opacity-80 transition-opacity">
                        {u.label}
                      </p>
                      <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                        {u.tagline}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {bestSellers.length > 0 && (
              <section aria-label="Pièces phares" className="mt-24 px-6 md:px-10">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <p className="text-brand text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">
                      Sélection
                    </p>
                    <h2 className="text-[22px] md:text-[28px] font-light tracking-wide">
                      Pièces phares
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
                    {bestSellers.map((product, i) => (
                      <ShopifyProductCard key={product.node.id} product={product} index={i} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section aria-label="Éditorial" className="mt-24 px-6 md:px-10">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-brand text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-8">
                  L'univers éditorial
                </p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                  {EDITORIAL_LINKS.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="text-[11px] tracking-[0.22em] uppercase text-foreground/70 hover:text-foreground border-b border-transparent hover:border-foreground/60 pb-1 transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;

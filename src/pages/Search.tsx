import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JourneyContinuation from '@/components/JourneyContinuation';
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';
import { products as siteProducts, type Product } from '@/data/products';

// Human keywords mapped to collections/universes so a search on "PowerLov",
// "mystique", "bijou"… returns the right pieces even if the word is not in
// the product name.
const COLLECTION_ALIASES: Record<Product['collection'], string[]> = {
  standard: ['powerlov', 'power', 'force', 'discipline', 'énergie', 'energie'],
  mystic: ['mysticlov', 'mystic', 'mystique', 'intuition', 'douceur', 'mystere', 'mystère'],
  bijoux: ['stonelov', 'stone', 'pierre', 'pierres', 'bijou', 'bijoux', 'talisman', 'rituel'],
  sacs: ['lovbag', 'sac', 'sacs', 'cuir', 'tressé', 'tresse', 'bag'],
};

const SUBCATEGORY_ALIASES: Record<string, string[]> = {
  tshirt: ['t-shirt', 'tshirt', 'tee'],
  crewneck: ['crewneck', 'sweat', 'sweatshirt', 'pull'],
  hoodie: ['hoodie', 'sweat à capuche', 'sweat a capuche', 'capuche'],
};


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
  const inputRef = useRef<HTMLInputElement>(null);
  const { isVisible, loading: visibilityLoading } = useProductVisibility();

  useEffect(() => {
    setInput(initialQ);
    setQuery(initialQ);
  }, [initialQ]);

  // Base catalogue — the exact pieces displayed on the site (same visibility filter as the shop).
  const visibleAll = useMemo(
    () => siteProducts.filter((p) => isVisible(localKey(p.id))),
    [isVisible]
  );

  const buildHaystack = (p: Product): string => {
    const parts: string[] = [
      p.name,
      p.description ?? '',
      p.collection,
      p.subcategory ?? '',
      ...(p.colors?.map((c) => c.name) ?? []),
      ...(COLLECTION_ALIASES[p.collection] ?? []),
      ...(p.subcategory ? SUBCATEGORY_ALIASES[p.subcategory] ?? [] : []),
    ];
    return normalize(parts.join(' | '));
  };

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return [];
    // Split query into tokens — every token must match somewhere in the haystack.
    const tokens = normalize(trimmed).split(/\s+/).filter(Boolean);
    return visibleAll.filter((p) => {
      const hay = buildHaystack(p);
      return tokens.every((t) => hay.includes(t));
    });
  }, [trimmed, visibleAll]);

  // Live-typed suggestions (top 5 matches) — same logic, based on the current input.
  const liveSuggestions = useMemo(() => {
    const v = input.trim();
    if (!v || v === query) return [];
    const tokens = normalize(v).split(/\s+/).filter(Boolean);
    return visibleAll
      .filter((p) => {
        const hay = buildHaystack(p);
        return tokens.every((t) => hay.includes(t));
      })
      .slice(0, 5);
  }, [input, query, visibleAll]);

  const bestSellers = visibleAll.slice(0, 4);

  const loading = false;
  const initialLoading = visibilityLoading;


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
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => { setInput(p.name); runSearch(p.name); }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-[12px] tracking-[0.08em] hover:bg-foreground/[0.03] transition-colors"
                    >
                      <SearchIcon size={12} strokeWidth={1.25} className="text-foreground/40" />
                      <span className="truncate">{p.name}</span>
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
                      <ProductCard key={product.id} product={product} index={i} />
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
                          <ProductCard key={product.id} product={product} index={i} />
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
                      <ProductCard key={product.id} product={product} index={i} />
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

      <JourneyContinuation />
      <Footer />
    </div>
  );
};

export default SearchPage;

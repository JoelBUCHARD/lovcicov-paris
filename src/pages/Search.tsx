import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') ?? '';
  const [input, setInput] = useState(initialQ);
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setInput(initialQ);
    setQuery(initialQ);
  }, [initialQ]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setSearched(true);
    const q = query.trim();
    const shopifyQuery = `title:*${q}* OR tag:*${q}* OR product_type:*${q}*`;
    fetchShopifyProducts(50, shopifyQuery)
      .then((data) => {
        if (!cancelled) setResults(data);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim();
    setQuery(v);
    setSearchParams(v ? { q: v } : {});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-52 md:pt-56 pb-24 px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-brand text-[11px] tracking-[0.18em] text-muted-foreground mb-6">RECHERCHE</h1>
          <form onSubmit={handleSubmit} className="relative">
            <SearchIcon size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full pl-12 pr-4 py-4 bg-transparent border-b border-border focus:outline-none focus:border-foreground text-sm tracking-wide placeholder:text-muted-foreground transition-colors"
            />
          </form>
        </div>

        <div className="max-w-6xl mx-auto">
          {loading && (
            <p className="text-center text-xs tracking-[0.15em] text-muted-foreground">Recherche en cours…</p>
          )}
          {!loading && searched && results.length === 0 && (
            <p className="text-center text-xs tracking-[0.15em] text-muted-foreground">Aucun produit trouvé pour « {query} »</p>
          )}
          {!loading && results.length > 0 && (
            <>
              <p className="text-center text-[10px] tracking-[0.18em] text-muted-foreground mb-8">
                {results.length} RÉSULTAT{results.length > 1 ? 'S' : ''}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                {results.map((product, i) => (
                  <ShopifyProductCard key={product.node.id} product={product} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;

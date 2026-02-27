import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const collectionParam = searchParams.get('collection');
  const [activeCollection, setActiveCollection] = useState<'all' | 'signature' | 'mystic'>(
    collectionParam === 'mystic' ? 'mystic' : collectionParam === 'signature' ? 'signature' : 'all'
  );

  const filtered = activeCollection === 'all'
    ? products
    : products.filter((p) => p.collection === activeCollection);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-12">Boutique</h1>

          <div className="flex gap-6 mb-16">
            {(['all', 'signature', 'mystic'] as const).map((col) => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={`text-brand text-xs transition-opacity ${
                  activeCollection === col ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                {col === 'all' ? 'Tout' : col === 'signature' ? 'Signature Essentials' : 'Mystic Lov'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mysticProducts } from '@/data/products';
import type { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Subcategory = 'all' | 'tshirt' | 'crewneck' | 'hoodie';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12 },
  }),
};

const subLabels: Record<string, string> = {
  tshirt: 'T-Shirts',
  crewneck: 'Sweats Col Rond',
  hoodie: 'Sweats Capuche',
};

const CollectionMystic = () => {
  const [sub, setSub] = useState<Subcategory>('all');

  const availableSubs = useMemo(() => {
    const subs = new Set(mysticProducts.map(p => p.subcategory).filter(Boolean));
    return subs.size > 1 ? Array.from(subs) : [];
  }, []);

  const filtered = sub === 'all'
    ? mysticProducts
    : mysticProducts.filter(p => p.subcategory === sub);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-24 px-6 md:px-10">
        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-brand text-[11px] text-muted-foreground mb-6 tracking-[0.2em]"
          >
            Collection
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-6xl font-serif font-light mb-6"
          >
            Mystic Lov
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl"
          >
            Coton bio certifié vegan, traçable de la graine au sweat. Pour celles et ceux 
            qui veulent porter un message sans faire de compromis.
          </motion.p>
        </div>

        {/* Subcategory filter */}
        {availableSubs.length > 0 && (
          <div className="flex gap-4 mb-10">
            <button
              onClick={() => setSub('all')}
              className={`text-[11px] px-4 py-2 border transition-all ${
                sub === 'all'
                  ? 'border-foreground text-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground'
              }`}
            >
              Tout
            </button>
            {availableSubs.map((s) => (
              <button
                key={s}
                onClick={() => setSub(s as Subcategory)}
                className={`text-[11px] px-4 py-2 border transition-all ${
                  sub === s
                    ? 'border-foreground text-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground'
                }`}
              >
                {subLabels[s!] || s}
              </button>
            ))}
          </div>
        )}

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-brand text-[11px] border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            Voir tous les produits
            <ArrowRight size={12} />
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionMystic;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-main.jpg';
import mysticCollection from '@/assets/mystic-collection.jpg';
import { standardProducts, mysticProducts, bijouxProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15 },
  }),
};

const Index = () => {
  const featured = [
    ...standardProducts.slice(0, 2),
    ...mysticProducts.slice(0, 4),
    ...bijouxProducts.slice(0, 2),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1. HERO — Split layout */}
      <section className="pt-[120px] md:pt-[110px]">
        {/* Hero Statement */}
        <div className="text-center py-12 md:py-16 px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-brand-lg text-base md:text-lg tracking-[0.35em] mb-4"
          >
            LOVCICOV
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-brand text-[11px] text-muted-foreground"
          >
            Vision. Présence. Signature.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 h-[75vh] md:h-[85vh]">
          <div className="relative overflow-hidden">
            <img src={heroImage} alt="Collection LOVCICOV" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-foreground/10" />
            <div className="absolute bottom-8 left-8 right-8">
              <Link
                to="/collections/standards"
                className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-8 py-3 text-brand text-[11px] hover:bg-primary-foreground/90 transition-all"
              >
                Collection Standards
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden hidden md:block">
            <img src={mysticCollection} alt="Collection Mystic Lov" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/10" />
            <div className="absolute bottom-8 left-8 right-8">
              <Link
                to="/collections/mystic-lov"
                className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-8 py-3 text-brand text-[11px] hover:bg-primary-foreground/90 transition-all"
              >
                Mystic Lov
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO */}
      <section className="px-6 md:px-10 py-20 md:py-28 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em]"
        >
          Le Manifeste
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-light mb-8 max-w-3xl mx-auto leading-tight"
        >
          Pas une tendance. Un standard.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          Des vêtements qui reflètent un état d'esprit. Pour ceux qui choisissent 
          leur propre direction et imposent leurs standards.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        >
          <Link
            to="/manifeste"
            className="inline-flex items-center gap-3 text-brand text-[11px] border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            Lire le manifeste
            <ArrowRight size={12} />
          </Link>
        </motion.div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-brand text-[11px] tracking-[0.2em] text-muted-foreground">Sélection</h2>
          <Link
            to="/shop"
            className="text-brand text-[11px] border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity"
          >
            Tout voir
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* 4. COLLECTIONS BANNER */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
        {[
          { label: 'Standards', desc: 'Pièces à message fort', path: '/collections/standards' },
          { label: 'Mystic Lov', desc: 'Coton bio, art & conscience', path: '/collections/mystic-lov' },
          { label: 'Bijoux', desc: 'Pierres naturelles, pièces uniques', path: '/collections/bijoux' },
        ].map((col, i) => (
          <Link
            key={col.label}
            to={col.path}
            className={`group py-14 md:py-20 px-8 md:px-12 text-center border-b md:border-b-0 border-border ${
              i < 2 ? 'md:border-r' : ''
            } hover:bg-secondary/50 transition-colors`}
          >
            <p className="text-brand text-[11px] text-muted-foreground mb-3 tracking-[0.15em]">{col.label}</p>
            <p className="text-sm text-muted-foreground/70">{col.desc}</p>
            <span className="inline-block mt-4 text-brand text-[11px] border-b border-foreground pb-0.5 group-hover:opacity-60 transition-opacity">
              Découvrir
            </span>
          </Link>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Index;

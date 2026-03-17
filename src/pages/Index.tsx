import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-main.jpg';
import mysticCollection from '@/assets/mystic-collection.jpg';
import bijouxImage from '@/assets/bijoux-fuchsia-fleurs.jpg';
import heroVideo from '../../public/hero-video.mp4.asset.json';
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

      {/* 1. HERO VIDEO — Full screen like Zara */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={mysticCollection}
        >
          <source
            src={heroVideo.url}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-foreground/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[12vh]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="text-[9px] md:text-[10px] text-primary-foreground/50 tracking-[0.6em] uppercase mb-3 font-light"
          >
            Collection 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.2 }}
            className="text-brand text-base md:text-2xl text-primary-foreground/90 tracking-[0.3em]"
          >
            Vision. Allure. Signature.
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="w-10 h-px bg-primary-foreground/30 mt-4"
          />
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
          className="text-brand text-lg md:text-2xl text-muted-foreground tracking-[0.3em] mb-8 max-w-3xl mx-auto"
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

      {/* 3. THREE COLLECTIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 h-[60vh] md:h-[75vh]">
        {[
          { src: heroImage, alt: 'Collection Power Lov', label: 'Power Lov', path: '/collections/standards' },
          { src: mysticCollection, alt: 'Collection Mystic Lov', label: 'Mystic Lov', path: '/collections/mystic-lov' },
          { src: bijouxImage, alt: 'Collection Amulets', label: 'Amulets', path: '/collections/bijoux' },
        ].map((col, i) => (
          <div key={col.label} className={`relative overflow-hidden ${i > 0 ? 'hidden md:block' : ''}`}>
            <img src={col.src} alt={col.alt} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-foreground/10" />
            <div className="absolute bottom-8 left-8 right-8">
              <Link
                to={col.path}
                className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-8 py-3 text-brand text-[11px] hover:bg-primary-foreground/90 transition-all"
              >
                {col.label}
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
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
          { label: 'Power Lov', desc: 'Define your standard.', path: '/shop' },
          { label: 'Mystic Lov', desc: 'Symbols. Guidance. Intuition.', path: '/shop' },
          { label: 'Amulets', desc: 'Natural Stones. Singular Pieces.', path: '/shop' },
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

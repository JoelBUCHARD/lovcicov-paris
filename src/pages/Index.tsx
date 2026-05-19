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

      {/* 1. HERO — Clean text over warm cream */}
      <section className="w-full bg-[#FAF7F2] py-24 md:py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[9px] tracking-[0.2em] uppercase text-[#B4A99A] mb-6"
        >
          COLLECTION 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-[26px] font-light text-[#1A1A1A] leading-tight mb-4"
        >
          Clothes That Change How You Feel
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-[13px] italic text-[#888780] mb-10"
        >
          Par Georgiana · Paris · Pièces uniques · Anti fast-fashion
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#E8529A] transition-colors"
          >
            Découvrir la collection
          </Link>
          <Link
            to="/fondatrice"
            className="inline-flex items-center justify-center bg-transparent text-[#1A1A1A] text-[10px] tracking-[0.12em] uppercase px-8 py-3 border border-[#5F5E5A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-colors"
          >
            Notre histoire
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-[10px] text-[#B4A99A] tracking-[0.08em]"
        >
          Pièces uniques · Artisanat du monde · Délai assumé, qualité irréprochable
        </motion.p>
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
          { src: heroImage, alt: 'Collection PowerLov', label: 'PowerLov', path: '/collections/standards' },
          { src: mysticCollection, alt: 'Collection MysticLov', label: 'MysticLov', path: '/collections/mystic-lov' },
          { src: bijouxImage, alt: 'Collection StoneLov', label: 'StoneLov', path: '/collections/bijoux' },
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
        <div className="flex items-center justify-end mb-10">
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
          { label: 'PowerLov', desc: 'Définissez votre standard.', path: '/shop' },
          { label: 'MysticLov', desc: 'Symboles. Guidance. Intuition.', path: '/shop' },
          { label: 'StoneLov', desc: 'Pierres naturelles. Pièces singulières.', path: '/shop' },
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

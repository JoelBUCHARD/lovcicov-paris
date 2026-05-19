import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { bijouxProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import ig1 from '@/assets/instagram/ig-1.png';
import ig2 from '@/assets/instagram/ig-2.jpg';
import ig3 from '@/assets/instagram/ig-3.jpg';
import ig4 from '@/assets/instagram/ig-4.jpg';
import ig5 from '@/assets/instagram/ig-5.png';
import ig6 from '@/assets/instagram/ig-6.png';

const instagramImages = [ig1, ig2, ig3, ig4, ig5, ig6];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15 },
  }),
};

const Index = () => {
  const featured = bijouxProducts;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />



      {/* 1. HERO — Clean text over warm cream */}
      <section className="w-full bg-[#0A0A0A] pt-40 md:pt-48 pb-8 md:pb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[9px] tracking-[0.2em] uppercase text-white/50 mb-6"
        >
          COLLECTION 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-[26px] font-light text-white leading-tight mb-4"
        >
          Clothes That Change How You Feel
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-[13px] italic text-white/60 mb-4"
        >
          Par Georgiana · Paris · Pièces uniques
        </motion.p>

        <HeroCarousel />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-4 mb-3 mt-3"
        >
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#333333] transition-colors"
          >
            Découvrir la collection
          </Link>
          <Link
            to="/fondatrice"
            className="inline-flex items-center justify-center bg-transparent text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 border border-white/40 hover:bg-white hover:text-[#0A0A0A] hover:border-white transition-colors"
          >
            Notre histoire
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-[10px] text-white/40 tracking-[0.08em]"
        >
          Pièces uniques · Artisanat du monde · Délai assumé, qualité irréprochable
        </motion.p>
      </section>



      {/* 2. MANIFESTO */}
      <section className="px-6 md:px-10 pt-4 md:pt-6 pb-8 md:pb-10 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-white/60 text-[11px] mb-8 tracking-[0.2em]"
        >
          Le Manifeste
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-white text-lg md:text-2xl tracking-[0.3em] mb-8 max-w-3xl mx-auto"
        >
          Pas une tendance. Un standard.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
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
            className="inline-flex items-center gap-3 text-white text-[11px] border-b border-white pb-1 hover:opacity-60 transition-opacity"
          >
            Lire le manifeste
            <ArrowRight size={12} />
          </Link>
        </motion.div>
      </section>

      {/* PRESS */}
      <section className="py-10 md:py-14 text-center bg-[#0A0A0A] border-b border-white/10">
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-6">
          Vu dans la presse
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6">
          {['Madame Figaro', 'ELLE', 'Vogue'].map((media) => (
            <span
              key={media}
              className="text-[13px] md:text-[14px] text-white/60 tracking-[0.08em] font-light"
            >
              {media}
            </span>
          ))}
          <span className="text-[13px] md:text-[14px] text-white/40 tracking-[0.08em] font-light italic">
            — et d&apos;autres
          </span>
        </div>
      </section>

      {/* 3. THREE COLLECTIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 bg-[#0A0A0A]">
        {[
          {
            label: 'PowerLov',
            badge: 'Éditions limitées',
            desc: 'Définissez votre standard. Pièces à message fort.',
            path: '/collections/standards',
            border: 'border-t-[3px] border-t-white/20',
            badgeColor: 'text-[#E66060]',
          },
          {
            label: 'MysticLov',
            badge: 'Pièce unique · Artisanat',
            desc: 'Symboles. Guidance. Intuition. Conscience.',
            path: '/collections/mystic-lov',
            border: 'border-t-[3px] border-t-white/20',
            badgeColor: 'text-white/60',
          },
          {
            label: 'StoneLov',
            badge: 'Pierres naturelles',
            desc: 'Pièces singulières. Énergie minérale.',
            path: '/collections/bijoux',
            border: 'border-t-[3px] border-t-white/20',
            badgeColor: 'text-[#C4714A]',
          },
        ].map((col) => (
          <Link
            key={col.label}
            to={col.path}
            className={`group flex flex-col bg-[#0A0A0A] ${col.border} py-14 md:py-20 px-8 md:px-12 text-center hover:bg-white/5 transition-colors`}
          >
            <p className={`text-[9px] uppercase tracking-[0.12em] font-medium mb-3 ${col.badgeColor}`}>
              {col.badge}
            </p>
            <p className="text-white text-[13px] tracking-[0.15em] mb-2">{col.label}</p>
            <p className="text-white/60 text-[12px] mb-6 leading-relaxed flex-1">{col.desc}</p>
            <span className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.12em] text-white border-b border-white pb-0.5 group-hover:text-white/70 group-hover:border-white/70 transition-colors mt-auto">
              Découvrir
              <ArrowRight size={10} />
            </span>
          </Link>
        ))}
      </section>

      {/* INSTAGRAM FEED */}
      <section className="pt-16 md:pt-24 pb-10 md:pb-12 text-center bg-[#0A0A0A]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-4"
        >
          Suivez l'univers Lovcicov
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          href="https://www.instagram.com/lovcicov.paris/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white hover:text-white/70 transition-colors inline-block mb-10"
        >
          @lovcicov.paris
        </motion.a>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 px-4 md:px-10 max-w-5xl mx-auto mb-10"
        >
          {instagramImages.map((src, i) => (
            <a
              key={i}
              href="https://www.instagram.com/lovcicov.paris/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-white/10"
            >
              <img
                src={src}
                alt={`Instagram @lovcicov.paris ${i + 1}`}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  i === 2 ? 'object-[center_30%]' : i === 3 ? 'object-[center_75%]' : 'object-[center_20%]'
                }`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </a>
          ))}
        </motion.div>
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          href="https://www.instagram.com/lovcicov.paris/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-white border-b border-white pb-0.5 hover:text-white/70 hover:border-white/70 transition-colors"
        >
          Voir notre Instagram
          <ArrowRight size={10} />
        </motion.a>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="bg-[#FDF5EF]">
        <div className="text-center pt-6 pb-6">
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#C4714A] mb-2">
            STONELOV · LANCEMENT
          </p>
          <p className="font-sans italic text-[12px] text-[#888780]">
            Pierres naturelles · Pièces singulières · Paris
          </p>
        </div>
        <div className="px-6 md:px-10 pb-20 md:pb-28">
          <div className="flex items-center justify-end mb-10">
            <Link
              to="/shop"
              className="text-brand text-[11px] border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity"
            >
              Tout voir
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
            {featured.slice(0, 6).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. COLLECTIONS BANNER */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
        {[
          { label: 'PowerLov', desc: 'Définissez votre standard.', path: '/shop', hoverBg: 'hover:bg-[#FDE8E8]' },
          { label: 'MysticLov', desc: 'Symboles. Guidance. Intuition.', path: '/shop', hoverBg: 'hover:bg-[#F7F5F0]' },
          { label: 'StoneLov', desc: 'Pierres naturelles. Pièces singulières.', path: '/shop', hoverBg: 'hover:bg-orange-50' },
        ].map((col, i) => (
          <Link
            key={col.label}
            to={col.path}
            className={`group py-14 md:py-20 px-8 md:px-12 text-center border-b md:border-b-0 border-border ${
              i < 2 ? 'md:border-r' : ''
            } ${col.hoverBg} transition-colors`}
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

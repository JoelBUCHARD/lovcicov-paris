import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { bijouxProducts, mysticProducts, standardProducts } from '@/data/products';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import HeroCarousel from '@/components/HeroCarousel';
import editorialStonelov from '@/assets/editorial-powerlov-v2.png.asset.json';

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
  const { isVisible } = useProductVisibility();
  const visibleStandardProducts = standardProducts.filter((p) => isVisible(localKey(p.id)));




  return (
    <div className="min-h-screen bg-background">
      <Navbar />









      {/* 1. HERO — Clean text over warm cream */}
      <section className="w-full bg-[#FAF7F2] pt-[160px] md:pt-[200px] pb-8 md:pb-10 text-center relative overflow-hidden">



        <div className="relative z-[1]">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-[26px] font-light text-[#1A1A1A] leading-tight mb-3"
          >
            Presence over appearance.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mx-auto mb-6 px-8 md:px-12"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#5F5E5A', maxWidth: '640px', lineHeight: 1.6 }}
          >
            LOVCICOV explore le lien entre la mode, l'énergie, l'émotion et la transformation intérieure à travers des pièces pensées comme des talismans contemporains.
          </motion.p>

          <HeroCarousel />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 mt-3 px-6"
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#333333] transition-colors w-full sm:w-auto"
            >
              Découvrir la collection
            </Link>
            <Link
              to="/fondatrice"
              className="inline-flex items-center justify-center bg-transparent text-[#1A1A1A] text-[10px] tracking-[0.12em] uppercase px-8 py-3 border border-[#5F5E5A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-colors w-full sm:w-auto"
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
            éditions limitées · slow fashion · éco-responsable
          </motion.p>
        </div>
      </section>

      {/* KEYWORDS STRIP */}
      <section className="w-full bg-[#FAF7F2] border-t border-[#EFE9DF] py-4 overflow-hidden">
        <div className="whitespace-nowrap overflow-hidden">
          <div className="inline-flex animate-[marquee_60s_linear_infinite]" style={{ animationName: 'marquee' }}>
            {Array.from({ length: 20 }).map((_, dup) => (
              <span
                key={dup}
                className="inline-block px-6"
                style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  color: '#B4A99A',
                  letterSpacing: '0.18em',
                }}
              >
                Clothes that change how you feel&nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>


      {/* 2. MANIFESTO */}
      <section className="px-6 md:px-10 pt-4 md:pt-6 pb-8 md:pb-10 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-brand text-[11px] text-muted-foreground mb-8 tracking-[0.2em]"
        >
          MANIFESTE
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 space-y-5"
        >
          <p>Le véritable style ne cherche pas à transformer. Il révèle ce qui était déjà là.</p>
          <p>Des pièces qui expriment une attitude. Des symboles qui racontent une histoire.</p>
          <p className="text-foreground tracking-[0.15em] text-sm">Vision. Allure. Signature.</p>
        </motion.div>
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

      {/* EDITORIAL */}
      <section className="w-full bg-white pt-4 md:pt-16 pb-0 md:pb-[20px] flex justify-center">
        <div className="relative inline-block">
          <img
            src={editorialStonelov.url}
            alt="LOVCICOV — Collection 2026"
            className="relative z-[1] h-auto md:h-[90vh] w-auto max-w-full object-contain md:object-cover object-top block"
          />
        </div>
      </section>





      {/* POWERLOV */}
      <section className="bg-[#F7F5F0] border-t-[3px] border-[#1A1A1A] pt-0 md:pt-14">
        <div className="text-center pt-3 pb-8">
          <p className="font-sans text-[9px] tracking-[0.2em] text-[#1A1A1A] mb-2">
            PowerLov
          </p>
          <div className="w-[60px] h-px bg-[#1A1A1A] mx-auto mt-3 opacity-60" />

        </div>
        <div className="px-6 md:px-10 pb-2 md:pb-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-4xl mx-auto">
            {visibleStandardProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center pt-4 pb-8 md:pt-6 md:pb-12"
        >
          <Link
            to="/collections/powerlov"
            className="inline-flex items-center justify-center text-white px-8 py-3 transition-colors min-w-[220px]"
            style={{ backgroundColor: '#1A1A1A', fontSize: 10, letterSpacing: '0.15em' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333333')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1A1A1A')}
          >
            Découvrir PowerLov
          </Link>
          <div className="mx-auto mt-8 h-1 w-24 bg-red-600" />

        </motion.div>
      </section>

      {/* 3. MYSTICLOV — section in MysticLov DA */}
      <section className="bg-[#FFF5F5] pt-10 md:pt-14 pb-10 md:pb-14">
        <div className="text-center px-6 md:px-10 pt-3 pb-3 max-w-[640px] mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-sans text-[9px] tracking-[0.2em] mb-2"
            style={{ color: '#E66060' }}
          >
            MysticLov
          </motion.p>

          <div className="my-4 h-px mx-auto" style={{ width: 60, backgroundColor: '#C4714A' }} />
        </div>

        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-4xl mx-auto">
            {mysticProducts.slice(0, 4).map((product, i) => (
              <div key={product.id} className="bg-white p-3">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-10"
        >
          <Link
            to="/mysticlov"
            className="inline-flex items-center justify-center text-white px-8 py-3 transition-colors min-w-[220px]"
            style={{ backgroundColor: '#E66060', fontSize: 10, letterSpacing: '0.15em' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C94A4A')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E66060')}
          >
            Découvrir MysticLov
          </Link>
        </motion.div>
      </section>


      {/* 4. FEATURED PRODUCTS — STONELOV Lancement */}
      <section className="bg-[#FDF5EF] border-t-[3px] border-[#C4714A] pt-0 md:pt-14">
        <div className="text-center pt-3 pb-8">
          <p className="font-sans text-[9px] tracking-[0.2em] text-[#C4714A] mb-2">
            StoneLov
          </p>

          <div className="w-[60px] h-px bg-[#C4714A] mx-auto mt-3 opacity-60" />

        </div>
        <div className="px-6 md:px-10 pb-2 md:pb-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-4xl mx-auto">
            {featured.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center pt-4 pb-8 md:pt-6 md:pb-12"
        >
          <Link
            to="/stonelov"
            className="inline-flex items-center justify-center text-white px-8 py-3 transition-colors min-w-[220px]"
            style={{ backgroundColor: '#C4714A', fontSize: 10, letterSpacing: '0.15em' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A85D3A')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C4714A')}
          >
            Découvrir StoneLov
          </Link>

        </motion.div>
      </section>



      {/* INSTAGRAM FEED */}
      <section className="pt-[60px] pb-[60px] text-center bg-background border-t-[3px] border-black">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.2em] text-[#B4A99A] mb-4"
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
          className="text-[16px] tracking-[0.1em] text-[#1A1A1A] hover:text-[#666666] transition-colors inline-block mb-10"
        >
          @lovcicov.paris
        </motion.a>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-1 px-2 md:px-4 mb-10"
        >
          {instagramImages.map((src, i) => (
            <a
              key={i}
              href="https://www.instagram.com/lovcicov.paris/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-[#E8E4DD]"
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
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#666666] hover:border-[#666666] transition-colors"
        >
          Voir notre Instagram
          <ArrowRight size={10} />
        </motion.a>
      </section>


      {/* SACS LOVCICOV — nouvelle page édito */}
      <section
        className="w-full flex items-center justify-center text-center px-6"
        style={{ backgroundColor: '#1A1A1A', padding: '100px 24px' }}
      >
        <div className="max-w-[720px] mx-auto">
          <p
            className="uppercase"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 9,
              color: '#B4A99A',
              letterSpacing: '0.2em',
              marginBottom: 24,
            }}
          >
            Nouveau · LOVBAG
          </p>

          <h2
            className="italic"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(40px, 7vw, 90px)',
              fontWeight: 200,
              color: '#FFFFFF',
              lineHeight: 1.05,
            }}
          >
            Big LOV.
          </h2>
          <p
            className="italic"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(40px, 7vw, 90px)',
              fontWeight: 200,
              color: '#FFFFFF',
              lineHeight: 1.05,
            }}
          >
            Small LOV.
          </p>

          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 13,
              color: '#B4A99A',
              marginTop: 28,
              maxWidth: 520,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Cuir tressé à la main. Une palette de couleurs pensée comme une émotion. Une silhouette qui devient signature.
          </p>

          <Link
            to="/sacs"
            className="inline-block mt-10 hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#1A1A1A',
              padding: '14px 32px',
              borderRadius: 0,
              fontFamily: 'Arial, sans-serif',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Découvrir les sacs
          </Link>
        </div>
      </section>


      {/* 4. COLLECTIONS BANNER */}
      <section className="grid grid-cols-3 border-t border-border">

        {[
          { label: 'PowerLov', desc: 'Présence. Discipline. Impact.', path: '/powerlov', hoverBg: 'hover:bg-[#F7F5F0]' },
          { label: 'MysticLov', desc: 'Symboles. Guidance. Intuition.', path: '/mysticlov', hoverBg: 'hover:bg-[#FDE8E8]' },
          { label: 'StoneLov', desc: 'Pierres naturelles. Pièces singulières.', path: '/stonelov', hoverBg: 'hover:bg-orange-50' },
        ].map((col, i) => (
          <Link
            key={col.label}
            to={col.path}
            className={`group py-10 md:py-20 px-4 md:px-12 text-center border-border ${
              i < 2 ? 'border-r' : ''
            } ${col.hoverBg} transition-colors`}
          >
            <p className="text-brand text-[11px] text-muted-foreground mb-3 tracking-[0.15em] group-hover:opacity-60 transition-opacity">{col.label}</p>
            <p className="text-sm text-muted-foreground/70">{col.desc}</p>
          </Link>
        ))}
      </section>


      {/* PRESS */}
      <section className="py-10 md:py-14 text-center bg-white border-t border-b border-[#E8E4DD]">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#B4A99A] mb-6">
          Vu dans la presse
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6">
          {['Madame Figaro', 'Paris Match'].map((media) => (
            <span
              key={media}
              className="text-[13px] md:text-[14px] text-[#888780] tracking-[0.08em] font-light"
            >
              {media}
            </span>
          ))}
          <span className="text-[13px] md:text-[14px] text-[#B4A99A] tracking-[0.08em] font-light italic">
            — et d&apos;autres
          </span>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

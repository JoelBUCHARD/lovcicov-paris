import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { bijouxProducts, mysticProducts, standardProducts, sacsProducts } from '@/data/products';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

import HeroCarousel from '@/components/HeroCarousel';
import editorial2026Duo from '@/assets/campagne-diptyque.webp.asset.json';
import campagneMobile1 from '@/assets/campagne-mobile-1.webp.asset.json';
import campagneMobile2 from '@/assets/campagne-mobile-2.webp.asset.json';

import slideHeroAsset from '@/assets/hero-lovcicov-dove-garden-v2.webp.asset.json';


import ig1 from '@/assets/instagram/ig-1.png';
import ig2 from '@/assets/instagram/ig-2.jpg';
import ig3 from '@/assets/instagram/ig-3.jpg';
import ig4 from '@/assets/instagram/ig-4.jpg';
import ig5 from '@/assets/instagram/ig-5.png';
import ig6 from '@/assets/instagram/ig-6.png';
import { SOCIAL_LINKS, SOCIAL_LABELS } from '@/config/social';

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
  const { isVisible } = useProductVisibility();
  const visibleStandardProducts = standardProducts.filter((p) => isVisible(localKey(p.id)));
  const visibleMysticProducts = mysticProducts.filter((p) => isVisible(localKey(p.id)));
  const visibleBijouxProducts = bijouxProducts.filter((p) => isVisible(localKey(p.id)));
  const featured = visibleBijouxProducts;





  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="LOVCICOV Paris — Maison de mode contemporaine"
        description="Maison de mode contemporaine à Paris. Pièces éditoriales pensées pour la posture, la présence et la confiance — PowerLov, MysticLov, StoneLov."
        path="/"
      />
      <Navbar />









      {/* 1. HERO — Editorial luxury split */}
      <section
        className="w-full bg-[#FAF7F2] pb-6 md:pb-8 relative overflow-hidden"
        style={{ paddingTop: "var(--collection-offset)" }}
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden text-[#1A1A1A] font-light leading-[0.98] tracking-[-0.02em] mt-10 md:mt-12 mb-8 text-center"
            style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}
          >
            Presence
            <br />
            over
            <br />
            <em className="italic font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              appearance.
            </em>
          </motion.h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 order-2 lg:order-1 text-center lg:text-left"
            >
              <p className="hidden lg:block text-[10px] tracking-[0.32em] uppercase text-[#8B7D6B] mb-8 md:mb-10">
                Maison LOVCICOV — Paris
              </p>

              <h1
                className="hidden lg:block text-[#1A1A1A] font-light leading-[0.98] tracking-[-0.02em] mb-10 md:mb-12"
                style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}
              >
                Presence
                <br />
                over
                <br />
                <em className="italic font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  appearance.
                </em>
              </h1>

              <p className="hidden lg:block text-[10px] tracking-[0.4em] uppercase text-[#8B7D6B] font-light -mt-4 mb-12">
                Made in Paradise
              </p>



              <p
                className="mx-auto lg:mx-0 mb-12 md:mb-14 text-[#5F5E5A] font-light"
                style={{ fontSize: '15px', maxWidth: '460px', lineHeight: 1.75, letterSpacing: '0.005em' }}
              >
                LOVCICOV explore le lien entre la mode, l'énergie et la transformation intérieure. Des pièces pensées comme des talismans contemporains.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center lg:items-start justify-center lg:justify-start gap-3">
                <Link
                  to="/shop"
                  className="group inline-flex items-center justify-center whitespace-nowrap bg-[#1A1A1A] text-white text-[9px] md:text-[10px] tracking-[0.22em] md:tracking-[0.28em] uppercase px-4 md:px-6 py-4 hover:bg-[#000] transition-colors duration-500 w-full sm:w-[210px]"
                >
                  Découvrir la collection
                </Link>
                <Link
                  to="/fondatrice"
                  className="group inline-flex items-center justify-center whitespace-nowrap bg-[#1A1A1A] text-white text-[9px] md:text-[10px] tracking-[0.22em] md:tracking-[0.28em] uppercase px-4 md:px-6 py-4 hover:bg-[#000] transition-colors duration-500 w-full sm:w-[210px]"
                >
                  Notre histoire
                </Link>


              </div>




            </motion.div>

            {/* Image column */}
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 order-1 lg:order-2 relative"
            >
              <p className="lg:hidden text-[10px] tracking-[0.32em] uppercase text-[#8B7D6B] text-center mb-8">
                Maison LOVCICOV — Paris
              </p>
              <div className="relative overflow-hidden aspect-[4/5] lg:aspect-[3/4] w-full">
                <img
                  src={slideHeroAsset.url}
                  alt="Sweat LOVCICOV PARIS écru, emblème colombe rouge — collection PowerLov"
                  width={1269}
                  height={952}
                  className="w-full h-full object-cover object-[48%_30%] lg:object-[center_40%]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <p className="lg:hidden text-[9px] tracking-[0.4em] uppercase text-[#8B7D6B] font-light text-center mt-6">
                Made in Paradise
              </p>
              <p className="hidden lg:block absolute -bottom-2 right-0 text-[9px] tracking-[0.32em] uppercase text-[#8B7D6B] rotate-90 origin-bottom-right translate-x-full translate-y-8">
                Édition · Paris · MMXXVI
              </p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* KEYWORDS STRIP — ambient transition */}
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




      {/* ————————————————————————————————————————————————————— */}
      {/* 3. FEATURED COLLECTION — Editorial image */}
      {/* ————————————————————————————————————————————————————— */}
      <section className="w-full bg-white pt-4 md:pt-12 pb-4 md:pb-16 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[16px] md:text-[20px] tracking-[0.32em] uppercase text-[#8B7D6B] mb-10 md:mb-14"
        >
          Collection 2026
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full px-6 md:px-6"
        >
          {/* Mobile : deux visuels portrait empilés */}
          <div className="md:hidden flex flex-col gap-3 -mx-6">
            <img loading="lazy" decoding="async"
              src={campagneMobile1.url}
              alt="Campagne LOVCICOV Paris — t-shirt blanc logo cœur"
              width={1122}
              height={1402}
              className="w-full h-auto"
            />
            <img loading="lazy" decoding="async"
              src={campagneMobile2.url}
              alt="Campagne LOVCICOV Paris — sweat bleu cœur sacré"
              width={1122}
              height={1402}
              className="w-full h-auto"
            />
          </div>

          {/* Desktop : diptyque paysage inchangé */}
          <img loading="lazy" decoding="async"
            src={editorial2026Duo.url}
            alt="Campagne LOVCICOV Paris — t-shirt blanc et sweat bleu cœur sacré"
            width={1559}
            height={1009}
            className="hidden md:block w-full h-auto object-cover object-center max-w-[1400px] mx-auto"
          />


        </motion.div>

      </section>


      {/* ————————————————————————————————————————————————————— */}
      {/* 4. SIGNATURE PIECES — PowerLov */}
      {/* ————————————————————————————————————————————————————— */}
      <div className="bg-[#F7F5F0]"><div className="site-container border-t border-[#3A3A3A]" /></div>
      <section className="bg-[#F7F5F0] pt-10 md:pt-14 pb-10 md:pb-14">

        <div className="site-container text-center mb-14 md:mb-20">
          <h2
            className="text-[#1A1A1A] font-light"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.015em', lineHeight: 1.1 }}
          >
            PowerLov
          </h2>
          <p className="mt-5 text-[#5F5E5A] font-light measure max-w-[480px] mx-auto" style={{ fontSize: 14, lineHeight: 1.7 }}>
            La collection des messages qui donnent de l'énergie.
          </p>
        </div>

        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-0 md:gap-y-10">
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
          className="text-center mt-16 md:mt-20"
        >
          <Link
            to="/collections/powerlov"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] tracking-[0.28em] uppercase px-10 py-4 hover:bg-black transition-colors duration-500 min-w-[240px]"
          >
            Découvrir PowerLov
          </Link>
        </motion.div>
      </section>


      {/* ————————————————————————————————————————————————————— */}
      {/* 5. BRAND UNIVERSE — MysticLov */}
      {/* ————————————————————————————————————————————————————— */}
      <div className="bg-[#F7F5F0]"><div className="site-container border-t border-[#3A3A3A]" /></div>
      <section className="bg-[#F7F5F0] pt-10 md:pt-14 pb-10 md:pb-14">

        <div className="site-container text-center mb-14 md:mb-20">
          <h2
            className="font-light"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.015em', lineHeight: 1.1, color: '#1A1A1A' }}
          >
            MysticLov
          </h2>
          <p className="mt-5 text-[#5F5E5A] font-light measure max-w-[480px] mx-auto" style={{ fontSize: 14, lineHeight: 1.7 }}>
            La collection des talismans.
          </p>
        </div>

        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-0 md:gap-y-10">
            {visibleMysticProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>


        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-20"
        >
          <Link
            to="/mysticlov"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] tracking-[0.28em] uppercase px-10 py-4 hover:bg-black transition-colors duration-500 min-w-[240px]"
          >
            Découvrir MysticLov
          </Link>

        </motion.div>
      </section>


      {/* ————————————————————————————————————————————————————— */}
      {/* 6. EDITORIAL INSPIRATION — StoneLov */}
      {/* ————————————————————————————————————————————————————— */}
      <div className="bg-[#F7F5F0]"><div className="site-container border-t border-[#3A3A3A]" /></div>
      <section className="bg-[#F7F5F0] pt-10 md:pt-14 pb-10 md:pb-14">

        <div className="site-container text-center mb-14 md:mb-20">
          <h2
            className="font-light"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.015em', lineHeight: 1.1, color: '#1A1A1A' }}
          >
            StoneLov
          </h2>
          <p className="mt-5 text-[#5F5E5A] font-light measure max-w-[480px] mx-auto" style={{ fontSize: 14, lineHeight: 1.7 }}>
            La collection de pierres naturelles.
          </p>
        </div>

        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-0 md:gap-y-10">
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
          className="text-center mt-16 md:mt-20"
        >
          <Link
            to="/stonelov"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] tracking-[0.28em] uppercase px-10 py-4 hover:bg-black transition-colors duration-500 min-w-[240px]"
          >
            Découvrir StoneLov
          </Link>

        </motion.div>
      </section>


      {/* ————————————————————————————————————————————————————— */}
      {/* 7. BRAND UNIVERSE — LovBag */}
      {/* ————————————————————————————————————————————————————— */}
      <div className="bg-[#F7F5F0]"><div className="site-container border-t border-[#3A3A3A]" /></div>
      <section className="bg-[#F7F5F0] pt-10 md:pt-14 pb-10 md:pb-14">

        <div className="site-container text-center mb-14 md:mb-20">
          <h2
            className="font-light"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.015em', lineHeight: 1.1, color: '#1A1A1A' }}
          >
            LovBag
          </h2>
          <p className="mt-5 text-[#5F5E5A] font-light measure max-w-[480px] mx-auto" style={{ fontSize: 14, lineHeight: 1.7 }}>
            La collection des sacs tressés à la main.
          </p>
        </div>

        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-0 md:gap-y-10">
            {sacsProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-20"
        >
          <Link
            to="/sacs"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white text-[10px] tracking-[0.28em] uppercase px-10 py-4 hover:bg-black transition-colors duration-500 min-w-[240px]"
          >
            Découvrir LovBag
          </Link>
        </motion.div>
      </section>




      {/* ————————————————————————————————————————————————————— */}
      {/* 8. LIFESTYLE — Instagram universe */}
      {/* ————————————————————————————————————————————————————— */}
      <section className="pt-10 md:pt-14 pb-10 md:pb-14 text-center bg-white">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.32em] text-[#8B7D6B] mb-6"
        >
          L'univers Lovcicov
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={SOCIAL_LABELS.instagram}
          className="text-[18px] font-light tracking-[0.05em] text-[#1A1A1A] hover:text-[#666666] transition-colors inline-block mb-14"
        >
          @lovcicov.paris
        </motion.a>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-1 px-2 md:px-4 mb-14"
        >
          {instagramImages.map((src, i) => (
            <a
              key={i}
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_LABELS.instagram}
              className="group relative block aspect-square overflow-hidden bg-[#E8E4DD]"
            >
              <img
                src={src}
                alt={`Instagram @lovcicov.paris ${i + 1}`}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i === 2 ? 'object-[center_30%]' : i === 3 ? 'object-[center_75%]' : 'object-[center_20%]'
                }`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
            </a>
          ))}
        </motion.div>
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={SOCIAL_LABELS.instagram}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:opacity-60 transition-opacity"
        >
          Voir notre Instagram
        </motion.a>
      </section>


      {/* ————————————————————————————————————————————————————— */}
      {/* PRESS */}
      {/* ————————————————————————————————————————————————————— */}
      <section className="py-16 md:py-20 text-center bg-white border-t border-[#E8E4DD]">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[#B4A99A] mb-8">
          Vu dans la presse
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
          {['Madame Figaro', 'Paris Match'].map((media) => (
            <span
              key={media}
              className="text-[15px] md:text-[16px] text-[#888780] tracking-[0.06em] font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
            >
              {media}
            </span>
          ))}
          <span className="text-[14px] text-[#B4A99A] tracking-[0.06em] font-light italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            — et d&apos;autres
          </span>
        </div>
      </section>







      <Footer />
    </div>
  );
};


export default Index;

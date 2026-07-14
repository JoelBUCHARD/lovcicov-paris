import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { bijouxProducts, mysticProducts, standardProducts } from '@/data/products';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

import HeroCarousel from '@/components/HeroCarousel';
import editorialStonelov from '@/assets/editorial-powerlov-v2.png.asset.json';
import slideHeroAsset from '@/assets/slide-hero-paris-trio-v2.png.asset.json';


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
      <section className="w-full bg-[#FAF7F2] pt-[140px] md:pt-[180px] pb-6 md:pb-8 relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 order-2 lg:order-1 text-center lg:text-left"
            >
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#8B7D6B] mb-8 md:mb-10">
                Maison LOVCICOV — Paris
              </p>

              <h1
                className="text-[#1A1A1A] font-light leading-[0.98] tracking-[-0.02em] mb-10 md:mb-12"
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

              <p
                className="mx-auto lg:mx-0 mb-12 md:mb-14 text-[#5F5E5A] font-light"
                style={{ fontSize: '15px', maxWidth: '460px', lineHeight: 1.75, letterSpacing: '0.005em' }}
              >
                LOVCICOV explore le lien entre la mode, l'énergie et la transformation intérieure. Des pièces pensées comme des talismans contemporains.
              </p>

              <div className="flex flex-row items-stretch sm:items-center lg:items-start justify-center lg:justify-start gap-3">
                <Link
                  to="/shop"
                  className="group inline-flex items-center justify-center whitespace-nowrap bg-[#1A1A1A] text-white text-[9px] md:text-[10px] tracking-[0.22em] md:tracking-[0.28em] uppercase px-4 md:px-6 py-4 hover:bg-[#000] transition-colors duration-500 flex-1 sm:flex-none sm:w-[210px]"
                >
                  Découvrir la collection
                </Link>
                <Link
                  to="/fondatrice"
                  className="group inline-flex items-center justify-center whitespace-nowrap bg-[#1A1A1A] text-white text-[9px] md:text-[10px] tracking-[0.22em] md:tracking-[0.28em] uppercase px-4 md:px-6 py-4 hover:bg-[#000] transition-colors duration-500 flex-1 sm:flex-none sm:w-[210px]"
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
              <div className="relative overflow-hidden aspect-[4/5] lg:aspect-[3/4] w-full">
                <img
                  src={slideHeroAsset.url}
                  alt="LOVCICOV Paris — campagne"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
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
      {/* 2. BRAND PHILOSOPHY — Manifeste */}
      {/* ————————————————————————————————————————————————————— */}
      <section className="bg-background border-t border-[#EFE9DF] py-12 md:py-16 px-6 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.32em] uppercase text-[#8B7D6B] mb-10"
          >
            <Link to="/manifeste" className="hover:text-[#1A1A1A] transition-colors">
              Manifeste
            </Link>
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-[#1A1A1A] font-light space-y-8"
            style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.55, letterSpacing: '-0.005em' }}
          >
            <p>Le véritable style ne cherche pas à transformer.</p>
            <p>
              Il révèle <em className="italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>ce qui était déjà là</em>.
            </p>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="mt-10 text-[#5F5E5A] font-light max-w-[520px] mx-auto"
            style={{ fontSize: 15, lineHeight: 1.8 }}
          >
            Des pièces qui expriment une attitude. Des symboles qui racontent une histoire.
          </motion.p>
        </div>
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
          className="text-[10px] tracking-[0.32em] uppercase text-[#8B7D6B] mb-10 md:mb-14"
        >
          Collection 2026
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block"
        >
          <img
            src={editorialStonelov.url}
            alt="LOVCICOV — Collection 2026"
            className="relative z-[1] h-auto md:h-[85vh] w-auto max-w-full object-contain md:object-cover object-top block"
          />
        </motion.div>
      </section>


      {/* ————————————————————————————————————————————————————— */}
      {/* 4. SIGNATURE PIECES — PowerLov */}
      {/* ————————————————————————————————————————————————————— */}
      <div className="bg-[#F7F5F0]"><div className="max-w-5xl mx-auto border-t border-[#3A3A3A]" /></div>
      <section className="bg-[#F7F5F0] pt-10 md:pt-14 pb-10 md:pb-14">

        <div className="text-center mb-14 md:mb-20 px-6">
          <h2
            className="text-[#1A1A1A] font-light"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.015em', lineHeight: 1.1 }}
          >
            PowerLov
          </h2>
          <p className="mt-5 text-[#5F5E5A] font-light max-w-[480px] mx-auto" style={{ fontSize: 14, lineHeight: 1.7 }}>
            Silhouettes affirmées. Coupes précises. L'énergie d'une allure choisie.
          </p>
        </div>

        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-5xl mx-auto">
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
      <div className="bg-[#F7F5F0]"><div className="max-w-5xl mx-auto border-t border-[#3A3A3A]" /></div>
      <section className="bg-[#F7F5F0] pt-10 md:pt-14 pb-10 md:pb-14">

        <div className="text-center mb-14 md:mb-20 px-6">
          <h2
            className="font-light"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.015em', lineHeight: 1.1, color: '#1A1A1A' }}
          >
            MysticLov
          </h2>
          <p className="mt-5 text-[#5F5E5A] font-light max-w-[480px] mx-auto" style={{ fontSize: 14, lineHeight: 1.7 }}>
            Des talismans contemporains, portés comme une intention.
          </p>
        </div>

        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-5xl mx-auto">
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
      <div className="bg-[#F7F5F0]"><div className="max-w-5xl mx-auto border-t border-[#3A3A3A]" /></div>
      <section className="bg-[#F7F5F0] pt-10 md:pt-14 pb-10 md:pb-14">

        <div className="text-center mb-14 md:mb-20 px-6">
          <h2
            className="font-light"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.015em', lineHeight: 1.1, color: '#1A1A1A' }}
          >
            StoneLov
          </h2>
          <p className="mt-5 text-[#5F5E5A] font-light max-w-[480px] mx-auto" style={{ fontSize: 14, lineHeight: 1.7 }}>
            La pierre choisie comme un signe. La matière comme une mémoire.
          </p>
        </div>

        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-5xl mx-auto">
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
      {/* 7. CRAFTSMANSHIP — LOVBAG editorial */}
      {/* ————————————————————————————————————————————————————— */}
      <section
        className="w-full flex items-center justify-center text-center px-6"
        style={{ backgroundColor: '#1A1A1A', padding: '120px 24px' }}
      >
        <div className="max-w-[720px] mx-auto">
          <p
            className="uppercase"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 9,
              color: '#B4A99A',
              letterSpacing: '0.32em',
              marginBottom: 28,
            }}
          >
            Savoir-faire · LOVBAG
          </p>

          <h2
            className="italic font-light"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(44px, 7vw, 92px)',
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            Big LOV.
          </h2>
          <p
            className="italic font-light"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(44px, 7vw, 92px)',
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            Small LOV.
          </p>

          <p
            style={{
              fontSize: 14,
              color: '#B4A99A',
              marginTop: 32,
              maxWidth: 520,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            Cuir tressé à la main. Une palette de couleurs pensée comme une émotion. Une silhouette qui devient signature.
          </p>

          <Link
            to="/sacs"
            className="inline-block mt-12 hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#1A1A1A',
              padding: '16px 40px',
              borderRadius: 0,
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
            }}
          >
            Découvrir les sacs
          </Link>
        </div>
      </section>



      {/* ————————————————————————————————————————————————————— */}
      {/* 8. LIFESTYLE — Instagram universe */}
      {/* ————————————————————————————————————————————————————— */}
      <section className="pt-10 md:pt-14 pb-10 md:pb-14 text-center bg-background">
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
          href="https://www.instagram.com/lovcicov.paris/"
          target="_blank"
          rel="noopener noreferrer"
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
              href="https://www.instagram.com/lovcicov.paris/"
              target="_blank"
              rel="noopener noreferrer"
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
          href="https://www.instagram.com/lovcicov.paris/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:opacity-60 transition-opacity"
        >
          Voir notre Instagram
        </motion.a>
      </section>


      {/* ————————————————————————————————————————————————————— */}
      {/* PRESS */}
      {/* ————————————————————————————————————————————————————— */}
      <section className="py-16 md:py-20 text-center bg-white border-t border-b border-[#E8E4DD]">
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

      {/* ————————————————————————————————————————————————————— */}
      {/* 9. TRUST & REASSURANCE */}
      {/* ————————————————————————————————————————————————————— */}
      <section className="bg-white border-t border-[#EFE9DF] pt-6 md:pt-8 pb-16 md:pb-20 px-6 md:px-10">
        <div className="max-w-[1080px] mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-8 text-center">
            {[
              { title: 'Livraison offerte', desc: 'Sur toutes les commandes dès 99 €.' },
              { title: 'Paiement sécurisé', desc: 'Transactions cryptées, protection intégrale.' },
              { title: 'Retours 14 jours', desc: 'Simples et sans justification.' },
              { title: 'Conseil personnel', desc: 'Une conseillère vous répond directement.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                
                <h3 className="text-[11px] tracking-[0.28em] uppercase text-[#1A1A1A] font-medium mb-4">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#5F5E5A] font-light leading-relaxed max-w-[220px] mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      <Footer />
    </div>
  );
};


export default Index;

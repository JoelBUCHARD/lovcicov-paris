import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mysticProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12 },
  }),
};

const CollectionMystic = () => {
  return (
    <div className="min-h-screen bg-[#FFF5F5]">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-14">
        {/* Hero Header strip — black with red accent border */}
        <div className="bg-[#FFF5F5] border-b-[3px] border-[#E66060] px-6 md:px-10 py-10 md:py-14 mb-6 md:mb-8">
          <div className="text-center max-w-[640px] mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="uppercase mb-2"
            style={{ color: '#E66060', fontSize: 9, letterSpacing: '0.18em' }}
          >
            MYSTICLOV
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-sans italic text-[12px] text-[#888780] mb-3"
          >
            sweats · t-shirt · message fort
          </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#5F5E5A', maxWidth: 600, lineHeight: 1.7 }}
            >
              MYSTICLOV mélange spiritualité contemporaine, intuition et esthétique émotionnelle.
              Des créations inspirées par les fréquences, les symboles et l'invisible.
              Chaque pièce devient un mantra, une vibration, une énergie à porter.
            </motion.p>
            <div className="my-5 h-px mx-auto" style={{ width: 60, backgroundColor: '#F5D0D0' }} />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="uppercase"
              style={{ color: '#E66060', fontSize: 10, letterSpacing: '0.18em', lineHeight: 1.8 }}
            >
              Fréquence · Intuition · Énergie · Spiritualité · Rituel · Vibration · Mystère · Symboles · Protection · Guidance · Sacré · Oracle · Éveil
            </motion.p>
          </div>
        </div>



        {/* Products */}
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {mysticProducts.map((product, i) => (
              <div key={product.id} className="bg-white p-3">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Secondary claim */}
        <p
          className="text-center mt-10"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, fontStyle: 'italic', color: '#888780' }}
        >
          Spirituality meets style.
        </p>

        {/* CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-white uppercase px-8 py-3 transition-colors"
            style={{ backgroundColor: '#E66060', fontSize: 10, letterSpacing: '0.15em' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C94A4A')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E66060')}
          >
            Voir tous les produits
            <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* Footer strip */}
        <div className="bg-[#1A1A1A] border-t-[3px] border-[#E66060] mt-12 py-6 px-6 md:px-10 text-center">
          <p className="uppercase" style={{ color: '#E66060', fontSize: 9, letterSpacing: '0.18em' }}>
            MYSTICLOV · Broderies dorées · Pièces uniques · Paris
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionMystic;

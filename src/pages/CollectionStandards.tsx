import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { standardProducts } from '@/data/products';
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

const CollectionStandards = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main className="pt-40 md:pt-44 pb-24">
        {/* Hero */}
        <div className="text-center px-6 md:px-10 mb-20 md:mb-28">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[9px] uppercase tracking-[0.18em] text-[#1A1A1A] mb-8 font-medium"
          >
            POWERLOV
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="italic mb-10 text-[#1A1A1A]"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 200 }}
          >
            Wear your power.
          </motion.h1>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mx-auto"
            style={{ maxWidth: '600px' }}
          >
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#5F5E5A', lineHeight: 1.7 }}>
              POWERLOV explore la puissance interieure a travers des pieces fortes, structurees et profondement alignees. Une energie calme. Une presence affirmee. Des vetements penses pour transformer la posture et reveler la confiance instinctive.
            </p>
          </motion.div>

          {/* Keywords strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-10 overflow-hidden"
          >
            <p
              className="whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal"
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                color: '#B4A99A',
                letterSpacing: '0.18em',
                lineHeight: 1.9,
              }}
            >
              Puissance · Presence · Alignement · Aura · Force douce · Leadership · Confiance · Impact · Intensite · Magnetisme · Protection · Feu interieur
            </p>
          </motion.div>

          {/* Secondary claim */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="italic mt-10"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#888780', letterSpacing: '0.04em' }}
          >
            Calm is powerful.
          </motion.p>
        </div>


        {/* Products */}
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {standardProducts.map((product, i) => (
              <div key={product.id} className="bg-white p-3">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Secondary claim */}
        <p
          className="italic text-center mt-16"
          style={{ fontSize: '14px', color: '#888780', letterSpacing: '0.04em' }}
        >
          Wear your truth.
        </p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#E63946] transition-colors"
          >
            Voir tous les produits
            <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* Secondary claim */}
        <p
          className="italic text-center mt-16"
          style={{ fontSize: '14px', color: '#888780', letterSpacing: '0.04em' }}
        >
          Protected. Guided. Unstoppable.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionStandards;

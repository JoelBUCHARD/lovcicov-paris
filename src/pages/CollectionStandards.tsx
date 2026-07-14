import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JourneyContinuation from '@/components/JourneyContinuation';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';
import tshirtDiscipline from '@/assets/powerlov-tshirt-discipline.png';
import tshirtEmpowered from '@/assets/powerlov-tshirt-empowered.png';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12 },
  }),
};

const powerlovProducts = [
  {
    id: 'powerlov-discipline',
    name: 'T-Shirt Discipline Is My Luxury',
    image: tshirtDiscipline,
    price: '59 €',
  },
  {
    id: 'powerlov-empowered',
    name: 'T-Shirt Connected Disciplined Empowered',
    image: tshirtEmpowered,
    price: '59 €',
  },
];

const CollectionStandards = () => {
  const { isVisible } = useProductVisibility();
  const visibleProducts = powerlovProducts.filter((p) => isVisible(localKey(p.id)));
  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <Navbar />
      <main className="pt-40 md:pt-44 pb-24">
        {/* Hero */}
        <div className="text-center px-6 md:px-10 mb-20 md:mb-28 bg-[#F5F3F0]">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[9px] tracking-[0.18em] text-[#1A1A1A] mb-8 font-medium"
          >
            PowerLov
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
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#1A1A1A', lineHeight: 1.7 }}>
              PowerLov explore la puissance interieure a travers des pieces fortes, structurees et profondement alignees. Une energie calme. Une presence affirmee. Des vetements penses pour transformer la posture et reveler la confiance instinctive.
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
                color: '#888780',
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

        {/* Products — tight editorial 2-col grid */}
        <div className="bg-[#ECECEA] py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] max-w-[1400px] mx-auto px-0">
            {visibleProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-[#F5F3F0] p-6 md:p-10 flex flex-col items-center text-center"
              >
                <div className="w-full aspect-square overflow-hidden bg-[#F5F3F0]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '9px',
                    color: '#888780',
                    letterSpacing: '0.12em',
                  }}
                >
                  PowerLov
                </p>

                <h3
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    color: '#1A1A1A',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginTop: '16px',
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    color: '#1A1A1A',
                    fontWeight: 700,
                  }}
                >
                  {product.price}
                </p>
                <p
                  className="italic mt-2"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '10px',
                    color: '#888780',
                  }}
                >
                  Unisex · Coton 280g · Made in France
                </p>
                <Link
                  to="/shop"
                  className="mt-5 inline-block text-[#1A1A1A] hover:underline"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Découvrir
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secondary claim */}
        <p
          className="italic text-center mt-16"
          style={{ fontSize: '11px', color: '#888780', letterSpacing: '0.04em' }}
        >
          Wear your truth. Protected. Guided. Unstoppable.
        </p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-10 mb-4"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#2C2C2A] transition-colors"
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

export default CollectionStandards;

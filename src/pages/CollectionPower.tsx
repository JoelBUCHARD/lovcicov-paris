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

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const CollectionPower = () => {
  const shuffledProducts = shuffleArray(standardProducts);

  return (
    <div className="min-h-screen bg-[#EFEDE8]">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-0">
        {/* Hero Header strip — off-white / noir sobre */}
        <div className="bg-[#F4F2EE] border-t-[3px] border-b-[3px] border-[#0D0D0D] px-6 md:px-10 py-10 md:py-14">
          <div className="text-center max-w-[640px] mx-auto">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-2"
              style={{ color: '#0D0D0D', fontSize: 9, letterSpacing: '0.22em' }}
            >
              PowerLov
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-sans italic text-[12px] text-[#7A7A78] mb-3"
            >
              t-shirts · sweats · message fort
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#3D3D3B', maxWidth: 600, lineHeight: 1.7 }}
            >
              PowerLov incarne une vision contemporaine de la puissance parisienne : silencieuse,
              instinctive et parfaitement maîtrisée. Des lignes fortes, des silhouettes épurées,
              des pièces pensées pour structurer l'allure et révéler une confiance naturelle.
            </motion.p>
          </div>
        </div>

        {/* Products — gray background */}
        <div className="bg-[#EFEDE8] px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {shuffledProducts.map((product, i) => (
              <div key={product.id} className="bg-white p-3">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip — noir sobre */}
        <div className="bg-[#F4F2EE] border-t-[3px] border-[#0D0D0D] px-6 md:px-10 py-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 text-white uppercase px-8 py-3 transition-colors"
              style={{ backgroundColor: '#0D0D0D', fontSize: 10, letterSpacing: '0.18em' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2E2E2E')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0D0D0D')}
            >
              Voir tous les produits
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>

      </main>
      <Footer hideTopBorder />
    </div>
  );
};

export default CollectionPower;

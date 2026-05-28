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

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const CollectionMystic = () => {
  const shuffledProducts = shuffleArray(mysticProducts);

  return (
    <div className="min-h-screen bg-[#EFEDE8]">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-0">
        {/* Hero Header strip — pale red */}
        <div className="bg-[#FFF5F5] border-t-[3px] border-b-[3px] border-[#C94A4A] px-6 md:px-10 py-10 md:py-14">
          <div className="text-center max-w-[640px] mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-2"
            style={{ color: '#E66060', fontSize: 9, letterSpacing: '0.18em' }}
          >
            MysticLov
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
              MysticLov explore une esthétique instinctive, spirituelle et contemporaine.
              Inspirée par les symboles, l'énergie et les rituels modernes, la collection mélange
              mystère, émotion et élégance minimaliste à travers des pièces pensées comme des talismans contemporains.
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

        {/* CTA strip — pale red */}
        <div className="bg-[#FFF5F5] border-t-[3px] border-[#C94A4A] px-6 md:px-10 py-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
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
        </div>

      </main>
      <Footer hideTopBorder />
    </div>
  );
};

export default CollectionMystic;

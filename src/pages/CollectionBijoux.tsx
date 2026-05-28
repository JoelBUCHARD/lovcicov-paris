import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { bijouxProducts } from '@/data/products';
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

const CollectionBijoux = () => {
  return (
    <div className="min-h-screen bg-[#EFEDE8]">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-0">
        {/* Hero — StoneLov identity (terracotta strip) */}
        <div className="bg-[#FDF5EF] border-t-[3px] border-b-[3px] border-[#A55A35] px-6 md:px-10 py-10 md:py-14">
          <div className="text-center max-w-[760px] mx-auto">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[9px] tracking-[0.18em] text-[#C4714A] font-medium"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              StoneLov
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="italic text-[#1A1A1A] mt-4"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: 'clamp(24px,3.4vw,32px)', fontWeight: 200 }}
            >
              Rooted in the earth.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-[#5F5E5A] mx-auto mt-5"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, lineHeight: 1.8, maxWidth: 600 }}
            >
              StoneLov puise son inspiration dans la pierre, la terre et les matières brutes. Une vision organique et intemporelle du luxe, où l'ancrage devient élégance et où la matière protège autant qu'elle révèle.

            </motion.p>
            <div className="my-5 h-px mx-auto" style={{ width: 60, backgroundColor: '#E8C9B5' }} />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mx-auto uppercase"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: 10,
                color: '#C4714A',
                letterSpacing: '0.18em',
                lineHeight: 1.8,
              }}
            >
              Pierre · Terre · Minéral · Matière · Ancrage · Nature · Brut · Silence · Protection · Mémoire · Force ancienne · Élégance organique · Talisman
            </motion.p>
          </div>
        </div>

        {/* Products — gray background */}
        <div className="bg-[#EFEDE8] px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {bijouxProducts.map((product, i) => (
              <div key={product.id} className="bg-white p-3">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip — terracotta */}
        <div className="bg-[#FDF5EF] border-t-[3px] border-[#A55A35] px-6 md:px-10 py-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-[#C4714A] text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#A55A35] transition-colors"
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

export default CollectionBijoux;

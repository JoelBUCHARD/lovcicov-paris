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
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-24">
        {/* Hero Header — deep black */}
        <div className="bg-[#1A1A1A] border-b-[3px] border-[#E66060] text-white px-6 md:px-10 py-16 md:py-24 mb-16 md:mb-24">
          <div className="text-center">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-[9px] uppercase tracking-[0.2em] text-[#E66060] mb-8 font-medium">
              MYSTICLOV
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-4xl md:text-5xl lg:text-6xl font-medium mb-10 text-white">
              MysticLov
            </motion.h1>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="max-w-lg mx-auto space-y-6">
              <p className="text-white/80 text-[12px] leading-[1.8]" style={{ fontFamily: 'Arial, sans-serif' }}>
                MysticLov explore une dimension plus intérieure du style.
              </p>
              <p className="text-white/80 text-[12px] leading-[1.8]" style={{ fontFamily: 'Arial, sans-serif' }}>
                Inspirée par les symboles intemporels et les archétypes universels, la collection évoque intuition, mystère et expression personnelle.
              </p>
              <p className="text-white/80 text-[12px] leading-[1.8]" style={{ fontFamily: 'Arial, sans-serif' }}>
                Chaque pièce devient une manière de porter un signe, une idée ou une histoire qui dépasse le simple vêtement.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Separator */}
        <div className="px-6 md:px-10 mb-16 md:mb-24">
          <div className="max-w-lg mx-auto h-px bg-[#F5D0D0]" />
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

        {/* CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mt-20">
          <Link to="/shop" className="inline-flex items-center gap-3 bg-[#E66060] text-white text-[10px] tracking-[0.12em] uppercase px-8 py-3 hover:bg-[#C94A4A] transition-colors">
            Voir tous les produits
            <ArrowRight size={12} />
          </Link>
        </motion.div>

        {/* Footer strip */}
        <div className="bg-[#1A1A1A] border-t-[3px] border-[#E66060] mt-20 py-10 px-6 md:px-10 text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#E66060]">MysticLov · Lovcicov Paris</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionMystic;

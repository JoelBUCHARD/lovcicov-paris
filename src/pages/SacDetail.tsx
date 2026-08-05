import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductPage from '@/components/ProductPage';
import ProductCard from '@/components/ProductCard';
import { sacsProducts, getBagBySlug, BAGS } from '@/data/products';

const SacDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const bag = getBagBySlug(slug);
  const product = sacsProducts.find((p) => p.id === slug);

  if (!bag || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 px-6 md:px-12 text-center">
          <h1 className="text-2xl font-medium">Produit introuvable</h1>
          <Link to="/sacs" className="text-brand text-xs mt-4 inline-block opacity-60 hover:opacity-100">
            Retour aux Sacs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // « Vous aimerez aussi » — 3 sacs de la même famille de motif
  const related = BAGS.filter((b) => b.motif === bag.motif && b.slug !== bag.slug)
    .slice(0, 3)
    .map((b) => sacsProducts.find((p) => p.id === b.slug)!)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProductPage product={product} />

      {related.length > 0 && (
        <section
          aria-label="Vous aimerez aussi"
          style={{ padding: 'clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px) clamp(32px, 5vw, 64px)', backgroundColor: '#FAF8F4' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="text-center uppercase"
            style={{ fontSize: 10, letterSpacing: '0.28em', color: 'rgba(13,13,13,0.5)', marginBottom: 24 }}
          >
            Vous aimerez aussi
          </motion.h2>
          <div
            className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10"
            style={{ maxWidth: 1400 }}
          >
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default SacDetail;

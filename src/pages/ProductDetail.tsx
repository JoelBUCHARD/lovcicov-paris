import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const imageModules = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

const getImage = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 text-center">
          <h1 className="text-2xl font-serif">Produit introuvable</h1>
          <Link to="/shop" className="text-brand text-xs mt-4 inline-block opacity-60 hover:opacity-100">
            Retour à la Boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-6 md:px-12">
        <Link to="/shop" className="text-brand text-xs opacity-50 hover:opacity-100 transition-opacity mb-8 inline-block">
          ← Retour
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={getImage(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-brand text-xs opacity-50 mb-4">
              {product.collection === 'mystic' ? 'Mystic Lov' : 'Signature Essentials'}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">{product.name}</h1>
            <p className="text-xl mb-8">€{product.price}</p>

            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              {product.description}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              {product.details}
            </p>

            {product.state && (
              <p className="text-xs text-muted-foreground mb-8">
                État : {product.state}
              </p>
            )}

            <button className="bg-primary text-primary-foreground px-8 py-4 text-brand text-xs hover:opacity-80 transition-opacity w-full md:w-auto">
              Ajouter au Panier
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;

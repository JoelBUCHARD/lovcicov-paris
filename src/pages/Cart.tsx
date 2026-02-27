import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-6 md:px-12 min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto pt-12 md:pt-24 text-center"
        >
          <ShoppingBag size={32} strokeWidth={1} className="mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground text-sm mb-10">
            Découvrez des pièces conçues pour changer ce que vous ressentez.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 text-brand text-xs hover:opacity-80 transition-opacity"
          >
            Continuer mes Achats
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const imageModulesJpg = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModules = { ...imageModulesJpg, ...imageModulesWebp };

const getImage = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-6 md:px-12 min-h-[60vh]">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto pt-12 md:pt-24 text-center"
          >
            <ShoppingBag size={32} strokeWidth={1} className="mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Votre panier est vide</h1>
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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-2xl md:text-3xl font-medium mb-10">Votre Panier</h1>

            <div className="space-y-6 border-t border-border">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 md:gap-6 py-6 border-b border-border">
                  <Link to={`/shop/${item.product.id}`} className="w-20 md:w-28 aspect-[3/4] bg-secondary overflow-hidden flex-shrink-0">
                    <img src={getImage(item.product.image)} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/shop/${item.product.id}`} className="text-brand text-[11px] hover:opacity-70 transition-opacity">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">€{item.product.price}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 border border-border">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:opacity-60 transition-opacity">
                          <Minus size={12} />
                        </button>
                        <span className="text-xs w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:opacity-60 transition-opacity">
                          <Plus size={12} />
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-end gap-4">
              <div className="flex justify-between w-full md:w-72">
                <span className="text-brand text-xs">Total</span>
                <span className="text-sm font-medium">€{totalPrice}</span>
              </div>
              <button className="bg-primary text-primary-foreground px-8 py-4 text-brand text-xs hover:opacity-80 transition-opacity w-full md:w-72">
                Passer la Commande
              </button>
              <Link to="/shop" className="text-brand text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                Continuer mes Achats
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

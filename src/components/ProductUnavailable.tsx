import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductUnavailable = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-40 md:pt-52 pb-24 px-6 md:px-10">
      <div className="max-w-xl mx-auto text-center">
        <p
          className="text-[10px] tracking-[0.22em] uppercase mb-6"
          style={{ fontFamily: 'Arial, sans-serif', color: '#888780' }}
        >
          Indisponible
        </p>
        <h1
          className="italic mb-6"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: 32, fontWeight: 200, color: '#1A1A1A' }}
        >
          Produit indisponible pour le moment
        </h1>
        <p
          className="mb-10"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#5F5E5A', lineHeight: 1.8 }}
        >
          Cette pièce n'est pas en vente actuellement. Elle sera bientôt disponible —
          inscrivez-vous au Cercle pour être prévenu·e en avant-première.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/shop"
            className="inline-block bg-[#1A1A1A] text-white px-8 py-3 text-[10px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Retour à la Boutique
          </Link>
          <Link
            to="/le-cercle"
            className="text-[11px] tracking-[0.1em] underline opacity-60 hover:opacity-100"
            style={{ fontFamily: 'Arial, sans-serif', color: '#1A1A1A' }}
          >
            Rejoindre Le Cercle
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ProductUnavailable;

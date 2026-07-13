import { Link } from 'react-router-dom';
import { bijouxProducts } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CollectionHeader from '@/components/CollectionHeader';
import EditorialProductCard from '@/components/EditorialProductCard';
import EditorialPause from '@/components/EditorialPause';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

const CollectionBijoux = () => {
  const { isVisible } = useProductVisibility();
  const visible = bijouxProducts.filter((p) => isVisible(localKey(p.id)));
  const first = visible.slice(0, 4);
  const rest = visible.slice(4);

  return (
    <div className="min-h-screen bg-[#FDF5EF]">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24">
        <CollectionHeader
          kicker="Collection · StoneLov"
          title="Wear the stone."
          intro="La pierre choisie comme un signe. La matière devient signature, l'ancrage devient élégance."
          accent="#A55A35"
        />

        <section aria-label="Bijoux StoneLov" className="px-6 md:px-12">
          <div className="mx-auto max-w-[1360px] grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-24">
            {first.map((p, i) => (
              <EditorialProductCard
                key={p.id}
                product={{ id: p.id, name: p.name, price: p.price, image: p.image, hover: p.gallery?.[0] }}
                index={i}
                eager={i < 2}
              />
            ))}
            {rest.map((p, i) => (
              <EditorialProductCard
                key={p.id}
                product={{ id: p.id, name: p.name, price: p.price, image: p.image, hover: p.gallery?.[0] }}
                index={i}
              />
            ))}
          </div>

          {visible.length === 0 && <EmptyState />}
        </section>

        <div className="mt-24 md:mt-32 text-center px-6">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white uppercase transition-colors duration-500 hover:bg-black"
            style={{ fontSize: 10, letterSpacing: '0.28em', padding: '18px 44px', minWidth: 260 }}
          >
            Explorer toutes les pièces
          </Link>
        </div>
        <div className="mt-16 md:mt-20 -mb-10 md:-mb-14 max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
          <div className="border-t border-[#E5DFD3]" />
        </div>
      </main>
      <Footer hideTopBorder />
    </div>
  );
};

const EmptyState = () => (
  <div className="col-span-2 md:col-span-4 py-24 text-center">
    <p className="uppercase font-light mb-4" style={{ fontSize: 10, letterSpacing: '0.32em', color: '#A55A35' }}>
      La sélection évolue
    </p>
    <p
      className="italic font-light text-[#1A1A1A] mx-auto"
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(22px, 2.4vw, 28px)',
        lineHeight: 1.4,
        maxWidth: 480,
      }}
    >
      Aucune pièce à afficher pour le moment.
    </p>
    <Link
      to="/shop"
      className="inline-block mt-8 uppercase border-b border-[#1A1A1A] pb-1 text-[#1A1A1A]"
      style={{ fontSize: 10, letterSpacing: '0.28em' }}
    >
      Découvrir la boutique
    </Link>
  </div>
);

export default CollectionBijoux;

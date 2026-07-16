import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JourneyContinuation from '@/components/JourneyContinuation';
import SEO from '@/components/SEO';
import CollectionHeader from '@/components/CollectionHeader';
import EditorialProductCard, { EditorialProduct } from '@/components/EditorialProductCard';
import EditorialPause from '@/components/EditorialPause';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

import godDjCafe from '@/assets/powerlov/powerlov-grid-god-dj-cafe.png.asset.json';
import godDjStreet from '@/assets/powerlov/powerlov-grid-god-is-a-dj-street.png.asset.json';
import connectedEmpowered from '@/assets/powerlov/powerlov-grid-connected-disciplined-empowered.png.asset.json';
import boldBadassSweat from '@/assets/powerlov/powerlov-bold-badass-no-filter-sweat.png.asset.json';
import boldBadassGrid from '@/assets/powerlov/powerlov-grid-bold-badass.png.asset.json';
import ifGodIsADj from '@/assets/powerlov/powerlov-if-god-is-a-dj.png.asset.json';
import disciplineLuxuryGrid from '@/assets/powerlov/powerlov-discipline-back.png.asset.json';
import energyNeverLies from '@/assets/powerlov/powerlov-grid-energy-never-lies.png.asset.json';
import godIsADancer from '@/assets/powerlov/powerlov-grid-god-is-a-dancer.png.asset.json';
import protectedAlignedUnstoppable from '@/assets/powerlov/powerlov-protected-aligned-unstoppable-front.png.asset.json';
import sacredHeartStreet from '@/assets/powerlov/powerlov-sacred-heart-street.png.asset.json';
import sacredHeartStreetBack from '@/assets/powerlov/powerlov-sacred-heart-street-back.png.asset.json';
import sacredHeartHoodieStreetFront from '@/assets/powerlov/powerlov-sacred-heart-hoodie-street-front.png.asset.json';
import sacredHeartHoodieStreetBack from '@/assets/powerlov/powerlov-sacred-heart-hoodie-street-back.png.asset.json';

const powerProducts: EditorialProduct[] = [
  { id: 'powerlov-god-is-a-dj', name: 'God Is A DJ', price: 59, image: godDjCafe.url, hover: godDjStreet.url },
  { id: 'powerlov-empowered', name: 'Connected. Disciplined. Empowered.', price: 59, image: connectedEmpowered.url },
  { id: 'powerlov-discipline', name: 'Discipline Is My Luxury', price: 59, image: disciplineLuxuryGrid.url },
  { id: 'powerlov-if-god-dj-frequency', name: 'If God Is A DJ', price: 59, image: ifGodIsADj.url },
  { id: 'powerlov-bold-badass-tee', name: 'Bold. Badass. No Filter.', price: 59, image: boldBadassGrid.url },
  { id: 'powerlov-god-is-a-dancer', name: 'God Is A Dancer', price: 59, image: godIsADancer.url },
  { id: 'powerlov-protected-aligned-unstoppable', name: 'Protected. Aligned. Unstoppable.', price: 59, image: protectedAlignedUnstoppable.url },
  { id: 'powerlov-sacred-heart-sweat', name: 'Sacred Heart — Sweat', price: 99, image: sacredHeartStreet.url, hover: sacredHeartStreetBack.url },
  { id: 'powerlov-sacred-heart-hoodie', name: 'Sacred Heart — Hoodie', price: 109, image: sacredHeartHoodieStreetFront.url, hover: sacredHeartHoodieStreetBack.url },
  { id: 'powerlov-bold-badass-hoodie', name: 'Bold. Badass. — Hoodie', price: 99, image: boldBadassSweat.url },
  { id: 'powerlov-energy-never-lies-hoodie', name: 'Energy Never Lies — Hoodie', price: 99, image: energyNeverLies.url },
];

const CollectionPower = () => {
  const { isVisible } = useProductVisibility();
  const visiblePower = powerProducts.filter((p) => isVisible(localKey(p.id)));
  const first = visiblePower.slice(0, 4);
  const rest = visiblePower.slice(4);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEO
        title="PowerLov — T-shirts, sweats, hoodies | LOVCICOV Paris"
        description="La collection PowerLov : pièces manifestes en coton lourd, sérigraphies signatures. Wear your power."
        path="/collections/powerlov"
      />
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24">
        <CollectionHeader
          kicker="Collection · PowerLov"
          title="Wear your power."
          intro="Des silhouettes affirmées, pensées comme une posture. Une allure calme, une intention claire."
          accent="#1A1A1A"
        />

        <section aria-label="Produits PowerLov" className="px-6 md:px-12">
          <div className="mx-auto max-w-[1360px] grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-8 md:gap-y-12">
            {first.map((p, i) => (
              <EditorialProductCard key={p.id} product={p} index={i} eager={i < 2} />
            ))}
            {rest.map((p, i) => (
              <EditorialProductCard key={p.id} product={p} index={i} />
            ))}

          </div>

          {visiblePower.length === 0 && <EmptyState />}
        </section>

        <div className="mt-8 md:mt-10 text-center px-6">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white uppercase transition-colors duration-500 hover:bg-black"
            style={{ fontSize: 10, letterSpacing: '0.28em', padding: '18px 44px', minWidth: 260 }}
          >
            Explorer toutes les pièces
          </Link>
        </div>
        <div className="mt-6 md:mt-8 -mb-24 md:-mb-28 max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
          <div className="border-t border-[#E5DFD3]" />
        </div>
      </main>
      <JourneyContinuation />
      <Footer hideTopBorder />
    </div>
  );
};

const EmptyState = () => (
  <div className="col-span-2 md:col-span-4 py-24 text-center">
    <p className="uppercase font-light mb-4" style={{ fontSize: 10, letterSpacing: '0.32em', color: '#8B7D6B' }}>
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

export default CollectionPower;

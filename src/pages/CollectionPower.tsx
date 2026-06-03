import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import godDjCafe from '@/assets/powerlov/powerlov-grid-god-dj-cafe.png.asset.json';
import godDjStreet from '@/assets/powerlov/powerlov-grid-god-is-a-dj-street.png.asset.json';
import connectedEmpowered from '@/assets/powerlov/powerlov-grid-connected-disciplined-empowered.png.asset.json';
import boldBadassSweat from '@/assets/powerlov/powerlov-bold-badass-no-filter-sweat.png.asset.json';
import boldBadassTeeBack from '@/assets/powerlov/powerlov-bold-badass-no-filter-tee-back.png.asset.json';
import boldBadassStreet from '@/assets/powerlov/powerlov-grid-bold-badass-street.png.asset.json';
import boldBadassGrid from '@/assets/powerlov/powerlov-grid-bold-badass.png.asset.json';
import ifGodIsADj from '@/assets/powerlov/powerlov-if-god-is-a-dj.png.asset.json';
import disciplineLuxury from '@/assets/powerlov/powerlov-discipline-is-my-luxury.png.asset.json';
import disciplineLuxuryGrid from '@/assets/powerlov/powerlov-grid-discipline-is-my-luxury.png.asset.json';
import energyNeverLies from '@/assets/powerlov/powerlov-grid-energy-never-lies.png.asset.json';
import godIsADancer from '@/assets/powerlov/powerlov-grid-god-is-a-dancer.png.asset.json';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12 },
  }),
};

type PowerProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  hover?: string;
  badge?: string;
};

const powerProducts: PowerProduct[] = [
  {
    id: 'powerlov-god-is-a-dj',
    name: 'T-Shirt God Is A DJ',
    price: 59,
    image: godDjCafe.url,
    hover: ifGodIsADj.url,
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-empowered',
    name: 'T-Shirt Connected. Disciplined. Empowered.',
    price: 59,
    image: connectedEmpowered.url,
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-discipline',
    name: 'T-Shirt Discipline Is My Luxury',
    price: 59,
    image: disciplineLuxuryGrid.url,
    hover: disciplineLuxury.url,
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-bold-badass-tee',
    name: 'T-Shirt Bold. Badass. No Filter.',
    price: 59,
    image: boldBadassGrid.url,
    hover: boldBadassTeeBack.url,
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-god-is-a-dancer',
    name: 'T-Shirt God Is A Dancer',
    price: 59,
    image: godIsADancer.url,
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-bold-badass-hoodie',
    name: 'Sweat Capuche Bold. Badass. No Filter.',
    price: 99,
    image: boldBadassSweat.url,
    hover: boldBadassStreet.url,
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-energy-never-lies-hoodie',
    name: 'Sweat Capuche Energy Never Lies',
    price: 99,
    image: energyNeverLies.url,
    badge: 'UNISEX',
  },
];

// suppress unused import warning
void godDjStreet;

const PowerProductCard = ({ product, index }: { product: PowerProduct; index: number }) => {
  const location = useLocation();
  const from = `${location.pathname}${location.search}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="h-full w-full"
    >
      <Link
        to={`/shop/${product.id}`}
        state={{ from }}
        className="group flex flex-col h-full bg-white overflow-hidden"
      >
        <div className="aspect-[3/4] overflow-hidden bg-[#EFEDE8] relative shrink-0">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              product.hover ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform duration-700'
            }`}
          />
          {product.hover && (
            <img
              src={product.hover}
              alt={`${product.name} — vue alternative`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </div>
        <div className="space-y-1 text-center pb-3 pt-3 px-2 mt-auto">
          <h3 className="text-brand uppercase" style={{ fontSize: 10, letterSpacing: '0.14em', color: '#0D0D0D' }}>
            {product.name}
          </h3>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#3D3D3B' }}>€{product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

const CollectionPower = () => {
  return (
    <div className="min-h-screen bg-[#EFEDE8]">
      <Navbar />
      <main className="pt-32 md:pt-36 pb-0">
        {/* Hero Header strip — off-white / noir sobre */}
        <div className="bg-[#F4F2EE] border-t-[3px] border-b-[3px] border-[#0D0D0D] px-6 md:px-10 py-10 md:py-14">
          <div className="text-center max-w-[640px] mx-auto">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-2"
              style={{ color: '#0D0D0D', fontSize: 9, letterSpacing: '0.22em' }}
            >
              PowerLov
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-sans italic text-[12px] text-[#7A7A78] mb-3"
            >
              t-shirts · sweats · message fort
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mx-auto"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#3D3D3B', maxWidth: 600, lineHeight: 1.7 }}
            >
              PowerLov incarne une vision contemporaine de la puissance parisienne : silencieuse,
              instinctive et parfaitement maîtrisée. Des lignes fortes, des silhouettes épurées,
              des pièces pensées pour structurer l'allure et révéler une confiance naturelle.
            </motion.p>
          </div>
        </div>

        {/* Products — gray background */}
        <div className="bg-[#EFEDE8] px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {powerProducts.map((product, i) => (
              <div key={product.id} className="bg-white p-3">
                <PowerProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip — noir sobre */}
        <div className="bg-[#F4F2EE] border-t-[3px] border-[#0D0D0D] px-6 md:px-10 py-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 text-white uppercase px-8 py-3 transition-colors"
              style={{ backgroundColor: '#0D0D0D', fontSize: 10, letterSpacing: '0.18em' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2E2E2E')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0D0D0D')}
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

export default CollectionPower;

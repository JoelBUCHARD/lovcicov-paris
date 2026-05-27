import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import { usePowerLovSalesCount } from '@/hooks/usePowerLovSalesCount';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

const ARIAL = 'Arial, sans-serif';
const BEIGE = '#FAF7F2';
const BEIGE_BORDER = '#E8E4DC';
const MUTED = '#888780';
const SOFT = '#B4A99A';
const INK = '#1A1A1A';

const isTshirt = (p: ShopifyProduct) => {
  const t = (p.node.productType || '').toLowerCase();
  const title = p.node.title.toLowerCase();
  const tags = (p.node.tags || []).map((x) => x.toLowerCase());
  return (
    t.includes('t-shirt') ||
    t.includes('tshirt') ||
    t.includes('tee') ||
    title.includes('t-shirt') ||
    title.includes('tshirt') ||
    tags.some((x) => x.includes('t-shirt') || x.includes('tshirt') || x.includes('tee'))
  );
};

const ProductGrid = ({ products }: { products: ShopifyProduct[] }) => (
  <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-6xl">
    {products.map((p, i) => (
      <ShopifyProductCard key={p.node.id} product={p} index={i} />
    ))}
  </div>
);

const CampagneSac = () => {
  const { sold, target } = usePowerLovSalesCount();
  const pct = Math.min(100, (sold / target) * 100);
  const [participants, setParticipants] = useState<ShopifyProduct[]>([]);
  const [allTees, setAllTees] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    fetchShopifyProducts(12, 'tag:powerlov')
      .then((p) => {
        if (p.length) setParticipants(p);
        else return fetchShopifyProducts(12).then(setParticipants);
      })
      .catch(() => setParticipants([]));

    fetchShopifyProducts(100)
      .then((all) => {
        const tees = all.filter(isTshirt);
        setAllTees(tees.length ? tees : all);
      })
      .catch(() => setAllTees([]));
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: BEIGE }}>
      <Navbar />

      {/* HERO */}
      <section
        className="w-full flex items-center justify-center text-center px-6"
        style={{ backgroundColor: INK, height: '75vh' }}
      >
        <div>
          <h1
            className="italic"
            style={{
              fontFamily: ARIAL,
              fontSize: 'clamp(40px, 7vw, 90px)',
              fontWeight: 200,
              color: '#FFFFFF',
              marginTop: 140,
              lineHeight: 1.05,
            }}
          >
            Un sac Saint Laurent
          </h1>
          <h2
            className="italic"
            style={{
              fontFamily: ARIAL,
              fontSize: 'clamp(40px, 7vw, 90px)',
              fontWeight: 200,
              color: '#FFFFFF',
              lineHeight: 1.05,
            }}
          >
            à gagner.
          </h2>
          <p style={{ fontFamily: ARIAL, fontSize: 13, color: SOFT, marginTop: 16 }}>
            Pour les 1000 premiers t-shirts vendus.
          </p>
          <Link
            to="/collections/t-shirts"
            className="inline-block mt-10 hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#FFFFFF',
              color: INK,
              padding: '14px 32px',
              borderRadius: 0,
              fontFamily: ARIAL,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Découvrir les t-shirts
          </Link>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section
        className="w-full text-center px-6"
        style={{ backgroundColor: BEIGE, padding: '60px 24px' }}
      >
        <p
          style={{
            fontFamily: ARIAL,
            fontSize: 9,
            textTransform: 'uppercase',
            color: SOFT,
            letterSpacing: '0.2em',
          }}
        >
          T-shirts vendus
        </p>
        <p
          style={{
            fontFamily: ARIAL,
            fontSize: 'clamp(60px, 12vw, 160px)',
            fontWeight: 200,
            color: INK,
            lineHeight: 1.1,
            marginTop: 16,
          }}
        >
          {sold} / {target}
        </p>

        <div
          className="mx-auto"
          style={{
            maxWidth: 600,
            height: 4,
            backgroundColor: BEIGE_BORDER,
            marginTop: 24,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              backgroundColor: INK,
              transition: 'width 0.8s ease',
            }}
          />
        </div>

        <p className="italic" style={{ fontFamily: ARIAL, fontSize: 12, color: MUTED }}>
          Chaque t-shirt vendu vous rapproche du tirage.
        </p>
      </section>

      {/* RULES */}
      <section
        className="mx-auto"
        style={{ backgroundColor: '#FFFFFF', padding: '80px 40px', maxWidth: 700 }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: ARIAL,
            fontSize: 9,
            textTransform: 'uppercase',
            color: INK,
            letterSpacing: '0.2em',
            marginBottom: 40,
          }}
        >
          Les 4 conditions
        </p>

        {[
          { n: '01', title: 'Acheter un t-shirt', text: 'Sur lovcicov.com · PowerLov ou MysticLov' },
          { n: '02', title: "S'abonner sur Instagram", text: '@lovcicov.paris · Compte public' },
          { n: '03', title: 'Rejoindre Le Cercle', text: "S'inscrire sur lovcicov.com/le-cercle" },
          { n: '04', title: 'Repartager le post en story', text: 'Avec le hashtag #LovcicovCercle' },
        ].map((step, i) => (
          <div
            key={step.n}
            style={{
              borderTop: i === 0 ? 'none' : `0.5px solid ${BEIGE_BORDER}`,
              padding: '28px 0',
            }}
          >
            <p
              style={{
                fontFamily: ARIAL,
                fontSize: 48,
                fontWeight: 200,
                color: BEIGE_BORDER,
                lineHeight: 1,
              }}
            >
              {step.n}
            </p>
            <p
              style={{
                fontFamily: ARIAL,
                fontSize: 16,
                fontWeight: 700,
                color: INK,
                marginTop: 8,
              }}
            >
              {step.title}
            </p>
            <p
              className="italic"
              style={{ fontFamily: ARIAL, fontSize: 12, color: MUTED, marginTop: 4 }}
            >
              {step.text}
            </p>
          </div>
        ))}
      </section>

      {/* PARTICIPANTS */}
      <section className="w-full" style={{ backgroundColor: BEIGE, padding: '80px 24px' }}>
        <p
          className="text-center"
          style={{
            fontFamily: ARIAL,
            fontSize: 9,
            textTransform: 'uppercase',
            color: INK,
            letterSpacing: '0.2em',
            marginBottom: 40,
          }}
        >
          Les t-shirts participants
        </p>
        <ProductGrid products={allTees} />
      </section>

      {/* HASHTAG */}
      <section
        className="w-full text-center"
        style={{ backgroundColor: INK, padding: '60px 40px' }}
      >
        <p
          style={{
            fontFamily: ARIAL,
            fontSize: 'clamp(32px, 6vw, 80px)',
            fontWeight: 200,
            color: '#FFFFFF',
            letterSpacing: '0.05em',
          }}
        >
          #LovcicovCercle
        </p>
        <p className="italic" style={{ fontFamily: ARIAL, fontSize: 13, color: SOFT, marginTop: 12 }}>
          Rejoignez le mouvement. Taguez-nous.
        </p>
      </section>

      {/* LEGAL */}
      <section
        className="mx-auto"
        style={{
          backgroundColor: BEIGE,
          borderTop: `0.5px solid ${BEIGE_BORDER}`,
          padding: 40,
          maxWidth: 600,
        }}
      >
        <p
          className="italic text-center"
          style={{ fontFamily: ARIAL, fontSize: 11, color: SOFT, lineHeight: 1.8 }}
        >
          Tirage au sort effectué à la vente du 1000ème t-shirt. Une voie d'accès gratuite est
          disponible sans obligation d'achat : envoyer un email à contact@lovcicov.com avec
          l'objet « Je rejoins le Cercle ». Règlement complet disponible sur demande.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default CampagneSac;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePowerLovSalesCount } from '@/hooks/usePowerLovSalesCount';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

const ARIAL = 'Arial, sans-serif';
const TERRA = '#C4714A';

const CampagneSac = () => {
  const { sold, target } = usePowerLovSalesCount();
  const pct = Math.min(100, (sold / target) * 100);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    fetchShopifyProducts(12, 'tag:powerlov')
      .then((p) => {
        if (p.length) setProducts(p);
        else return fetchShopifyProducts(12).then(setProducts);
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section
        className="w-full flex items-center justify-center text-center px-6"
        style={{ backgroundColor: '#1A1A1A', height: '90vh' }}
      >
        <div>
          <p
            style={{
              fontFamily: ARIAL,
              fontSize: 9,
              textTransform: 'uppercase',
              color: TERRA,
              letterSpacing: '0.2em',
            }}
          >
            LOVCICOV PARIS · CAMPAGNE LANCEMENT
          </p>
          <h1
            className="italic"
            style={{
              fontFamily: ARIAL,
              fontSize: 'clamp(40px, 7vw, 90px)',
              fontWeight: 200,
              color: '#FFFFFF',
              marginTop: 24,
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
              color: TERRA,
              lineHeight: 1.05,
            }}
          >
            à gagner.
          </h2>
          <p
            style={{
              fontFamily: ARIAL,
              fontSize: 13,
              color: '#B4A99A',
              marginTop: 16,
            }}
          >
            Pour les 500 premiers t-shirts PowerLov vendus.
          </p>
          <Link
            to="/collections/powerlov"
            className="inline-block mt-10 hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#1A1A1A',
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
        style={{ backgroundColor: '#FAF7F2', padding: '60px 24px' }}
      >
        <p
          style={{
            fontFamily: ARIAL,
            fontSize: 9,
            textTransform: 'uppercase',
            color: '#B4A99A',
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
            color: '#1A1A1A',
            lineHeight: 1.1,
            marginTop: 16,
          }}
        >
          {sold} / <span style={{ color: TERRA }}>{target}</span>
        </p>

        <div
          className="mx-auto"
          style={{
            maxWidth: 600,
            height: 4,
            backgroundColor: '#E8E4DC',
            marginTop: 24,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              backgroundColor: TERRA,
              transition: 'width 0.8s ease',
            }}
          />
        </div>

        <p
          className="italic"
          style={{
            fontFamily: ARIAL,
            fontSize: 12,
            color: '#888780',
          }}
        >
          Chaque t-shirt vendu vous rapproche du tirage.
        </p>
      </section>

      {/* RULES */}
      <section
        className="mx-auto"
        style={{
          backgroundColor: '#FFFFFF',
          padding: '80px 40px',
          maxWidth: 700,
        }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: ARIAL,
            fontSize: 9,
            textTransform: 'uppercase',
            color: '#1A1A1A',
            letterSpacing: '0.2em',
            marginBottom: 40,
          }}
        >
          Les 4 conditions
        </p>

        {[
          {
            n: '01',
            title: 'Acheter un t-shirt PowerLov',
            text: 'Sur lovcicov.com · Collection PowerLov',
          },
          {
            n: '02',
            title: "S'abonner sur Instagram",
            text: '@lovcicov.paris · Compte public',
          },
          {
            n: '03',
            title: 'Rejoindre Le Cercle',
            text: "S'inscrire sur lovcicov.com/le-cercle",
          },
          {
            n: '04',
            title: 'Repartager le post en story',
            text: 'Avec le hashtag #LovcicovCercle',
          },
        ].map((step, i) => (
          <div
            key={step.n}
            style={{
              borderTop: i === 0 ? 'none' : '0.5px solid #E8E4DC',
              padding: '28px 0',
            }}
          >
            <p
              style={{
                fontFamily: ARIAL,
                fontSize: 48,
                fontWeight: 200,
                color: '#E8E4DC',
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
                color: '#1A1A1A',
                marginTop: 8,
              }}
            >
              {step.title}
            </p>
            <p
              className="italic"
              style={{
                fontFamily: ARIAL,
                fontSize: 12,
                color: '#888780',
                marginTop: 4,
              }}
            >
              {step.text}
            </p>
          </div>
        ))}
      </section>

      {/* HASHTAG */}
      <section
        className="w-full text-center"
        style={{ backgroundColor: '#1A1A1A', padding: '60px 40px' }}
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
        <p
          className="italic"
          style={{
            fontFamily: ARIAL,
            fontSize: 13,
            color: '#B4A99A',
            marginTop: 12,
          }}
        >
          Rejoignez le mouvement. Taguez-nous.
        </p>
      </section>

      {/* POWERLOV T-SHIRTS */}
      <section
        className="w-full"
        style={{ backgroundColor: '#FAF7F2', padding: '80px 24px' }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: ARIAL,
            fontSize: 9,
            textTransform: 'uppercase',
            color: '#1A1A1A',
            letterSpacing: '0.2em',
            marginBottom: 40,
          }}
        >
          Les t-shirts participants
        </p>

        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
          {products.map((p) => {
            const img = p.node.images.edges[0]?.node.url;
            return (
              <Link
                key={p.node.id}
                to={`/product/${p.node.handle}`}
                className="block group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-white mb-3">
                  {img && (
                    <img
                      src={img}
                      alt={p.node.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <p
                  style={{
                    fontFamily: ARIAL,
                    fontSize: 12,
                    color: '#1A1A1A',
                  }}
                >
                  {p.node.title}
                </p>
                <p
                  style={{
                    fontFamily: ARIAL,
                    fontSize: 12,
                    color: '#888780',
                    marginTop: 2,
                  }}
                >
                  €{Number(p.node.priceRange.minVariantPrice.amount).toFixed(0)}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/collections/powerlov"
            className="hover:underline"
            style={{
              fontFamily: ARIAL,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#1A1A1A',
            }}
          >
            Voir toute la collection PowerLov →
          </Link>
        </div>
      </section>

      {/* LEGAL */}
      <section
        className="mx-auto"
        style={{
          backgroundColor: '#FAF7F2',
          borderTop: '0.5px solid #E8E4DC',
          padding: 40,
          maxWidth: 600,
        }}
      >
        <p
          className="italic text-center"
          style={{
            fontFamily: ARIAL,
            fontSize: 11,
            color: '#B4A99A',
            lineHeight: 1.8,
          }}
        >
          Tirage au sort effectué à la vente du 500ème t-shirt PowerLov. Une
          voie d'accès gratuite est disponible sans obligation d'achat :
          envoyer un email à contact@lovcicov.com avec l'objet « Je rejoins
          le Cercle ». Règlement complet disponible sur demande.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default CampagneSac;

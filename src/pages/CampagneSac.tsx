import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Users, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePowerLovSalesCount } from '@/hooks/usePowerLovSalesCount';
import sacImage from '@/assets/campagne-sac-saint-laurent.jpg';

const INK = '#0A0A0A';
const CREAM = '#FAF7F2';
const BORDER = 'rgba(250,247,242,0.18)';
const MUTED = 'rgba(250,247,242,0.6)';

// Countdown target — adjust as needed
const DRAW_DATE = new Date('2026-09-30T20:00:00+02:00');

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span
      className="tabular-nums"
      style={{
        fontFamily: 'Instrument Sans, sans-serif',
        fontSize: 'clamp(38px, 6vw, 64px)',
        fontWeight: 300,
        color: CREAM,
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}
    >
      {String(value).padStart(2, '0')}
    </span>
    <span
      className="mt-2"
      style={{
        fontFamily: 'Instrument Sans, sans-serif',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: '0.25em',
        color: MUTED,
      }}
    >
      {label}
    </span>
  </div>
);

const CampagneSac = () => {
  const { days, hours, minutes, seconds } = useCountdown(DRAW_DATE);
  const { sold } = usePowerLovSalesCount();
  const target = 500;
  const pct = Math.min(100, (sold / target) * 100);

  const conditions = [
    {
      n: '01',
      icon: Instagram,
      title: "S'abonner sur Instagram",
      text: '@lovcicov.paris',
    },
    {
      n: '02',
      icon: Users,
      title: 'Rejoindre Le Cercle',
      text: 'lovcicov.com/le-cercle',
    },
    {
      n: '03',
      icon: Share2,
      title: 'Repartager le post en story',
      text: '#LovcicovCercle',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: INK, color: CREAM }}>
      <Navbar />

      {/* HERO */}
      <section
        className="w-full flex flex-col items-center text-center px-6"
        style={{ backgroundColor: INK, paddingTop: 140, paddingBottom: 80 }}
      >
        <p
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: MUTED,
            marginBottom: 24,
          }}
        >
          Édition limitée · PowerLov
        </p>

        <h1
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: 'clamp(36px, 6.5vw, 84px)',
            fontWeight: 200,
            color: CREAM,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: 1100,
          }}
        >
          Un sac. Une chance.
          <br />
          Une communauté.
        </h1>

        <div className="w-full mt-16" style={{ maxWidth: 900 }}>
          <img
            src={sacImage}
            alt="Sac Saint Laurent à gagner"
            className="w-full h-auto object-contain"
            style={{ maxHeight: '70vh' }}
          />
        </div>

        {/* COUNTDOWN */}
        <p
          className="mt-16"
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: MUTED,
            marginBottom: 24,
          }}
        >
          Fin du tirage dans
        </p>
        <div className="flex items-start gap-6 md:gap-12">
          <TimeBlock value={days} label="Jours" />
          <span style={{ fontSize: 'clamp(38px, 6vw, 64px)', color: MUTED, lineHeight: 1, fontWeight: 200 }}>:</span>
          <TimeBlock value={hours} label="Heures" />
          <span style={{ fontSize: 'clamp(38px, 6vw, 64px)', color: MUTED, lineHeight: 1, fontWeight: 200 }}>:</span>
          <TimeBlock value={minutes} label="Min" />
          <span style={{ fontSize: 'clamp(38px, 6vw, 64px)', color: MUTED, lineHeight: 1, fontWeight: 200 }}>:</span>
          <TimeBlock value={seconds} label="Sec" />
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="w-full px-6" style={{ paddingTop: 100, paddingBottom: 80 }}>
        <p
          className="text-center"
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: MUTED,
            marginBottom: 16,
          }}
        >
          Comment participer
        </p>
        <h2
          className="text-center"
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 200,
            color: CREAM,
            letterSpacing: '-0.01em',
            marginBottom: 64,
          }}
        >
          Trois étapes simples.
        </h2>

        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-px" style={{ maxWidth: 1100, backgroundColor: BORDER }}>
          {conditions.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.n}
                className="flex flex-col items-center text-center px-8 py-12"
                style={{ backgroundColor: INK }}
              >
                <span
                  style={{
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.3em',
                    color: MUTED,
                    marginBottom: 28,
                  }}
                >
                  {c.n}
                </span>
                <Icon size={32} strokeWidth={1} color={CREAM} />
                <p
                  className="mt-6"
                  style={{
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: 17,
                    fontWeight: 400,
                    color: CREAM,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {c.title}
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: 13,
                    color: MUTED,
                  }}
                >
                  {c.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Link
            to="/collections/t-shirts"
            className="inline-block transition-opacity hover:opacity-80"
            style={{
              backgroundColor: CREAM,
              color: INK,
              padding: '18px 44px',
              borderRadius: 0,
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
            }}
          >
            Je tente ma chance
          </Link>
        </div>
      </section>

      {/* PROGRESS */}
      <section
        className="w-full px-6"
        style={{
          paddingTop: 80,
          paddingBottom: 120,
          borderTop: `0.5px solid ${BORDER}`,
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <p
            className="text-center"
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: MUTED,
              marginBottom: 24,
            }}
          >
            Progression de la campagne
          </p>
          <div className="flex items-baseline justify-between mb-5">
            <span
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 300,
                color: CREAM,
                letterSpacing: '-0.02em',
              }}
            >
              {sold}
              <span style={{ color: MUTED }}> / {target}</span>
            </span>
            <span
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: MUTED,
              }}
            >
              t-shirts vendus
            </span>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{ height: 4, backgroundColor: BORDER }}
          >
            <div
              className="h-full transition-all duration-700"
              style={{ width: `${pct}%`, backgroundColor: CREAM }}
            />
          </div>

          <p
            className="text-center italic mt-8"
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: 14,
              color: MUTED,
            }}
          >
            {sold} t-shirts vendus sur {target} — continuez.
          </p>
        </div>
      </section>

      {/* LEGAL */}
      <section
        className="mx-auto px-6"
        style={{
          borderTop: `0.5px solid ${BORDER}`,
          paddingTop: 40,
          paddingBottom: 60,
          maxWidth: 700,
        }}
      >
        <p
          className="italic text-center"
          style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: 11,
            color: MUTED,
            lineHeight: 1.8,
          }}
        >
          Tirage au sort effectué à la vente du 500ème t-shirt. Une voie d'accès gratuite est
          disponible sans obligation d'achat : envoyer un email à contact@lovcicov.com avec
          l'objet « Je rejoins le Cercle ». Règlement complet disponible sur demande.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default CampagneSac;

/**
 * Bloc « Le savoir-faire » — réutilisé sur /sacs et sur chaque fiche produit.
 * [À COMPLÉTER] : visuels d'illustration dédiés (atelier, détail de tressage,
 * macro du charm cœur). En attendant, traitement typographique épuré.
 */
const PILLARS = [
  {
    title: "Cuir de buffle tressé main",
    text: "Un fil de cuir après l'autre, technique intrecciato. Chaque sac demande des heures de tressage.",
  },
  {
    title: "Ouverture en V",
    text: "La signature de la collection : une échancrure nette, tressée sur tout son pourtour.",
  },
  {
    title: "Charm cœur signature",
    text: "Un cœur en cuir gravé LOVCICOV PARIS, suspendu à chaque sac de la maison.",
  },
];

const SavoirFaire = () => (
  <section
    aria-label="Le savoir-faire LOVCICOV"
    style={{
      backgroundColor: "#FFFDF9",
      padding: "clamp(56px, 8vw, 112px) clamp(24px, 5vw, 72px)",
    }}
    className="border-t border-[rgba(13,13,13,0.08)]"
  >
    <p
      className="text-center uppercase"
      style={{ fontSize: 10, letterSpacing: "0.28em", color: "rgba(13,13,13,0.55)", marginBottom: 40 }}
    >
      Le savoir-faire
    </p>
    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10" style={{ maxWidth: 1100 }}>
      {PILLARS.map((p) => (
        <div key={p.title} className="text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-6"
            style={{ width: 32, height: 1, backgroundColor: "#B3151C" }}
          />
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(20px, 2vw, 26px)",
              color: "#1A1A1A",
              marginBottom: 12,
            }}
          >
            {p.title}
          </h3>
          <p
            className="mx-auto"
            style={{ maxWidth: 300, fontSize: 14, lineHeight: 1.75, color: "rgba(13,13,13,0.68)" }}
          >
            {p.text}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default SavoirFaire;

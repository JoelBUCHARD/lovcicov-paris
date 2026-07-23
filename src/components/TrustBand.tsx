const items = [
  { title: "Livraison offerte", text: "En France métropolitaine dès 150 € d'achat. Expédition Europe et international depuis Marseille." },
  { title: "Paiement sécurisé", text: "Cartes bancaires, Apple Pay et Google Pay. Transactions chiffrées, données jamais conservées." },
  { title: "Retours faciles", text: "14 jours pour changer d'avis. Articles non portés dans leur emballage d'origine." },
];

const TrustBand = () => (
  <section
    aria-label="Nos engagements"
    style={{ padding: "clamp(48px, 6vw, 88px) clamp(24px, 5vw, 72px)", backgroundColor: "#FFFFFF" }}
    className="border-t border-border/70"
  >
    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-5xl text-center">
      {items.map((b) => (
        <div key={b.title}>
          <p className="uppercase mb-4" style={{ fontSize: 11, letterSpacing: "0.24em", color: "#0D0D0D" }}>
            {b.title}
          </p>
          <p className="mx-auto max-w-xs" style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(13,13,13,0.65)" }}>
            {b.text}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBand;

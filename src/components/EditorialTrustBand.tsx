interface Props {
  bg: string;
  ink: string;
}

const items = [
  {
    title: "Livraison offerte",
    text: "En France métropolitaine dès 150 € d'achat. Expédition Europe et international depuis Marseille.",
  },
  {
    title: "Paiement sécurisé",
    text: "Cartes bancaires, Apple Pay et Google Pay. Transactions chiffrées, données jamais conservées.",
  },
  {
    title: "Retours faciles",
    text: "14 jours pour changer d'avis. Articles non portés dans leur emballage d'origine.",
  },
];

const EditorialTrustBand = ({ bg, ink }: Props) => (
  <section
    aria-label="Nos engagements"
    style={{ padding: "clamp(48px, 6vw, 88px) clamp(24px, 5vw, 72px)", backgroundColor: bg }}
  >
    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-5xl text-center">
      {items.map((b) => (
        <div key={b.title}>
          <p
            className="uppercase mb-4"
            style={{ fontSize: 11, letterSpacing: "0.24em", color: ink }}
          >
            {b.title}
          </p>
          <p
            className="mx-auto max-w-xs"
            style={{ fontSize: 13, lineHeight: 1.7, color: `${ink}A6` }}
          >
            {b.text}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default EditorialTrustBand;

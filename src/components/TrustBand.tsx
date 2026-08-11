import { TRUST_SHIPPING_TEXT, TRUST_PAYMENT_TEXT, TRUST_RETURNS_TEXT } from "@/lib/shipping";

const items = [
  { title: "Livraison offerte", text: TRUST_SHIPPING_TEXT },
  { title: "Paiement sécurisé", text: TRUST_PAYMENT_TEXT },
  { title: "Retours faciles", text: TRUST_RETURNS_TEXT },
];

const TrustBand = () => (
  <section
    aria-label="Nos engagements"
    style={{ backgroundColor: "#FFFFFF" }}
    className="border-t border-b border-[#E8E4DD] px-6 pt-10 pb-8 md:px-[clamp(24px,5vw,72px)] md:pt-[clamp(48px,6vw,88px)] md:pb-[clamp(48px,6vw,88px)]"
  >
    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-5xl text-center">

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

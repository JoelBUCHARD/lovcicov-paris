import { detectStones } from "@/data/stoneMeanings";

interface Props {
  productName: string;
  productDescription?: string;
  fallback?: string;
}

const StoneMeaningBlock = ({ productName, productDescription = "", fallback }: Props) => {
  const stones = detectStones(`${productName} ${productDescription}`);

  if (stones.length === 0 && !fallback) return null;

  return (
    <section
      className="mb-8"
      style={{
        backgroundColor: "#FDF5EF",
        padding: 40,
        borderTop: "1px solid #E8D8C8",
      }}
    >
      <p
        className="mb-6"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 9,
          textTransform: "uppercase",
          color: "#C4714A",
          letterSpacing: "0.2em",
        }}
      >
        L'ÉNERGIE DES PIERRES
      </p>

      {stones.length > 0 ? (
        <ul className="space-y-5">
          {stones.map((stone) => (
            <li key={stone.key} className="flex items-start gap-3">
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#C4714A",
                  marginTop: 6,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 12,
                  color: "#5F5E5A",
                  fontStyle: "italic",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: 9,
                    color: "#C4714A",
                    letterSpacing: "0.15em",
                    fontWeight: 700,
                    fontStyle: "normal",
                    textTransform: "uppercase",
                    marginRight: 8,
                  }}
                >
                  {stone.name}
                </span>
                <span style={{ color: "#C4714A", marginRight: 8, fontStyle: "normal" }}>—</span>
                {stone.meaning}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 12,
            color: "#5F5E5A",
            fontStyle: "italic",
            lineHeight: 1.8,
          }}
        >
          {fallback}
        </p>
      )}
    </section>
  );
};

export default StoneMeaningBlock;

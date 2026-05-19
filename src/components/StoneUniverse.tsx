import { HERO_STONE_KEYS, STONE_MEANINGS } from "@/data/stoneMeanings";

const StoneUniverse = () => {
  const stones = HERO_STONE_KEYS.map((k) => STONE_MEANINGS.find((s) => s.key === k)!).filter(Boolean);

  return (
    <section
      style={{
        backgroundColor: "#FDF5EF",
        padding: 40,
        borderTop: "1px solid #E8D8C8",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-center mb-3"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 9,
            color: "#C4714A",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          L'UNIVERS DES PIERRES
        </p>
        <h2
          className="text-center italic mb-10"
          style={{
            color: "#1A1A1A",
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 300,
          }}
        >
          Chaque pierre, une intention.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {stones.map((stone) => (
            <article
              key={stone.key}
              style={{
                backgroundColor: "#FFFFFF",
                border: "0.5px solid #E8D8C8",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div style={{ height: 6, backgroundColor: stone.color }} />
              <h3
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 11,
                  color: "#1A1A1A",
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "16px 16px 4px",
                  margin: 0,
                }}
              >
                {stone.name}
              </h3>
              <p
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 11,
                  color: "#5F5E5A",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  padding: "0 16px 16px",
                  margin: 0,
                }}
              >
                {stone.meaning}
              </p>
            </article>
          ))}
        </div>

        <p
          className="text-center mt-10"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 12,
            color: "#B4A99A",
            fontStyle: "italic",
          }}
        >
          Chaque pierre est sélectionnée à la main. Chaque pièce est unique.
        </p>
      </div>
    </section>
  );
};

export default StoneUniverse;

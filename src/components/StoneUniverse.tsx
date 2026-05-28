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



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {stones.map((stone, index) => (
            <article
              key={stone.key}
              className={index >= 3 ? "hidden md:block" : ""}
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

      </div>
    </section>
  );
};

export default StoneUniverse;

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
        <div className="flex justify-center mb-4">
          <div style={{ backgroundColor: "rgba(250,247,242,0.6)", padding: "4px 10px", borderRadius: 1 }}>
            <p className="text-[9px]" style={{ color: "#C4714A", letterSpacing: "0.25em" }}>
              StoneLov
            </p>
          </div>
        </div>
        <p
          className="text-center mx-auto mb-10"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 13,
            color: "#5F5E5A",
            lineHeight: 1.8,
            maxWidth: 580,
          }}
        >
          StoneLov puise son inspiration dans la pierre, la terre et les matières brutes. Une vision organique et intemporelle du luxe, où l'ancrage devient élégance et où la matière protège autant qu'elle révèle.
        </p>


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

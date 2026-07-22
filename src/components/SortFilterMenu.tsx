import { useEffect, useRef, useState } from "react";

export type SortKey = "default" | "price-asc" | "price-desc" | "name-asc";

export const SORT_LABELS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Notre sélection" },
  { key: "price-asc", label: "Prix croissant" },
  { key: "price-desc", label: "Prix décroissant" },
  { key: "name-asc", label: "Ordre alphabétique" },
];

interface Props {
  sort: SortKey;
  onChange: (key: SortKey) => void;
}

const SortFilterMenu = ({ sort, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="uppercase whitespace-nowrap flex items-center gap-1.5"
        style={{
          fontSize: 10,
          letterSpacing: "0.24em",
          color: sort !== "default" ? "#0D0D0D" : "rgba(13,13,13,0.6)",
        }}
      >
        Filtres
        {sort !== "default" && (
          <span aria-hidden="true" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#0D0D0D" }} />
        )}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-3 border border-[rgba(13,13,13,0.08)] shadow-lg"
          style={{ backgroundColor: "#FAF8F4", minWidth: 220, zIndex: 40 }}
        >
          <p
            className="uppercase px-4 pt-4 pb-2"
            style={{ fontSize: 9, letterSpacing: "0.28em", color: "rgba(13,13,13,0.45)" }}
          >
            Trier par
          </p>
          <ul className="pb-2">
            {SORT_LABELS.map(({ key, label }) => {
              const active = sort === key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => {
                      onChange(key);
                      setOpen(false);
                    }}
                    className="w-full text-left uppercase px-4 py-2.5 transition-colors"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      color: active ? "#0D0D0D" : "rgba(13,13,13,0.65)",
                      backgroundColor: active ? "rgba(13,13,13,0.04)" : "transparent",
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = "rgba(13,13,13,0.03)"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortFilterMenu;

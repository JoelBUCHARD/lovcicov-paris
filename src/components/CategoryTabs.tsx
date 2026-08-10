import { useEffect, useRef } from "react";

export type CategoryTab<K extends string = string> = { key: K; label: string };

type Props<K extends string> = {
  ariaLabel: string;
  tabs: readonly CategoryTab<K>[];
  active: K;
  onChange: (key: K) => void;
};

/**
 * Barre d'onglets de catégories partagée par les pages univers
 * (PowerLov, MysticLov, StoneLov, LovBag).
 * Desktop : centrée, inchangée. Mobile : une seule ligne scrollable, sans troncature.
 */
function CategoryTabs<K extends string>({ ariaLabel, tabs, active, onChange }: Props<K>) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const firstRun = useRef(true);

  // On ne déplace QUE la barre horizontalement, jamais la page :
  // scrollIntoView ferait défiler le document à l'arrivée sur la page.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const list = listRef.current;
    const container = list?.parentElement;
    const el = list?.querySelector<HTMLElement>('[data-active="true"]');
    if (!list || !container || !el) return;
    const target = el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
    container.scrollTo({ left: Math.max(target, 0), behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={ariaLabel} className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .cat-tab { font-size: 9px; letter-spacing: 0.14em; }
        @media (min-width: 768px) {
          .cat-tab { font-size: 10px; letter-spacing: 0.24em; }
        }
      `}</style>
      <ul
        ref={listRef}
        className="flex items-center justify-start md:justify-center gap-4 md:gap-9 whitespace-nowrap flex-nowrap"
      >
        {tabs.map(({ key, label }) => {
          const isActive = key === active;
          return (
            <li key={key} className="shrink-0">
              <button
                type="button"
                data-active={isActive}
                onClick={() => onChange(key)}
                className="cat-tab uppercase transition-colors duration-200 min-h-[44px] flex items-center px-0"
                style={{
                  color: isActive ? "#0D0D0D" : "rgba(13,13,13,0.5)",
                  borderBottom: isActive ? "1px solid #0D0D0D" : "1px solid transparent",
                  paddingBottom: 4,
                }}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CategoryTabs;

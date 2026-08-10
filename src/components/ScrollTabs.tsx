import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type ScrollTab<K extends string = string> = {
  key: K;
  label: string;
  accent?: string;
};

type Props<K extends string> = {
  ariaLabel: string;
  tabs: readonly ScrollTab<K>[];
  active: K;
  onChange: (key: K) => void;
};

/**
 * Barre d'onglets : une seule ligne défilante sur mobile (snap doux, barre masquée,
 * fondus latéraux indiquant la suite), centrée et statique sur ordinateur.
 */
function ScrollTabs<K extends string>({ ariaLabel, tabs, active, onChange }: Props<K>) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const updateFades = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setFadeLeft(el.scrollLeft > 2);
    setFadeRight(max > 2 && el.scrollLeft < max - 2);
  }, []);

  const centerActive = useCallback((behavior: ScrollBehavior) => {
    const el = scrollerRef.current;
    const target = el?.querySelector<HTMLElement>('[data-active="true"]');
    if (!el || !target) return;
    const left = target.offsetLeft - el.clientWidth / 2 + target.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, left), behavior });
  }, []);

  // Position initiale : onglet actif visible, sans jamais bouger la page.
  useLayoutEffect(() => {
    centerActive("auto");
    updateFades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    centerActive("smooth");
  }, [active, centerActive]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateFades();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateFades]);

  return (
    <div className="relative flex-1 min-w-0">
      <div
        ref={scrollerRef}
        role="tablist"
        aria-label={ariaLabel}
        className="no-scrollbar flex items-center gap-x-8 md:gap-x-9 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-start [scroll-snap-type:x_proximity] [overscroll-behavior-x:contain] [-webkit-overflow-scrolling:touch] touch-pan-x md:touch-auto"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          const accent = tab.accent ?? "#0D0D0D";
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-active={isActive}
              onClick={() => onChange(tab.key)}
              className="cat-tab uppercase whitespace-nowrap shrink-0 transition-colors duration-200 min-h-[44px] flex items-center px-0 [scroll-snap-align:center] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
              style={{
                color: isActive ? accent : "rgba(13,13,13,0.5)",
                borderBottom: isActive ? `1px solid ${accent}` : "1px solid transparent",
                paddingBottom: 4,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-6 md:hidden transition-opacity duration-200"
        style={{
          opacity: fadeLeft ? 1 : 0,
          background: "linear-gradient(to right, #FAF7F2, rgba(250,247,242,0))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-6 md:hidden transition-opacity duration-200"
        style={{
          opacity: fadeRight ? 1 : 0,
          background: "linear-gradient(to left, #FAF7F2, rgba(250,247,242,0))",
        }}
      />
    </div>
  );
}

export default ScrollTabs;

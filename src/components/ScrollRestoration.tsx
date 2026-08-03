import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Restauration de scroll au niveau du routeur.
 * - Mémorise la position de scroll par entrée d'historique (location.key).
 * - Navigation POP (retour/avance navigateur) → restaure la position exacte,
 *   en réessayant tant que la page n'a pas la hauteur nécessaire (images en cours de chargement).
 * - Navigation PUSH/REPLACE (nouvelle page) → ouvre en haut.
 */
const STORAGE_KEY = "scroll-positions:v1";

const readPositions = (): Record<string, number> => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const writePosition = (key: string, y: number) => {
  try {
    const positions = readPositions();
    positions[key] = y;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    /* noop */
  }
};

const ScrollRestoration = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const currentKey = useRef(location.key);

  // Le navigateur ne doit pas tenter sa propre restauration (elle entre en conflit).
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Sauvegarde continue de la position de l'entrée d'historique courante.
  useEffect(() => {
    let raf = 0;
    const save = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => writePosition(currentKey.current, window.scrollY));
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
    };
  }, []);

  useLayoutEffect(() => {
    const previousKey = currentKey.current;
    if (previousKey !== location.key) {
      writePosition(previousKey, window.scrollY);
      currentKey.current = location.key;
    }

    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
      return;
    }

    const target = readPositions()[location.key];
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }

    let cancelled = false;
    const start = performance.now();

    const tryRestore = () => {
      if (cancelled) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.min(target, Math.max(maxScroll, 0)));
      // On réessaie tant que la grille/les images n'ont pas fini de s'étendre.
      if (maxScroll < target && performance.now() - start < 2000) {
        requestAnimationFrame(tryRestore);
      }
    };

    tryRestore();

    // Filet de sécurité : quelques passes après le chargement des images.
    const timers = [80, 250, 600, 1200].map((delay) =>
      window.setTimeout(() => {
        if (!cancelled && Math.abs(window.scrollY - target) > 2) tryRestore();
      }, delay)
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [location.key, navigationType]);

  return null;
};

export default ScrollRestoration;

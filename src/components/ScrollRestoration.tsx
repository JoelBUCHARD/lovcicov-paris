import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Restauration de scroll au niveau du routeur.
 * - L'effet ne dépend QUE du chemin de la route : aucun re-rendu (données produit,
 *   réponse Shopify, état de chargement) ne peut repositionner la page.
 * - Navigation POP (retour navigateur) → restaure la position mémorisée, une seule
 *   fois, et abandonne dès que l'utilisateur touche au défilement.
 * - Navigation PUSH/REPLACE → ouvre en haut, instantanément.
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
  currentKey.current = location.key;

  // Le navigateur ne doit pas tenter sa propre restauration (elle entre en conflit).
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Mémorisation passive de la position, throttlée par frame : aucun recalcul de position.
  useEffect(() => {
    let frame = 0;
    const save = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        writePosition(currentKey.current, window.scrollY);
      });
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
    };
  }, []);

  useLayoutEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
      return;
    }

    const target = readPositions()[location.key];
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }

    // Une seule tentative différée : si la page est déjà assez haute on y va tout de
    // suite, sinon on attend une frame. Dès que l'utilisateur défile, on abandonne.
    let cancelled = false;
    const abort = () => {
      cancelled = true;
    };
    window.addEventListener("wheel", abort, { passive: true, once: true });
    window.addEventListener("touchstart", abort, { passive: true, once: true });
    window.addEventListener("keydown", abort, { once: true });

    const restore = () => {
      if (cancelled) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.min(target, Math.max(maxScroll, 0)));
    };

    restore();
    const frame = requestAnimationFrame(restore);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", abort);
      window.removeEventListener("touchstart", abort);
      window.removeEventListener("keydown", abort);
    };
    // Dépend uniquement de la route (et du type de navigation), jamais des données.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
};

export default ScrollRestoration;

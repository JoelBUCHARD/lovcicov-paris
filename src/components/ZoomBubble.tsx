import { useRef, useState, MouseEvent } from 'react';
import { ZoomIn } from 'lucide-react';

interface Props {
  src: string;
  alt: string;
  onOpenLightbox?: () => void;
}

const LENS_SIZE = 220;
const ZOOM = 2.4;

const ZoomBubble = ({ src, alt, onOpenLightbox }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [imgBox, setImgBox] = useState({ left: 0, top: 0, width: 0, height: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;
    const cRect = container.getBoundingClientRect();
    const iRect = img.getBoundingClientRect();
    const x = e.clientX - cRect.left;
    const y = e.clientY - cRect.top;
    // Only show when hovering the actual rendered image area (object-contain leaves letterboxing)
    const inside =
      e.clientX >= iRect.left &&
      e.clientX <= iRect.right &&
      e.clientY >= iRect.top &&
      e.clientY <= iRect.bottom;
    setHover(inside);
    setPos({ x, y });
    setImgBox({
      left: iRect.left - cRect.left,
      top: iRect.top - cRect.top,
      width: iRect.width,
      height: iRect.height,
    });
  };

  // Background position: shift so the point under cursor is centered in the lens.
  const relX = pos.x - imgBox.left;
  const relY = pos.y - imgBox.top;
  const bgW = imgBox.width * ZOOM;
  const bgH = imgBox.height * ZOOM;
  const bgX = -(relX * ZOOM - LENS_SIZE / 2);
  const bgY = -(relY * ZOOM - LENS_SIZE / 2);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMove}
      onClick={onOpenLightbox}
      className="relative flex-1 aspect-[3/4] overflow-hidden bg-white group md:min-h-[640px] cursor-crosshair"
      role="button"
      aria-label="Survolez pour zoomer, cliquez pour agrandir"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover md:object-contain"
        style={{ objectPosition: 'center center' }}
        loading="eager"
        draggable={false}
      />
      {hover && (
        <div
          className="pointer-events-none absolute rounded-full hidden md:block"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: pos.x - LENS_SIZE / 2,
            top: pos.y - LENS_SIZE / 2,
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${bgW}px ${bgH}px`,
            backgroundPosition: `${bgX}px ${bgY}px`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.9) inset',
            border: '2px solid rgba(255,255,255,0.9)',
            backgroundColor: '#fff',
          }}
        />
      )}
      <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm p-2 rounded-full pointer-events-none">
        <ZoomIn size={14} strokeWidth={1.2} className="text-[#1A1A1A]" />
      </span>
    </div>
  );
};

export default ZoomBubble;

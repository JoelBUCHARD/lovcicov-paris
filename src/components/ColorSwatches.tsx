import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/products';

const COLOR_HEX: Record<string, string> = {
  noir: '#1A1A1A',
  'natural raw': '#ECE2CE',
  natural: '#ECE2CE',
  ecru: '#DDD3C0',
  'écru': '#DDD3C0',
  blanc: '#F5F2EB',
  white: '#FFFFFF',
  'green bottle': '#2A6670',
  vert: '#2A6670',
  rose: '#F4C9C9',
  pink: '#F4C9C9',
  camel: '#B47B4A',
  'crème': '#E8DCC8',
  creme: '#E8DCC8',
  cognac: '#8B4A2E',
  rouge: '#A02828',
  chocolat: '#3F2818',
};

const getHex = (name: string) => COLOR_HEX[name.toLowerCase()] ?? '#CCCCCC';

interface Props {
  product: Product;
}

const ColorSwatches = ({ product }: Props) => {
  const navigate = useNavigate();
  if (!product.colors || product.colors.length <= 1) return null;

  const current = product.colors.find((c) => c.id === product.id);
  const currentName = current?.name ?? product.colors[0].name;

  return (
    <div className="mb-6">
      <p
        className="uppercase mb-3"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '9px',
          color: '#B4A99A',
          letterSpacing: '0.15em',
        }}
      >
        COLORIS
      </p>
      <div className="flex items-center gap-2">
        {product.colors.map((color) => {
          const isActive = color.id === product.id;
          const hex = getHex(color.name);
          return (
            <button
              key={color.id}
              onClick={() => navigate(`/shop/${color.id}`)}
              aria-label={color.name}
              title={color.name}
              className="rounded-full transition-transform duration-200 hover:scale-105 cursor-pointer w-[28px] h-[28px] md:w-[28px] [@media(max-width:768px)]:w-[32px] [@media(max-width:768px)]:h-[32px]"
              style={{
                backgroundColor: hex,
                border: `1.5px solid ${isActive ? '#1A1A1A' : 'transparent'}`,
                boxShadow: hex.toUpperCase() === '#FFFFFF' || hex === '#F5F2EB' ? 'inset 0 0 0 1px #E8E4DD' : undefined,
              }}
            />
          );
        })}
      </div>
      <p
        className="mt-2 uppercase"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: '#5F5E5A',
          letterSpacing: '0.1em',
        }}
      >
        {currentName}
      </p>
    </div>
  );
};

export default ColorSwatches;

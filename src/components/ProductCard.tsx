import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

// Dynamic image imports — supports both jpg and webp
const imageModulesJpg = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModules = { ...imageModulesJpg, ...imageModulesWebp };

const getImage = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/shop/${product.id}`} className="group block">
        <div className="aspect-[3/4] overflow-hidden bg-secondary mb-4 relative">
          <img
            src={getImage(product.image)}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-brand text-[10px] px-3 py-1">
              {product.badge}
            </span>
          )}
          {product.collection === 'mystic' && (
            <span className="absolute bottom-3 right-3 text-brand text-[10px] text-muted-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1">
              Mystic Lov
            </span>
          )}
          {product.collection === 'bijoux' && (
            <span className="absolute bottom-3 right-3 text-brand text-[10px] text-muted-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1">
              Bijoux
            </span>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-sans font-medium">{product.name}</h3>
          <p className="text-xs text-muted-foreground">{product.description}</p>
          <p className="text-sm mt-2">€{product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

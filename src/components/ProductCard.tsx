import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

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
  const mainImage = getImage(product.image);
  const hoverImage = product.gallery?.[0] ? getImage(product.gallery[0]) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link to={`/shop/${product.id}`} className="group block">
        <div className="aspect-[3/4] overflow-hidden bg-secondary mb-4 relative">
          <img
            src={mainImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform duration-700'
            }`}
            loading="lazy"
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${product.name} — vue alternative`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
            />
          )}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-brand text-[10px] px-3 py-1">
              {product.badge}
            </span>
          )}
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-xs font-sans font-medium tracking-wide uppercase">{product.name}</h3>
          <p className="text-sm text-muted-foreground">€{product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

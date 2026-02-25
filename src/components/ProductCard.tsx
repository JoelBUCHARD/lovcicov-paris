import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

// Dynamic image imports
const imageModules = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

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
        <div className="aspect-[3/4] overflow-hidden bg-secondary mb-4">
          <img
            src={getImage(product.image)}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-sans font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-sm mt-2">€{product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

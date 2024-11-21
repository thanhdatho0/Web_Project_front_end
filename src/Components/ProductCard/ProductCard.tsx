import { Link } from "react-router-dom";
import { Product } from "../../Interface";
import ColorCard from "../ContentComponents/ColorCard/ColorCard";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }: Props) => {
  const firstImageUrl = product.colors[0]?.images[0]?.url;
  const firstImageAlt = product.colors[0]?.images[0]?.alt;

  return (
    <Link to={`/product/${product.navigate}`}>
      <div className="group relative">
        {/* <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"> */}
        <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-120">
          <img
            src={firstImageUrl}
            alt={firstImageAlt}
            className="w-full object-cover"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
        <ColorCard id={product.productId} />
      </div>
    </Link>
  );
};

export default ProductCard;

import { Product } from "../../../Interface";
import ColorCard from "../ColorCard/ColorCard";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const Card: React.FC<Props> = ({ product }: Props) => {
  const firstImageUrl = product.colors[0]?.images[0]?.url;
  const firstImageAlt = product.colors[0]?.images[0]?.alt;

  return (
    <Link to={`/product/${product.navigate}`}>
      <div className="relative overflow-hidden">
        <img
          alt={firstImageAlt}
          className="w-full object-cover"
          src={firstImageUrl}
        />
      </div>
      <div className="pt-2 text-sm">
        <div>{product.name}</div>
        <div className="pt-2 text-base font-semibold tracking-wider">
          {product.price.toLocaleString("vi-VN")} đ
        </div>
      </div>
      <ColorCard id={product.productId} />
    </Link>
  );
};
export default Card;

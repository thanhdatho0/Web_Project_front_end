import ColorCard from "../ColorCard/ColorCard";
import { Link } from "react-router-dom";

interface Product {
  productId: number;
  name: string;
  price: number;
  navigate: string;
}
interface Props {
  product: Product;
}

const Card: React.FC<Props> = ({ product }: Props) => {
  return (
    <Link to={`/product/${product.navigate}`}>
      <div className="relative overflow-hidden">
        <img
          alt=""
          className="w-full object-cover"
          src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/smm4073-den-5-c0028085-1e0a-4909-8a9a-254b104651d7.jpg"
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

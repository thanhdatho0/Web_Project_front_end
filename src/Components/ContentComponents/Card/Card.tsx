import { useState } from "react";
import { Image, Product } from "../../../Interface";
import ColorCard from "../ColorCard/ColorCard";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const Card: React.FC<Props> = ({ product }: Props) => {
  const [currentImage, setCurrentImage] = useState<Image>(
    product.colors[0]?.images[0] || { url: "", alt: "" }
  );
  const handleHoverColor = (colorId: number) => {
    const selectColor = product.colors.find((c) => c.colorId == colorId);
    if (selectColor && selectColor.images.length > 0)
      setCurrentImage(selectColor.images[0]);
  };

  return (
    <Link to={`/product/${product.navigate}`}>
      <div className="relative overflow-hidden">
        <img
          alt={currentImage.alt}
          className="w-full object-cover"
          src={currentImage.url}
        />
      </div>
      <div className="pt-2 text-sm">
        <div>{product.name}</div>
        <div className="pt-2 text-base font-semibold tracking-wider">
          {product.price.toLocaleString("vi-VN")} đ
        </div>
      </div>
      <ColorCard
        id={product.productId}
        colors={product.colors}
        onHover={handleHoverColor}
      />
    </Link>
  );
};
export default Card;

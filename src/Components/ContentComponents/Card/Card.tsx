import { useState } from "react";
import { Image, Product } from "../../../Interface";
import ColorCard from "../ColorCard/ColorCard";
import { useNavigate } from "react-router-dom";

const slugify = (text: string) => {
  const from =
    "áàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ";
  const to =
    "aaaaaaaaaaaaaaaaaaooooooooooooooooeeeeeeeeeeeuuuuuuuuuuuuiiiiiyyyyyd";

  let slug = text
    .split("")
    .map((char) => {
      const i = from.indexOf(char.toLowerCase());
      return i !== -1 ? to[i] : char;
    })
    .join("");

  slug = slug.toLowerCase();

  slug = slug.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  return slug.replace(/^-+|-+$/g, "");
};

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

  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${slugify(product.name)}`, {
      state: { product },
    });
  };

  return (
    <div onClick={handleProductClick} className="relative overflow-hidden">
      <img
        alt={currentImage.alt}
        className="w-full object-cover"
        src={currentImage.url}
      />
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
    </div>
  );
};
export default Card;

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
    <div
      onClick={handleProductClick}
      className="relative overflow-hidden cursor-pointer"
    >
      <div className="relative">
        <img
          alt={currentImage.alt}
          className="w-full object-cover"
          src={currentImage.url}
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full">
            -{product.discountPercentage * 100}%
          </span>
        )}
      </div>
      <div className="pt-2 pl-2 text-base">
        <div>{product.name}</div>
        <div className="flex">
          <div className="pt-2 text-base font-semibold tracking-wider text-red-600">
            {(product.price * (1 - product.discountPercentage)).toLocaleString(
              "vi-VN"
            )}{" "}
            đ
          </div>
          {product.discountPercentage > 0 && (
            <div className="pt-3 pl-3 text-sm font-semibold tracking-wider text-gray-400 line-through">
              {product.price.toLocaleString("vi-VN")} đ
            </div>
          )}
        </div>
      </div>
      <ColorCard colors={product.colors} onHover={handleHoverColor} />
    </div>
  );
};
export default Card;

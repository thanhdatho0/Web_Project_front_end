import { useEffect, useState } from "react";
import { Size } from "../../../Interface";

type Props = {
  sizes: Size[];
  onSizeSelect: (sizeId: number, sizeName: string) => void; // Hàm callback để thông báo kích thước đã chọn
};

const SizeCard = ({ sizes, onSizeSelect }: Props) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    if (sizes.length > 0 && selectedSize === null) {
      setSelectedSize(sizes[0].sizeId); // Chọn kích thước đầu tiên
      onSizeSelect(sizes[0].sizeId, sizes[0].sizeValue); // Gọi callback với kích thước đầu tiên
    }
  }, [sizes, selectedSize, onSizeSelect]);

  const handleSelectSize = (sizeId: number, sizeValue: string) => {
    setSelectedSize(sizeId); // Cập nhật kích thước đã chọn
    onSizeSelect(sizeId, sizeValue);
  };

  return (
    <div className="flex gap-4 mt-2 mb-2">
      {sizes.map((size, index) => (
        <button
          key={index}
          className={`px-4 py-2 border border-gray-400 rounded ${
            selectedSize === size.sizeId
              ? "bg-gray-900 text-white"
              : "hover:bg-gray-200"
          }`}
          onClick={() => handleSelectSize(size.sizeId, size.sizeValue)} // Chọn kích thước
        >
          {size.sizeValue}
        </button>
      ))}
    </div>
  );
};

export default SizeCard;

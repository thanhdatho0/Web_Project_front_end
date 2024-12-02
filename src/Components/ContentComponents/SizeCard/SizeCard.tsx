import { useEffect, useState } from "react";
import { Size } from "../../../Interface";
import { getSizeList } from "../../../api";

type Props = {
  onSizeSelect: (sizeId: number, sizeName: string) => void; // Hàm callback để thông báo kích thước đã chọn
};

const SizeCard = ({ onSizeSelect }: Props) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    const fetchSizes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getSizeList();

        if (typeof response === "string") {
          setError(response);
        } else {
          setSizes(response);
        }
      } catch (e) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false); // Kết thúc tải
      }
    };
    fetchSizes();
  }, []);

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
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && sizes.length === 0 && <p>No sizes found.</p>}
      {sizes.map((size) => (
        <button
          key={size.sizeId}
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

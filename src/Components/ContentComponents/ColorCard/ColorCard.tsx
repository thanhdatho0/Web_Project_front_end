import { useEffect, useState } from "react";
import { Color } from "../../../Interface";
import { ColorList } from "../../../api";

interface Props {
  id: number;
}

const ColorCard = ({ id }: Props) => {
  const [colors, setColors] = useState<Color[]>([]); // Lưu trữ dữ liệu màu
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await ColorList(id);
        if (typeof response === "string") {
          setError(response);
        } else {
          setColors(response.colors);
        }
      } catch (e) {
        console.error("Error fetching data:", error);
      }
    };
    fetchColor();
  }, []);

  return (
    <div className="flex items-center gap-2 pt-2">
      {colors.map((color, index) => (
        <div
          key={index} // Đặt key cho từng phần tử trong danh sách
          style={{ backgroundColor: color.hexaCode }} // Truyền mã màu vào style
          className="inline-block cursor-pointer rounded-full border-2 hover:border-black sm:h-2 sm:w-4 md:h-4 md:w-4 lg:h-6 lg:w-6"
        ></div>
      ))}
    </div>
  );
};

export default ColorCard;

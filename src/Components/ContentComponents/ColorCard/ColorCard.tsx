import { useEffect, useState } from "react";

const ColorCard = () => {
  const URL = "http://localhost:5254/api/products/1";
  const [colors, setColors] = useState([]); // Lưu trữ dữ liệu màu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(URL);
        const data = await result.json();
        setColors(data.colors); // Lưu mảng `colors` từ API vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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

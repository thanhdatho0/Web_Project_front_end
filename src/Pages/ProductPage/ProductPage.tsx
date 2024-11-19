import { useState } from "react";
import Breadcrumbs from "../../Components/ContentComponents/Breadcrumb/Breadcrumbs";
import ColorCard from "../../Components/ContentComponents/ColorCard/ColorCard";

const ProductPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [cateloryLocation, setCateloryLocation] = useState("");

  const handleAddCategoryName = (categoryName: string) => {
    setCategoryName(categoryName);
  };

  const handleAddCategoryLocation = (category: string) => {
    setCateloryLocation(category);
  };

  const data = [
    {
      imgelink:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },
  ];
  const [active, setActive] = useState(
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  );

  return (
    <div className="lg:w-[85%] mx-auto">
      <div className="pb-2 mt-16 "></div>
      <Breadcrumbs
        onAddCategoryName={handleAddCategoryName}
        onAddCategoryLocation={handleAddCategoryLocation}
      />

      <div className="flex gap-4 mb-60 px-[54px]">
        <div className="flex-none w-20 space-y-4">
          {data.map(({ imgelink }, index) => (
            <div key={index}>
              <img
                onClick={() => setActive(imgelink)}
                src={imgelink}
                className=" cursor-pointer rounded-lg object-cover object-center"
                alt="gallery-image"
              />
            </div>
          ))}
        </div>
        <div className="flex-1">
          <img
            className=" w-[428px] h-[580px] rounded-lg object-cover object-center "
            src={active}
            alt=""
          />
        </div>
        <div className="flex-1">
          <span>{cateloryLocation}</span>
          <br />
          <span>MãSP - Màu - Size</span>
          <br />
          <span>Giá bán</span>
          <ColorCard />
          <span>Kích thước</span>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;

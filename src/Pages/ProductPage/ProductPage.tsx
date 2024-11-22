import { useEffect, useState } from "react";
import Breadcrumbs from "../../Components/ContentComponents/Breadcrumb/Breadcrumbs";
import aoNamItems from "../../JsonData/AoNamItems.json";
import { useCart } from "../../Components/NavBar/NavBarCart/CartContext";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryLocation, setCategoryLocation] = useState("");
  const [count, setCount] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<
    { id: number; name: string; price: number; navigate: string }[]
  >([]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(count);
  };

  const handleAddCategoryName = (categoryName: string) => {
    setCategoryName(categoryName);
  };

  const handleAddCategoryLocation = (category: string) => {
    setCategoryLocation(category);
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

  useEffect(() => {
    const matchedCategory = aoNamItems.find(
      (category) => category.navigate === categoryLocation
    );

    if (matchedCategory && Array.isArray(matchedCategory.products)) {
      setFilteredProducts(matchedCategory.products);
    } else {
      setFilteredProducts([]);
    }
  }, [categoryLocation]);
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
          <span>{categoryLocation}</span>
          <br />
          <span>MãSP - Màu - Size</span>
          <br />
          <span>Giá bán</span>
          <br />
          <span>Màu sắc </span>
          {/*   */}
          <span>Kích thước</span>
          <br />
          <span>Số lượng:</span>
          <br />
          <div className="flex items-center  ">
            <button
              onClick={() => setCount((c) => c - 1)}
              disabled={count === 1}
              className={`w-10 h-10 justify-center rounded font-semibold transition  border border-black 
              ${
                count === 1
                  ? " text-gray-400 cursor-not-allowed"
                  : " text-gray-800 hover:bg-gray-200"
              }`}
            >
              -
            </button>
            <input
              type="text"
              value={count}
              readOnly
              className="w-16 h-10 text-center bg-gray-100  rounded font-medium text-gray-800 mx-3"
            />
            <button
              onClick={() => setCount((c) => c + 1)}
              className="w-10 h-10 justify-center rounded border border-black text-gray-800 font-semibold hover:bg-gray-200 transition"
            >
              +
            </button>

            <button
              onClick={handleAddToCart}
              className="w-80 h-10 justify-center rounded border border-black text-gray-800 font-semibold hover:bg-gray-200 transition ml-16"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <Link to="/Cart">
            <button className="w-[552px] h-10 justify-center rounded bg-yellow-500 text-gray-800 font-semibold hover:bg-yellow-400 transition mt-6">
              Mua ngay
            </button>
          </Link>

          <div className=" bg-gray-200 h-24 flex items-center justify-center mt-6">
            <div className="flex space-x-4">
              <img
                src="https://yody.vn/icons/zalopay.png"
                alt="ZaloPay"
                className="h-8"
              />
              <img
                src="https://yody.vn/icons/visa-card.png"
                alt="VISA"
                className="h-8"
              />
              <img
                src="https://yody.vn/icons/master-card.png"
                alt="MasterCard"
                className="h-8"
              />
              <img
                src="https://yody.vn/icons/vnpay-qr.png"
                alt="VNPAYQR"
                className="h-8"
              />
              <img
                src="https://yody.vn/icons/momo.png"
                alt="momo"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;

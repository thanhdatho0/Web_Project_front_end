import { useEffect, useState } from "react";
import { Image, ProductCart } from "../../Interface";
import Breadcrumbs from "../../Components/ContentComponents/Breadcrumb/Breadcrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ColorCard from "../../Components/ContentComponents/ColorCard/ColorCard";
import ShippingInfo from "../../Components/ContentComponents/ShippingInfo/ShippingInfo";
import PaymentMethods from "../../Components/ContentComponents/PaymentMethods/PaymentMethods";

const ProductPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [count, setCount] = useState(1);
  const [copySuccess, setCopySuccess] = useState("");
  const location = useLocation();
  const product = location.state?.product;
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    console.log("cartCount = " + cartCount);
  }, [cartCount]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount, 10));
    }
  }, []);

  if (!product) {
    return (
      <div className="lg:w-[85%] mx-auto">
        <div className="text-center mt-16">
          <p className="text-red-500">Sản phẩm không tồn tại hoặc có lỗi!</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const defaultImages: Image[] = [];
  const defaultColorId = "";
  const defaultSizeValue = "";
  const defaultActiveUrl = "";

  const [images, setImages] = useState<Image[]>(
    product.colors?.[0]?.images || defaultImages
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.sizeId || defaultSizeValue
  );
  const [selectedSizeName, setSelectedSizeName] = useState(
    product.sizes?.[0]?.sizeValue || defaultSizeValue
  );
  const [colorId, setColorId] = useState(
    product.colors?.[0]?.colorId || defaultColorId
  );
  const [colorName, setColorName] = useState(
    product.colors?.[0]?.name || defaultColorId
  );
  const [active, setActive] = useState(
    product.colors?.[0]?.images?.[0]?.url || defaultActiveUrl
  );

  const handleCopy = () => {
    const orderCode = `${product.productId}-${colorId}-${selectedSize}`;
    navigator.clipboard
      .writeText(orderCode)
      .then(() => {
        setCopySuccess("Sao chép thành công!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(() => {
        setCopySuccess("Không thể sao chép!");
      });
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
  };
  const handleSelectSizeName = (size: string) => {
    setSelectedSizeName(size);
  };

  const handleAddCategoryName = (categoryName: string) => {
    setCategoryName(categoryName);
  };

  console.log(categoryName);

  const handleHoverColor = (colorId: number) => {
    setColorId(colorId);
    const selectedColor = product.colors.find((c) => c.colorId === colorId);
    setColorName(selectedColor.name);
    if (selectedColor) {
      setImages(selectedColor.images);
      setActive(selectedColor.images[0]?.url || "");
    }
  };

  const navigate = useNavigate();

  const handleAddToCart = () => {
    const selectedColor = product.colors.find((c) => c.colorId === colorId);
    const selectedSizeObj = product.sizes.find(
      (c) => c.sizeId === selectedSize
    );
    const newItem: ProductCart = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      color: selectedColor?.name || "",
      imgUrl: selectedColor?.images[0]?.url || "",
      imgAlt: selectedColor?.images[0]?.alt || "",
      size: selectedSizeObj?.sizeValue || "",
      quantity: count,
    };
    const updatedCartItems = [...cartItems, newItem];

    setCartItems(updatedCartItems);
    setCartCount((prevCount) => {
      const newCount = prevCount + count;
      localStorage.setItem("cartCount", newCount.toString());
      return newCount;
    });

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  const handleProductClick = () => {
    const currentCartCount = parseInt(
      localStorage.getItem("cartCount") || "0",
      10
    );
    const newCount = currentCartCount + 1;

    localStorage.setItem("cartCount", newCount.toString());
    setCartCount(newCount);

    const selectedColor = product.colors.find((c) => c.colorId === colorId);
    const selectedSizeObj = product.sizes.find(
      (s) => s.sizeId === selectedSize
    );

    const newItem: ProductCart = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      color: selectedColor?.name || "",
      imgUrl: selectedColor?.images[0]?.url || "",
      imgAlt: selectedColor?.images[0]?.alt || "",
      size: selectedSizeObj?.sizeValue || "",
      quantity: count,
    };

    const updatedCartItems = [...cartItems, newItem];

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    navigate("/cart");
    window.location.reload();
  };

  // cái này để test
  const handleClearCart = () => {
    localStorage.removeItem("cartItems"); // Xóa giỏ hàng
    setCartItems([]); // Cập nhật lại trạng thái giỏ hàng trong component
    setCartCount(0);

    setCartCount(() => {
      const newCount = 0; // Đặt lại giá trị cart count thành 0
      localStorage.setItem("cartCount", newCount.toString());
      return newCount;
    });
    window.location.reload();
  };

  return (
    <div className="lg:w-[85%] mx-auto">
      <div className="pb-2 mt-16 "></div>
      <Breadcrumbs
        onAddSubcategoryName={handleAddCategoryName}
        subcategoryId={product.categoryId}
      />

      <div className="flex gap-4 px-[54px]">
        <div className="flex-none w-20 space-y-4">
          {images.map(({ url }, index) => (
            <div key={index}>
              <img
                onClick={() => setActive(url)}
                src={url}
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
          <span>{product.name}</span>
          <br />
          <button onClick={handleCopy} className="flex items-center">
            <span className="pr-2">
              {product.productId}-{colorId}-{selectedSize}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
              />
            </svg>
          </button>
          {copySuccess && (
            <div className="mt-2 text-green-600">{copySuccess}</div>
          )}
          <span>
            Giá bán:{" "}
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          <br />
          <span>Màu sắc: {colorName} </span>
          <ColorCard
            id={product.productId}
            colors={product.colors}
            onHover={handleHoverColor}
          />
          <span>Kích thước: {selectedSizeName}</span>
          <div className="flex gap-4 mt-2 mb-2">
            {product.sizes.map((size) => (
              <button
                key={size.sizeId}
                className={`px-4 py-2 border border-gray-400 rounded ${
                  selectedSize === size.sizeId
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  handleSelectSize(size.sizeId);
                  handleSelectSizeName(size.sizeValue);
                }}
              >
                {size.sizeValue}
              </button>
            ))}
          </div>
          <span>Số lượng:</span>
          <br />
          <div className="flex items-center mt-2 ">
            <button
              onClick={() => setCount((c) => c - 1)}
              disabled={count <= 1}
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
          <button
            className="w-[552px] h-10 justify-center rounded bg-yellow-500 text-gray-800 font-semibold hover:bg-yellow-400 transition mt-6"
            onClick={() => {
              handleProductClick();
            }}
          >
            Mua ngay
          </button>

          <button onClick={handleClearCart}>
            Clear Cart(cái này dùng để test)
          </button>
          <PaymentMethods />
          <ShippingInfo />
        </div>
      </div>
    </div>
  );
};
export default ProductPage;

import { useEffect, useState } from "react";
import { Color, ProductCart, Size } from "../../../Interface";
import { getProductById } from "../../../api";
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
  cartItems: ProductCart[];
  onRemoveItem: (
    productId: number,
    color: string,
    size: string,
    count: number
  ) => void;
  onUpdateQuantity: (
    productId: number,
    color: string,
    size: string,
    newQuantity: number
  ) => void;
  onUpdateColor_Size: (
    productId: number,
    oldColor: string,
    oldSize: string,
    newColor: string,
    newSize: string,
    newImgUrl: string,
    newImgAlt: string
  ) => void;
}

const CartItemDetail: React.FC<Props> = ({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onUpdateColor_Size,
}: Props) => {
  const [productOptions, setProductOptions] = useState<{
    [productId: number]: {
      colors: Color[];
      sizes: Size[];
    };
  }>({});

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  useEffect(() => {
    const loadProductDetails = async () => {
      const updatedProductOptions: {
        [productId: number]: { colors: Color[]; sizes: Size[] };
      } = {};

      for (const item of cartItems) {
        const productDetails = await getProductById(item.productId);

        if (typeof productDetails === "string") {
          console.error("Error fetching Product:", productDetails);
          return null;
        }

        if (productDetails) {
          updatedProductOptions[item.productId] = {
            colors: productDetails.colors,
            sizes: productDetails.sizes,
          };
        }
      }

      setProductOptions(updatedProductOptions);
    };
    loadProductDetails();

    const savedCartCount = parseInt(
      localStorage.getItem("cartCount") || "0",
      10
    );
    setCartCount(savedCartCount);
  }, [cartItems]);

  const updateCartCount = (newCount: number) => {
    localStorage.setItem("cartCount", newCount.toString());
    setCartCount(newCount);
  };

  const handleQuantityChange = (item: ProductCart, action: string) => {
    if (action === "increment") {
      onUpdateQuantity(
        item.productId,
        item.color,
        item.size,
        item.quantity + 1
      );
      updateCartCount(cartCount + 1);
      window.location.reload();
    } else if (action === "decrement") {
      if (item.quantity === 1) {
        onRemoveItem(item.productId, item.color, item.size, 1);
      } else
        onUpdateQuantity(
          item.productId,
          item.color,
          item.size,
          item.quantity - 1
        );
      updateCartCount(cartCount - 1);
      window.location.reload();
    }
  };
  const handleSelectOption = (
    item: ProductCart,
    newColor: string,
    newSize: string
  ) => {
    const product = productOptions[item.productId];

    if (product) {
      const selectedColor = product.colors.find(
        (color) => color.name === newColor
      );

      if (selectedColor && selectedColor.images?.[0]) {
        onUpdateColor_Size(
          item.productId,
          item.color,
          item.size,
          newColor,
          newSize,
          selectedColor.images[0].url,
          selectedColor.images[0].alt
        );
      } else {
        console.warn(`Images not found for selected color: ${newColor}`);
        onUpdateColor_Size(
          item.productId,
          item.color,
          item.size,
          newColor,
          newSize,
          "",
          ""
        );
      }
    }
    window.location.reload();
  };

  const navigate = useNavigate();

  const handleProductClick = async (productId: number, name: string) => {
    try {
      const response = await getProductById(productId);

      if (typeof response === "string") {
        console.error("Error fetching Product:", response);
        return;
      }
      navigate(`/product/${slugify(name)}`, {
        state: { product: response }, // Truyền trực tiếp product lấy được
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
      {cartItems.map((item, index) => (
        <div key={index} className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <div
                className="shrink-0 md:order-1"
                onClick={() => handleProductClick(item.productId, item.name)}
              >
                <img
                  className="hidden h-28 w-24 dark:block"
                  src={item.imgUrl}
                  alt={item.imgAlt}
                />
              </div>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button
                    type="button"
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={() => handleQuantityChange(item, "decrement")}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    id="counter-input"
                    data-input-counter
                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                    placeholder=""
                    value={item.quantity}
                    required
                    readOnly
                  />
                  <button
                    type="button"
                    id="increment-button"
                    data-input-counter-increment="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={() => handleQuantityChange(item, "increment")}
                  >
                    +
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {item.price.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <div
                  onClick={() => handleProductClick(item.productId, item.name)}
                  className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                >
                  {item.name}
                </div>

                <div className="flex items-center gap-4 text-sm font-medium text-gray-500  dark:text-gray-400 ">
                  <div>
                    <label htmlFor="color-select" className="mr-2">
                      Color:
                    </label>
                    <select
                      id="color-select"
                      value={item.color}
                      onChange={(e) =>
                        handleSelectOption(item, e.target.value, item.size)
                      }
                      className="dark:bg-gray-800 border "
                    >
                      {productOptions[item.productId]?.colors?.map(
                        (color, idx) => (
                          <option key={idx} value={color.name}>
                            {color.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="color-select" className="mr-2">
                      Size:
                    </label>

                    <select
                      id="size-select"
                      value={item.size}
                      onChange={(e) =>
                        handleSelectOption(item, item.color, e.target.value)
                      }
                      className="dark:bg-gray-800 border"
                    >
                      {productOptions[item.productId]?.sizes?.map(
                        (size, idx) => (
                          <option key={idx} value={size.sizeValue}>
                            {size.sizeValue}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-300 dark:text-red-500"
                    onClick={() => {
                      const newCount = cartCount - item.quantity;

                      updateCartCount(newCount);

                      onRemoveItem(
                        item.productId,
                        item.color,
                        item.size,
                        item.quantity
                      );
                      window.location.reload();
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemDetail;

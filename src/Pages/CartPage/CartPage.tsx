import { useContext, useEffect, useState } from "react";
import CartItemDetail from "../../Components/ContentComponents/CartItemDetail/CartItemDetail";
import { OrderRequest, ProductCart } from "../../Interface";
import { getProductById } from "../../api";
import { UserContext } from "../../Components/ContentComponents/UserContext/UserContext";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [loading, setLoading] = useState(true);
  const { account } = useContext(UserContext); // Access user account details
  const [totalPrice, setTotalPrice] = useState(0);
  const [colors, setColors] = useState<{ colorId: number; name: string }[]>([]);
  const [sizes, setSizes] = useState<{ sizeId: number; sizeValue: string }[]>(
    []
  );
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);
  useEffect(() => {
    const fetchCartItems = async () => {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        try {
          const parsedCartItems: ProductCart[] = JSON.parse(storedCartItems);

          const fetchedItems = await Promise.all(
            parsedCartItems.map(async (item) => {
              const product = await getProductById(item.productId);

              if (typeof product === "string") {
                console.error("Error fetching product:", product);
                setLoading(false);
                return null;
              }

              const updatedColor = product.colors.find(
                (color) => color.name === item.color
              );

              const updatedSize = product.sizes.find(
                (size) => size.sizeValue === item.size
              );

              return {
                ...item,
                price: product.price * (1 - product.discountPercentage),
                imgUrl: updatedColor?.images[0]?.url || item.imgUrl,
                imgAlt: updatedColor?.images[0]?.alt || item.imgAlt,
                color: updatedColor?.name || item.color,
                size: updatedSize?.sizeValue || item.size,
              };
            })
          );

          const mergedCartItems = fetchedItems.reduce(
            (acc: ProductCart[], item) => {
              if (!item) return acc;

              const existingItem = acc.find(
                (cartItem) =>
                  cartItem.productId === item.productId &&
                  cartItem.color === item.color &&
                  cartItem.size === item.size
              );

              if (existingItem) {
                existingItem.quantity = item.quantity + existingItem.quantity;
              } else {
                acc.push(item);
              }

              return acc;
            },
            []
          );
          setCartItems(mergedCartItems);
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCartItems([]);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Example functions for mapping color and size names to IDs
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:5254/api/colors");
        const fetchedColors = response.data.map((color: any) => ({
          colorId: color.colorId,
          name: color.name,
        }));
        setColors(fetchedColors);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, []);

  const getColorId = (colorName: string): number => {
    const color = colors.find((color) => color.name === colorName);
    return color ? color.colorId : 0; // Return 0 if color is not found
  };

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get("http://localhost:5254/api/sizes");
        const fetchedSizes = response.data.map((size: any) => ({
          sizeId: size.sizeId,
          sizeValue: size.sizeValue,
        }));
        setSizes(fetchedSizes);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, []);

  const getSizeId = (sizeValue: string): number => {
    const size = sizes.find((size) => size.sizeValue === sizeValue);
    return size ? size.sizeId : 0; // Return 0 if size is not found
  };

  const handlePlaceOrder = async () => {
    if (!account?.customerId) {
      alert("Please log in to place an order.");
      return;
    }

    // Transform cartItems to match OrderRequest structure
    const orderDetails = cartItems.map((item) => ({
      productId: item.productId,
      colorId: getColorId(item.color), // Map color to its ID
      sizeId: getSizeId(item.size), // Map size to its ID
      quantity: item.quantity,
    }));

    const orderData: OrderRequest = {
      employeeId: null,
      customerId: account.customerId,
      orderNotice: "Order placed via cart page",
      orderDetails,
    };

    try {
      const response = await axios.post(
        "http://localhost:5254/api/Order",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      alert("Order placed successfully!");
      localStorage.removeItem("cartItems"); // Clear the cart
      localStorage.removeItem("cartCount");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  const handleUpdateQuantity = (
    productId: number,
    color: string,
    size: string,
    newQuantity: number
  ) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId && item.color === color && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  const handleUpdateColor_Size = (
    productId: number,
    oldColor: string,
    oldSize: string,
    newColor: string,
    newSize: string,
    newImgUrl: string,
    newImgAlt: string
  ) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId &&
      item.color === oldColor &&
      item.size === oldSize
        ? {
            ...item,
            color: newColor,
            size: newSize,
            imgUrl: newImgUrl,
            imgAlt: newImgAlt,
          }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  const handleRemoveItem = (productId: number, color: string, size: string) => {
    const updatedCartItems = cartItems.filter(
      (item) =>
        !(
          item.productId === productId &&
          item.color === color &&
          item.size === size
        )
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:w-[85%] mx-auto">
      <div className="pb-6 mt-28">
        <section className="bg-white py-8 antialiased dark:bg-gray-800">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Giỏ hàng
            </h2>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    No Product in Cart
                  </h2>
                </div>
              ) : (
                <>
                  <CartItemDetail
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                    onUpdateColor_Size={handleUpdateColor_Size}
                  />
                  <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        Chi tiết đơn hàng
                      </p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                              Tổng giá trị sản phẩm
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                              {totalPrice.toLocaleString("vi-VN")} đ
                            </dd>
                          </dl>

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                              Vận chuyển
                            </dt>
                            <dd className="text-base font-medium dark:text-white">
                              {(20000).toLocaleString("vi-VN")} đ
                            </dd>
                          </dl>

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                              Giảm giá vận chuyển
                            </dt>
                            <dd className="text-base font-medium  text-green-600">
                              - {(20000).toLocaleString("vi-VN")} đ
                            </dd>
                          </dl>
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                          <dt className="text-base font-bold text-gray-900 dark:text-white">
                            Tổng thanh toán
                          </dt>
                          <dd className="text-base font-bold text-gray-900 dark:text-white">
                            {totalPrice.toLocaleString("vi-VN")} đ
                          </dd>
                        </dl>
                      </div>

                      <button
                        onClick={handlePlaceOrder}
                        className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Place Order
                      </button>

                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {" "}
                          hoặc{" "}
                        </span>
                        <a
                          href="#"
                          title=""
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline text-white"
                        >
                          <a href="/" className="text-white">
                            Tiếp tục mua hàng
                          </a>

                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 12H5m14 0-4 4m4-4-4-4"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;

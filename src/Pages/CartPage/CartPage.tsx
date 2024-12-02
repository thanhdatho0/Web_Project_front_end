import CartItemDetail from "../../Components/ContentComponents/CartItemDetail/CartItemDetail";
import CheckoutSummary from "../../Components/ContentComponents/CheckoutSummary/CheckoutSummary";
import { useEffect, useState } from "react";
import { Product, ProductCart } from "../../Interface";
import { getProductById } from "../../api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

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
                price: product.price,
                imgUrl: updatedColor?.images[0]?.url || item.imgUrl,
                imgAlt: updatedColor?.images[0]?.alt || item.imgAlt,
                color: updatedColor?.name || item.color,
                size: updatedSize?.sizeValue || item.size,
                // quantity: 1,
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
                existingItem.quantity += 1;
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
      }
    };

    fetchCartItems();
  }, []);
  const handleUpdateQuantity = (
    productId: number,
    color: string,
    size: string,
    newQuantity: number
  ) => {
    const updateCartItems = cartItems.map((item) =>
      item.productId === productId && item.color === color && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updateCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updateCartItems));
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
    const updateCartItems = cartItems.map((item) =>
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
    setCartItems(updateCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updateCartItems));
  };

  const handleRemoveItem = (
    productId: number,
    color: string,
    size: string,
    count: number
  ) => {
    const currentCartCount = parseInt(
      localStorage.getItem("cartCount") || "0",
      10
    );
    const newCount = currentCartCount - count;
    localStorage.setItem("cartCount", newCount.toString());
    setCartCount(newCount);

    const updateCartItem = cartItems.filter(
      (item) =>
        !(
          item.productId === productId &&
          item.color === color &&
          item.size === size
        )
    );

    setCartItems(updateCartItem);
    localStorage.setItem("cartItems", JSON.stringify(updateCartItem));
    window.location.reload();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:w-[85%] mx-auto">
      <div className="pb-6 mt-28">
        <section className="bg-white py-8 antialiased dark:bg-gray-800 ">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Giỏ hàng
            </h2>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <CartItemDetail
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
                onUpdateColor_Size={handleUpdateColor_Size}
              />
              <CheckoutSummary cartItems={cartItems} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;

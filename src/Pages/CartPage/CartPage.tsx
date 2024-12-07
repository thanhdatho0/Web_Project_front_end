import CartItemDetail from "../../Components/ContentComponents/CartItemDetail/CartItemDetail";
import CheckoutSummary from "../../Components/ContentComponents/CheckoutSummary/CheckoutSummary";
import { useEffect, useState } from "react";
import { ProductCart } from "../../Interface";
import { getProductById } from "../../api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart items from localStorage when the component mounts
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
      } else {
        // If there are no items in localStorage, set cartItems as empty
        setCartItems([]);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []); // Only run once on mount

  // Handle updating the quantity of an item
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
  };

  // Handle updating color and size of an item
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
  };

  // Handle removing an item from the cart
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

    // Update cart count
    const updatedCount = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(updatedCount);
    localStorage.setItem("cartCount", updatedCount.toString());
    window.location.reload();
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
                  <CheckoutSummary cartItems={cartItems} />
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

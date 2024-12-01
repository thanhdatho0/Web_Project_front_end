import CartItemDetail from "../../Components/ContentComponents/CartItemDetail/CartItemDetail";
import CheckoutSummary from "../../Components/ContentComponents/CheckoutSummary/CheckoutSummary";
import { useEffect, useState } from "react";
import { Product, ProductCart } from "../../Interface";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        const parsedCartItems = JSON.parse(storedCartItems);

        if (parsedCartItems.length > 0) {
          try {
            const fetchedItems = await Promise.all(
              parsedCartItems.map(async (item: string) => {
                const [productId, colorId, sizeId] = item.split("-");
                const response = await axios.get<Product>(
                  `http://localhost:5254/api/products/${productId}`
                );

                const products = response.data;

                const selectedColor = products.colors.find(
                  (color) => color.colorId === parseInt(colorId)
                );

                const selectedImgUrl = selectedColor
                  ? selectedColor.images[0].url
                  : "";

                const selectedImgAlt = selectedColor
                  ? selectedColor.images[0].alt
                  : "";

                const selectedSize = products.sizes.find(
                  (size) => size.sizeId === parseInt(sizeId)
                );

                if (!selectedColor || !selectedSize) {
                  return null;
                }

                const productCart: ProductCart = {
                  productId: products.productId,
                  name: products.name,
                  price: products.price,
                  color: selectedColor.name,
                  imgUrl: selectedImgUrl,
                  imgAlt: selectedImgAlt,
                  size: selectedSize.sizeValue,
                  quantity: 1,
                };

                return productCart;
              })
            );

            const allCartItems = fetchedItems.flat();
            setCartItems(allCartItems);
          } catch (error) {
            console.error("Failed to fetch cart items:", error);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = (productId: number) => {
    const updateCartItem = cartItems.filter(
      (item) => item.productId === productId
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
              Shopping Cart
            </h2>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <CartItemDetail
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
              />
              <CheckoutSummary />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;

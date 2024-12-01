import { ProductCart } from "../../../Interface";

interface Props {
  cartItems: ProductCart[];
  onRemoveItem: (productId: number) => void;
}

const CartItemDetail: React.FC<Props> = ({
  cartItems,
  onRemoveItem,
}: Props) => {
  return (
    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
      {cartItems.map((item, index) => (
        <div key={index} className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" className="shrink-0 md:order-1">
                <img
                  className="hidden h-28 w-24 dark:block"
                  src={item.imgUrl}
                  alt={item.imgAlt}
                />
              </a>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button
                    type="button"
                    id="decrement-button"
                    data-input-counter-decrement="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
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
                  >
                    +
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {item.price}
                  </p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a
                  href="#"
                  className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                >
                  {item.name}
                </a>

                <div className="flex items-center gap-4 text-sm font-medium text-gray-500  dark:text-gray-400 ">
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-300 dark:text-red-500"
                    onClick={() => onRemoveItem(item.productId)}
                  >
                    ❌ Remove
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

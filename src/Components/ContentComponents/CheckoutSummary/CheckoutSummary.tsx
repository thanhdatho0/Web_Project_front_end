import React, { useEffect, useState } from "react";
import { ProductCart } from "../../../Interface";
import { Link } from "react-router-dom";

interface Props {
  cartItems: ProductCart[];
}
const CheckoutSummary: React.FC<Props> = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
    setMoney(total + 20000);
    if (total > 200000) setMoney(total);
  }, [cartItems]);

  return (
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
            {totalPrice >= 200000 && (
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Giảm giá vận chuyển
                </dt>
                <dd className="text-base font-medium  text-green-600">
                  -{(20000).toLocaleString("vi-VN")}đ
                </dd>
              </dl>
            )}
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Tổng thanh toán
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              {money.toLocaleString("vi-VN")} đ
            </dd>
          </dl>
        </div>

        <Link
          to="/login"
          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Thanh toán
        </Link>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {" "}
            hoặc{" "}
          </span>
          <div
            // href="#"
            title=""
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline text-white"
          >
            <Link to="/" className="text-white">
              Tiếp tục mua hàng
            </Link>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;

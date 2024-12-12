import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Components/ContentComponents/UserContext/UserContext";

type OrderDetail = {
  productName: string;
  productPrice: number;
  priceAfterDiscount: number;
  size: string;
  color: string;
  quantity: number;
};

type Order = {
  orderId: number;
  employeeName: string;
  customerId: number;
  orderExportDateTime: string;
  orderNotice: string;
  orderDetails: OrderDetail[];
  totalAmount: number;
  total: number;
  confirmed: boolean;
};

const OrderHistoryPage = () => {
  const { account } = useContext(UserContext); // Access customerId from the UserContext
  const [orders, setOrders] = useState<Order[]>([]);
  const [visibleDetails, setVisibleDetails] = useState<Set<number>>(new Set()); // Track visible order details

  useEffect(() => {
    // Fetch orders based on the customerId
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5254/api/Order/customer/${account.customerId}`
        );
        const data = await response.json();
        setOrders(data); // Set the orders based on the fetched data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [account.customerId]);

  const toggleDetails = (orderId: number) => {
    setVisibleDetails((prevVisibleDetails) => {
      const newVisibleDetails = new Set(prevVisibleDetails);
      if (newVisibleDetails.has(orderId)) {
        newVisibleDetails.delete(orderId); // Hide details if already visible
      } else {
        newVisibleDetails.add(orderId); // Show details if not visible
      }
      return newVisibleDetails;
    });
  };

  const closeDetails = () => {
    setVisibleDetails(new Set()); // Close all modals by clearing the Set
  };

  return (
    <div className="pl-3">
      <h2 className="text-3xl font-semibold">Lịch sử đặt hàng</h2>

      {/* Orders Table */}
      <div className="mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Employee</th>
              <th className="px-4 py-2 border">Order Date</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Confirmed</th>{" "}
              {/* New Column for Confirmation */}
              <th className="px-4 py-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className="px-4 py-2 border">{order.orderId}</td>
                <td className="px-4 py-2 border">
                  {order.employeeName || "Not assigned"}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(order.orderExportDateTime).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">{order.totalAmount}</td>
                <td className="px-4 py-2 border">{order.total}</td>
                <td className="px-4 py-2 border">
                  {order.confirmed ? (
                    <span className="text-green-500">✔️</span> // Display checkmark for confirmed
                  ) : (
                    <span className="text-red-500">❌</span> // Display X for not confirmed
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => toggleDetails(order.orderId)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    {visibleDetails.has(order.orderId)
                      ? "Hide Details"
                      : "Show Details"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Order Details */}
      {Array.from(visibleDetails).map((orderId) => {
        const order = orders.find((order) => order.orderId === orderId);
        return (
          order && (
            <div
              key={orderId}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <div className="bg-white p-6 rounded-md w-3/4 md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">
                  Order {orderId} Details
                </h3>
                <button
                  onClick={closeDetails}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                >
                  X
                </button>
                <table className="min-w-full table-auto border-collapse border border-gray-300 mb-4">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">#</th>
                      <th className="px-4 py-2 border">Product</th>
                      <th className="px-4 py-2 border">Price</th>
                      <th className="px-4 py-2 border">Price After Discount</th>
                      <th className="px-4 py-2 border">Size</th>
                      <th className="px-4 py-2 border">Color</th>
                      <th className="px-4 py-2 border">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderDetails.map((detail, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">
                          {detail.productName}
                        </td>
                        <td className="px-4 py-2 border">
                          {detail.productPrice}
                        </td>
                        <td className="px-4 py-2 border">
                          {detail.priceAfterDiscount}
                        </td>
                        <td className="px-4 py-2 border">{detail.size}</td>
                        <td className="px-4 py-2 border">{detail.color}</td>
                        <td className="px-4 py-2 border">{detail.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={closeDetails}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default OrderHistoryPage;

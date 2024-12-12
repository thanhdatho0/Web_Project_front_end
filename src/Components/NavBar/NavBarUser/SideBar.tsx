import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../ContentComponents/UserContext/UserContext";

const SideBar = () => {
  const { account, logoutContext } = useContext(UserContext);
  return (
    <div className="w-1/4 bg-gray-100 p-6">
      <div className="text-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Avatar"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <h2 className="mt-4 text-xl font-semibold">{account.firstName}</h2>
      </div>
      <ul className="space-y-4">
        <li>
          <Link
            to="account"
            className="flex items-center space-x-2 text-red-500"
          >
            <span>Thông tin tài khoản</span>
          </Link>
        </li>

        <li>
          <Link to="order-history" className="flex items-center space-x-2">
            <span>Quản lý đơn hàng</span>
          </Link>
        </li>
        <li>
          <Link to="change-password" className="flex items-center space-x-2">
            <span>Đổi mật khẩu</span>
          </Link>
        </li>
        <li className="text-center">
          <button
            onClick={logoutContext}
            className="px-6 py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;

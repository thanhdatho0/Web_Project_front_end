import {
  TruckIcon,
  ClockIcon,
  ArrowPathIcon,
  TagIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

const ShippingInfo = () => {
  return (
    <div className="mt-3">
      <div className="flex items-center space-x-2 my-2">
        <TruckIcon className="w-6 h-6 text-gray-400" />
        <span className="font-bold pr-2"> Miễn phí vận chuyển: </span>Đơn hàng
        từ 498k
        <br />
      </div>
      <div className="flex items-center space-x-2 my-2">
        <ClockIcon className="w-6 h-6 text-gray-400" />
        <span className="font-bold pr-2">Giao hàng:</span>Từ 3 - 5 ngày trên cả
        nước
      </div>
      <div className="flex items-center space-x-2 my-2">
        <ArrowPathIcon className="h-6 w-6 text-gray-400" />
        <span className="font-bold pr-2">Miễn phí đổi trả:</span>Tại 267+ cửa
        hàng trong 15 ngày
      </div>
      <div className="flex items-center space-x-2 my-2">
        <TagIcon className="h-6 w-6 text-gray-400" />
        <span>Sử dụng mã giảm giá ở bước thanh toán</span>
      </div>
      <div className="flex items-center space-x-2 my-2">
        <LockClosedIcon className="h-6 w-6 text-gray-400" />
        <span>Thông tin bảo mật và mã hoá</span>
      </div>
    </div>
  );
};

export default ShippingInfo;

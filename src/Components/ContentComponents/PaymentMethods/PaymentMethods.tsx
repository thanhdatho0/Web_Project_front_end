const PaymentMethods = () => {
  return (
    <div className=" bg-gray-200 h-24 flex items-center justify-center mt-6">
      <div className="flex space-x-4">
        <img
          src="https://yody.vn/icons/zalopay.png"
          alt="ZaloPay"
          className="h-8"
        />
        <img
          src="https://yody.vn/icons/visa-card.png"
          alt="VISA"
          className="h-8"
        />
        <img
          src="https://yody.vn/icons/master-card.png"
          alt="MasterCard"
          className="h-8"
        />
        <img
          src="https://yody.vn/icons/vnpay-qr.png"
          alt="VNPAYQR"
          className="h-8"
        />
        <img src="https://yody.vn/icons/momo.png" alt="momo" className="h-8" />
      </div>
    </div>
  );
};

export default PaymentMethods;

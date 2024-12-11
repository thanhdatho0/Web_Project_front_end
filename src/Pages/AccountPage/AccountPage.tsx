import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Components/ContentComponents/UserContext/UserContext";

const AccountPage = () => {
  const { account } = useContext(UserContext);

  const [isEditingE, setIsEditingE] = useState(false);
  const [isEditingP, setIsEditingP] = useState(false);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phoneNumber);
  const [fullName, setFullName] = useState(account.fullName);
  const [dateOfBirth, setDateOfBirth] = useState(account.dateOfBirth);

  useEffect(() => {
    setEmail(account.email);
    setPhone(account.phoneNumber);
    setFullName(account.fullName);
    setDateOfBirth(account.dateOfBirth);
  }, [account]);

  // Hàm ẩn email
  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    const maskedLocal = local.slice(0, 2) + "*".repeat(local.length - 2);
    return `${maskedLocal}@${domain}`;
  };

  // Hàm ẩn số điện thoại
  const maskPhone = (phone: string) => {
    if (phone.length == 0) return "";
    const maskedLocal = "*".repeat(phone.length - 4) + phone.slice(-4); // Ẩn tất cả nhưng 4 số cuối
    return maskedLocal;
  };

  const handleEmailEditClick = () => {
    setIsEditingE(true);
  };

  const handlePhoneEditClick = () => {
    setIsEditingP(true);
  };

  const handleInputEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInputPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleInputFullNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullName(e.target.value);
  };

  const handleInputDateOfBirthChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDateOfBirth(e.target.value);
  };

  const handleBlurEmail = () => {
    setIsEditingE(false);
  };

  const handleBlurPhone = () => {
    setIsEditingP(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi dữ liệu đã thay đổi đến API hoặc Context để cập nhật
    console.log({
      fullName,
      email,
      phone,
      dateOfBirth,
    });
  };

  return (
    <div className="lg:w-[80%] p-6">
      <h2 className="text-2xl font-semibold mb-6">Thông tin tài khoản</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label className="text-base font-medium w-1/5 text-right pr-8">
            Họ Tên
          </label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleInputFullNameChange}
            className="w-2/4 px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="text-base font-medium w-1/5 text-right pr-8">
            Giới tính
          </label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={account.male === true}
                className="mr-3"
              />
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={account.male !== true}
                className="mr-3"
              />
              Nữ
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <label className=" pr-8 text-base font-medium w-1/5 text-right">
            Số điện thoại
          </label>
          <div className="flex items-center space-x-3">
            {isEditingP ? (
              <input
                type="text"
                value={phone}
                onChange={handleInputPhoneChange}
                onBlur={handleBlurPhone}
                autoFocus
                className="w-full px-4 py-2 border rounded-md"
              />
            ) : (
              <div className="flex items-center w-full px-4 py-2 rounded-md">
                {maskPhone(phone || "")}
              </div>
            )}
            {!isEditingP && (
              <div
                className="text-blue-500 cursor-pointer w-full"
                onClick={handlePhoneEditClick}
              >
                Thay đổi
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <label className=" pr-8 text-base font-medium w-1/5 text-right">
            Email
          </label>
          <div className="flex items-center space-x-2">
            {isEditingE ? (
              <input
                type="text"
                value={email}
                onChange={handleInputEmailChange}
                onBlur={handleBlurEmail}
                autoFocus
                className="w-full px-4 py-2 border rounded-md"
              />
            ) : (
              <div className="flex items-center w-full px-4 py-2 rounded-md">
                {maskEmail(email)}
              </div>
            )}
            {!isEditingE && (
              <div
                className="text-blue-500 cursor-pointer w-full"
                onClick={handleEmailEditClick}
              >
                Thay đổi
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <label className=" pr-8 text-base font-medium w-1/5 text-right">
            Ngày sinh
          </label>
          <div className="flex items-center space-x-2">
            <select
              name="day"
              value={dateOfBirth?.split("-")[0] || ""}
              onChange={handleInputDateOfBirthChange}
              className="w-2/3 px-4 py-2 border rounded-md"
            >
              <option value="">Ngày</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={dateOfBirth?.split("-")[1] || ""}
              onChange={handleInputDateOfBirthChange}
              className="w-3/4 px-4 py-2 border rounded-md"
            >
              <option value="">Tháng</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={dateOfBirth?.split("-")[2] || ""}
              onChange={handleInputDateOfBirthChange}
              className="w-2/3 px-4 py-2 border rounded-md"
            >
              <option value="">Năm</option>
              {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <label className=" pr-8 text-base font-medium w-1/5 text-right"></label>
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-md"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;

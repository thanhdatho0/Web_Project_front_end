import { useState } from "react";

const AccountPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
  });

  const [isEditingE, setIsEditingE] = useState(false);
  const [isEditingP, setIsEditingP] = useState(false);
  const [email, setEmail] = useState("thanhdanh431@gmail.com");
  const [phone, setPhone] = useState("091237124");

  // Hàm ẩn email
  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    const maskedLocal = local.slice(0, 2) + "*".repeat(local.length - 2);
    return `${maskedLocal}@${domain}`;
  };

  const maskPhone = (phone: string) => {
    const maskedLocal = "*".repeat(phone.length); // Thay thế toàn bộ phần local bằng dấu *
    return `${maskedLocal}`;
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

  const handleBlurEmail = () => {
    setIsEditingE(false);
  };

  const handleBlurPhone = () => {
    setIsEditingP(false);
  };

  return (
    <div className="lg:w-[80%] p-6 ">
      <h2 className="text-2xl font-semibold mb-6">Thông tin tài khoản</h2>
      <form
        //   onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="flex items-center">
          <label className="text-base font-medium w-1/5 text-right pr-8 ali">
            Họ Tên
          </label>
          <input
            type="text"
            name="fullName"
            //   value={formData.fullName}
            // onChange={handleChange}
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
                checked={formData.gender === "male"}
                // onChange={handleChange}
                className="mr-3"
              />
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                // onChange={handleChange}
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
              <div className="flex items-center w-full px-4 py-2 rounded-md ">
                {maskPhone(phone)}
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
              <div className="flex items-center w-full px-4 py-2 rounded-md ">
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
              // value={formData.day}
              //   onChange={handleChange}
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
              // value={formData.month}
              //   onChange={handleChange}
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
              // value={formData.year}
              //   onChange={handleChange}
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

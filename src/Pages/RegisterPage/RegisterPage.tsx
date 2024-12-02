import { Link } from "react-router-dom"; // Đảm bảo cài React Router nếu sử dụng

const RegisterPage = () => {
  return (
    <div className="lg:w-[85%] mx-auto">
      <div className="pb-6 mt-28">
        <div className="font-sans bg-white min-h-screen">
          <div className="grid md:grid-cols-2 items-center gap-8 min-h-screen">
            <div className="order-last md:order-first p-4">
              <img
                src="https://readymadeui.com/signin-image.webp"
                className="lg:max-w-[85%] w-full h-auto object-contain block mx-auto"
                alt="Illustration for sign-up"
              />
            </div>

            <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
              <form className="max-w-lg w-full mx-auto">
                <div className="mb-12">
                  <h3 className="text-3xl font-bold text-yellow-400">
                    Tạo tài khoản
                  </h3>
                </div>

                {renderInputField(
                  "Tài khoản",
                  "userName",
                  "Nhập tên tài khoản",
                  "text"
                )}
                {renderInputField(
                  "Mật khẩu",
                  "passWord",
                  "Nhập mật khẩu",
                  "password"
                )}
                {renderInputField("Họ", "lastName", "Nhập họ", "text")}
                {renderInputField("Tên", "firstName", "Nhập tên", "text")}
                {renderGenderField()}
                {renderInputField(
                  "Số điện thoại",
                  "phoneNumber",
                  "Nhập số điện thoại",
                  "tel"
                )}
                {renderInputField("Địa chỉ", "address", "Nhập địa chỉ", "text")}
                {renderInputField("Ngày sinh", "dob", "dd/mm/yyyy", "date")}

                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                  >
                    Đăng ký
                  </button>
                  <p className="text-sm text-white mt-8 text-center">
                    Đã có tài khoản?{" "}
                    <Link
                      to="/login"
                      className="text-yellow-400 font-semibold hover:underline"
                    >
                      Đăng nhập tại đây
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderInputField = (
  label: string,
  name: string,
  placeholder: string,
  type: string
) => (
  <div className="mt-8">
    <label htmlFor={name} className="text-white text-xs block mb-2">
      {label}
    </label>
    <div className="relative flex items-center">
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  </div>
);

const renderGenderField = () => (
  <div className="mt-8">
    <label className="text-white text-xs block mb-2">Giới tính</label>
    <div className="flex items-center space-x-4">
      {["Nam", "Nữ", "Khác"].map((gender, index) => (
        <div key={index} className="flex items-center">
          <input
            id={`gender-${index}`}
            name="gender"
            type="radio"
            value={gender}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-yellow-400"
            required
          />
          <label
            htmlFor={`gender-${index}`}
            className="ms-2 text-sm font-medium text-gray-300"
          >
            {gender}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default RegisterPage;

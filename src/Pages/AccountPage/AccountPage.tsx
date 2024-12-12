import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Components/ContentComponents/UserContext/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateUser } from "../../api";

const AccountPage = () => {
  const { account, user } = useContext(UserContext);

  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phoneNumber);
  const [lastName, setLastName] = useState(account.lastName);
  const [firstName, setFirstName] = useState(account.firstName);
  const [address, setAddress] = useState(account.address);
  const [dateOfBirth, setDateOfBirth] = useState(account.dateOfBirth || "");
  const [gender, setGender] = useState(account.male ? "male" : "female");
  const [avatar, setAvatar] = useState<File | null>(null); // For file upload
  const isValidEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isValidPhone = (phone: string) => /^\d{10,15}$/.test(phone);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(account.email);
    setPhone(account.phoneNumber);
    setFirstName(account.firstName);
    setLastName(account.lastName);
    setAddress(account.address);
    setDateOfBirth(account.dateOfBirth || "");
    setGender(account.male === true ? "male" : "female");
  }, [account]);

  // Handle file upload (avatar)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleInputEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInputPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleInputFistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleInputLastNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLastName(e.target.value);
  };

  const handleInputAddressChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddress(e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateOfBirth(date.toISOString().split("T")[0]); // ISO format "yyyy-MM-dd"
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      !email ||
      !phone ||
      !firstName ||
      !lastName ||
      !address ||
      !dateOfBirth
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      alert("Email không hợp lệ!");
      setLoading(false);
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Số điện thoại không hợp lệ!");
      setLoading(false);
      return;
    }

    // Create the CustomerUpdateDto object to match the backend structure
    // Tạo đối tượng CustomerUpdateDto
    const formData = new FormData();

    // Thêm thông tin vào formData
    formData.append("Email", email); // Thêm email
    formData.append("PersonalInfo.FirstName", firstName); // Thêm FirstName
    formData.append("PersonalInfo.LastName", lastName); // Thêm LastName
    formData.append("PersonalInfo.Male", gender === "male" ? "true" : "false"); // Thêm Male (boolean)
    formData.append("PersonalInfo.PhoneNumber", phone); // Thêm PhoneNumber
    formData.append("PersonalInfo.Address", address); // Thêm Address
    formData.append("PersonalInfo.DateOfBirth", dateOfBirth); // Thêm DateOfBirth

    // Thêm avatar nếu có
    if (avatar) {
      formData.append("file", avatar); // Thêm ảnh vào formData
    }

    try {
      // Gọi hàm updateUser
      const message = await updateUser(
        formData,
        user.accessToken,
        account.customerId
      );
      alert(message); // Hiển thị thông báo thành công
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // Hiển thị thông báo lỗi
      } else {
        alert("Đã xảy ra lỗi không xác định."); // Thông báo cho trường hợp lỗi không xác định
      }
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  };

  return (
    <div className="lg:w-[80%] p-6">
      <h2 className="text-2xl font-semibold mb-6">Thông tin tài khoản</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label className="text-base font-medium w-1/5 text-right pr-8">
            Tên
          </label>
          <input
            type="text"
            name="firstname"
            value={firstName}
            onChange={handleInputFistChange}
            className="w-2/4 px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="text-base font-medium w-1/5 text-right pr-8">
            Họ
          </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleInputLastNameChange}
            className="w-2/4 px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="text-base font-medium w-1/5 text-right pr-8">
            Địa chỉ
          </label>
          <textarea
            name="address"
            value={address}
            onChange={handleInputAddressChange}
            className="w-2/4 px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="text-base font-medium w-1/5 text-right pr-8">
            Giới tính
          </label>
          <div className="flex items-center">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
                className="mr-3"
              />
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
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
          <input
            type="text"
            value={phone}
            onChange={handleInputPhoneChange}
            className="w-2/4 px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className=" pr-8 text-base font-medium w-1/5 text-right">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={handleInputEmailChange}
            className="w-2/4 px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="pr-8 text-base font-medium w-1/5 text-right">
            Ngày sinh
          </label>
          <div className="w-2/4">
            <DatePicker
              selected={dateOfBirth ? new Date(dateOfBirth) : null}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              className="w-full px-4 py-2 border rounded-md"
              placeholderText="Chọn ngày sinh"
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="pr-8 text-base font-medium w-1/5 text-right">
            Ảnh đại diện
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-2/4 px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-md"
            >
              {loading ? (
                <svg
                  className="w-5 h-5 mx-auto text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                "Lưu thay đổi"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;

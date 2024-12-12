import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { RegisterData } from "../../Interface"; // Adjust this import based on your typ
import { UserContext } from "../../Components/ContentComponents/UserContext/UserContext";
const RegisterPage = () => {
  window.scrollTo(0, 0); // Scroll to the top of the page
  const [formData, setFormData] = useState<RegisterData>({
    userName: "",
    passWord: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    address: "",
    dob: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Use React Router's useNavigate
  const { user } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && user.isAuthenticated) navigate("/");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const registerPayload = {
      customerInfo: {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          male: formData.gender === "Nam",
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          dateOfBirth: new Date(formData.dob).toISOString().split("T")[0],
        },
        email: formData.email,
      },
      username: formData.userName,
      password: formData.passWord,
    };

    console.log("Payload sent:", registerPayload); // Log payload for debugging

    try {
      const response = await fetch(
        "http://localhost:5254/api/account/customer-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerPayload),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text(); // Read the error message as text
        console.error("Server Error:", errorMessage);
        setError(errorMessage || "An error occurred while registering.");
        return;
      }

      // Now check the content type to decide whether to parse as JSON or text
      const contentType = response.headers.get("Content-Type");

      let result;
      if (contentType && contentType.includes("application/json")) {
        // If it's JSON, parse it as JSON
        result = await response.json();
        console.log("Registration Successful:", result);
      } else {
        // If it's plain text (e.g., "Customer Created"), handle it as text
        const textResponse = await response.text();
        if (textResponse.includes("Customer Created")) {
          console.log("Registration successful, customer created.");
          result = { message: "Customer Created" }; // Handle success
        } else {
          console.error("Unexpected response:", textResponse);
          setError("Unexpected response from server.");
          return;
        }
      }

      navigate("/login"); // Navigate to login page if successful
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="pb-2 mt-16"></div>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100"
        style={{ zoom: "80%" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Tạo tài khoản
          </h3>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left Column - Username & Password */}
            <div className="space-y-4">
              {renderInputField(
                "Tài khoản",
                "userName",
                "Nhập tên tài khoản",
                "text",
                formData,
                setFormData
              )}
              {renderInputField(
                "Mật khẩu",
                "passWord",
                "Nhập mật khẩu",
                "password",
                formData,
                setFormData
              )}
            </div>

            {/* Right Column - Other Information */}
            <div className="space-y-4">
              {renderInputField(
                "Họ",
                "lastName",
                "Nhập họ",
                "text",
                formData,
                setFormData
              )}
              {renderInputField(
                "Tên",
                "firstName",
                "Nhập tên",
                "text",
                formData,
                setFormData
              )}
              {renderGenderField(formData, setFormData)}
              {renderInputField(
                "Email",
                "email",
                "Nhập email",
                "email",
                formData,
                setFormData
              )}
              {renderInputField(
                "Số điện thoại",
                "phoneNumber",
                "Nhập số điện thoại",
                "tel",
                formData,
                setFormData
              )}
              {renderInputField(
                "Địa chỉ",
                "address",
                "Nhập địa chỉ",
                "text",
                formData,
                setFormData
              )}
              {renderInputField(
                "Ngày sinh",
                "dob",
                "dd/mm/yyyy",
                "date",
                formData,
                setFormData
              )}
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const renderInputField = (
  label: string,
  name: string,
  placeholder: string,
  type: string,
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => (
  <div>
    <label htmlFor={name} className="text-gray-700 text-sm block mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={formData[name] || ""}
      onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      required
      className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      placeholder={placeholder}
    />
  </div>
);

const renderGenderField = (
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => (
  <div>
    <label className="text-gray-700 text-sm block mb-2">Giới tính</label>
    <div className="flex justify-between">
      {["Nam", "Nữ", "Khác"].map((gender, index) => (
        <label key={index} className="inline-flex items-center">
          <input
            type="radio"
            name="gender"
            value={gender}
            checked={formData.gender === gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="form-radio h-5 w-5 text-yellow-400"
          />
          <span className="ml-2 text-gray-700">{gender}</span>
        </label>
      ))}
    </div>
  </div>
);

export default RegisterPage;

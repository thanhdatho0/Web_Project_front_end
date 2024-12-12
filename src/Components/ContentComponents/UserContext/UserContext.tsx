import { createContext, ReactNode, useEffect, useState } from "react";
import { Account, User } from "../../../Interface";
import { getCustomerDetails, refreshToken } from "../../../api";

// Định nghĩa kiểu cho context
interface UserContextType {
  user: User;
  account: Account;
  loginContext: (userData: User) => void;
  logoutContext: () => void;
}

// Tạo UserContext
export const UserContext = createContext<UserContextType>({
  user: {
    isAuthenticated: false,
    accessToken: "",
  },
  account: {
    customerId: 0,
    avatar: "",
    address: "",
    dateOfBirth: "",
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    male: false,
    phoneNumber: "",
  },
  loginContext: () => {},
  logoutContext: () => {},
});

// Tạo UserProvider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          isAuthenticated: false,
          accessToken: "",
        };
  });

  const [account, setAccount] = useState(() => {
    const storeAccount = localStorage.getItem("account");
    return storeAccount
      ? JSON.parse(storeAccount)
      : {
          customerId: 0,
          avatar: "",
          address: "",
          dateOfBirth: "",
          email: "",
          firstName: "",
          lastName: "",
          male: false,
          phoneNumber: "",
        };
  });

  // Hàm login
  const loginContext = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutContext = () => {
    setUser({
      isAuthenticated: false,
      accessToken: "",
    });
    localStorage.removeItem("user"); // Xóa dữ liệu
    localStorage.removeItem("account"); // Xóa dữ liệu
  };

  const fetchUser = async () => {
    if (!user.accessToken) {
      return;
    }
    try {
      const check = await getCustomerDetails(user.accessToken);
      if (check && check.data) {
        // console.log(check);
        let customerId = check.data.customerId;
        let avatar = check.data.avatar || "";
        let email = check.data.email;
        let address = check.data.personalInfo.address;
        let dateOfBirth = check.data.personalInfo.dateOfBirth;
        let firstName = check.data.personalInfo.firstName;
        let lastName = check.data.personalInfo.lastName;
        let fullName = lastName + firstName;
        let male = check.data.personalInfo.male;
        let phoneNumber = check.data.personalInfo.phoneNumber || "";

        let data = {
          customerId,
          avatar,
          address,
          dateOfBirth,
          email,
          firstName,
          lastName,
          fullName,
          male,
          phoneNumber,
        };
        setAccount(data);
        localStorage.setItem("account", JSON.stringify(data));
      } else {
        logoutContext();
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra token", error);
      logoutContext();
    }
  };
  const getAccessToken = async (token: string) => {
    try {
      const response = await refreshToken(token);
      if (response && response.data) {
        const newAccessToken = response.data.accessToken;
        setUser((prevUser) => {
          const updatedUser = {
            ...prevUser,
            accessToken: newAccessToken, // Cập nhật accessToken mới
            isAuthenticated: true,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser)); // Lưu lại vào localStorage
          console.log("new" + user.accessToken);
          return updatedUser; // Trả về updatedUser
        });
      }
    } catch (error) {
      console.error("Lỗi refresh token", error);
      logoutContext();
    }
  };

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (e) {
      console.error("Invalid token format", e);
      return null;
    }
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      fetchUser();
      const intervalId = setInterval(() => {
        console.log(user.accessToken);
        getAccessToken(user.accessToken);
      }, 2 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [user.accessToken]);

  return (
    <UserContext.Provider
      value={{ user, account, loginContext, logoutContext }}
    >
      {children}
    </UserContext.Provider>
  );
};
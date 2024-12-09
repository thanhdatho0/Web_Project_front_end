import { createContext, ReactNode, useState } from "react";

interface User {
  isAuthenticated: boolean;
  username: string;
  email: string;
  token: string;
}

// Định nghĩa kiểu cho context
interface UserContextType {
  user: User;
  loginContext: (userData: User) => void;
  logoutContext: () => void;
}

// Tạo UserContext
export const UserContext = createContext<UserContextType>({
  user: { isAuthenticated: false, username: "", email: "", token: "" },
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
          username: "",
          email: "",
          token: "",
        };
  });

  // Hàm login
  const loginContext = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutContext = () => {
    setUser({
      isAuthenticated: false,
      username: "",
      email: "",
      token: "",
    });
    localStorage.removeItem("user"); // Xóa dữ liệu
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

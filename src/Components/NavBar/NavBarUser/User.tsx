import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../ContentComponents/UserContext/UserContext";

const User = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="relative">
      {user && user.isAuthenticated ? (
        <Link to="/user" className="text-blue-500 hover:underline">
          User
        </Link>
      ) : (
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      )}
    </div>
  );
};

export default User;

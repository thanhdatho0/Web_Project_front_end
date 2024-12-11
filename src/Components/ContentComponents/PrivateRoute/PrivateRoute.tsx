import { Navigate } from "react-router-dom";
// import UserPage from "../../../Pages/UserPage/UserPage";
import UserPage from "../../../Pages/UserPage/UserPage";

const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <UserPage /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

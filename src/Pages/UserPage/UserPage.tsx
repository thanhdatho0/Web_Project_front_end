import { Outlet } from "react-router-dom";
import SideBar from "../../Components/NavBar/NavBarUser/SideBar";

const UserPage = () => {
  return (
    <div className="lg:w-[90%] mx-auto">
      <div className="pb-2 mt-16 "></div>
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;

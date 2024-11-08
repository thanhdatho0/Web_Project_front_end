import Logo from "./Logo/Logo.tsx";
import logo_img from "../../assets/logo.svg";
import Search from "../Search/Search.tsx";
import Cart from "./NavBarCart/Cart.tsx";
import { ChangeEvent, useState } from "react";
import NavigationList from "./Navigation/NavigationList.tsx";

const NavBar = () => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };
  //End

  return (
    <nav
      id="head-navbar"
      className=" w-full shadow-sm fixed top-0 z-50 bg-white"
    >
      <div className="flex flex-row items-center justify-between lg:w-[85%] xl:w-[85%] m-auto">
        <div className="left-side flex items-center gap-8 p-3">
          <Logo logo_src={logo_img} />
          <NavigationList />
        </div>
        <div className="right-side flex flex-row items-center gap-8 p-3 text-center">
          <Search handleChange={handleChange} search={search} />
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

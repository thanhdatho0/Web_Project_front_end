import Logo from "./NavbarComponents/Logo";
import logo_img from "../assets/logo.svg";
import Navigation from "./NavbarComponents/Navigation";
import navigateData from "../JsonData/Navigation.json";
import Search from "./NavbarComponents/Search";
import Cart from "./NavbarComponents/Cart";
import { ChangeEvent, useState } from "react";

const Navbar = () => {
  //Search Handle Events
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };
  //End

  return (
    <nav
      id="head-navbar"
      className="flex w-full flex-row items-center justify-around shadow-sm"
    >
      <div className="left-side flex items-center gap-8 p-3">
        <Logo logo_src={logo_img} />
        <Navigation items={navigateData} />
      </div>
      <div className="righ-side flex flex-row items-center gap-8 p-3 text-center">
        <Search handleChange={handleChange} search={search} />
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;

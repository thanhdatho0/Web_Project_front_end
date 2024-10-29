import Logo from "./Logo/Logo.tsx";
import logo_img from "../../assets/logo.svg";
import Search from "../Search/Search.tsx";
import Cart from "./NavBarCart/Cart.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {NavBarCategoryTitle} from "../../Category";
import {CategoryTitleList} from "../../api.tsx";
import NavigationList from "./Navigation/NavigationList.tsx";

const NavBar = () => {
  //Search Handle Events
  const [search, setSearch] = useState<string>("");
  const [title, setTitle] = useState<NavBarCategoryTitle[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getAllCategory = async () => {
      const result = await CategoryTitleList();
      if(typeof result === "string"){
        setError(result);
        console.log("Error Message: ", error);
      }else if(Array.isArray(result.data)){
        setTitle(result.data);
      }
  }

  useEffect(() => {
    getAllCategory();
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };
  //End

  return (
    <nav
      id="head-navbar"
      className=" w-full shadow-sm"
    >
      <div className="flex flex-row items-center justify-between lg:w-[85%] xl:w-[85%] m-auto">
        <div className="left-side flex items-center gap-8 p-3">
          <Logo logo_src={logo_img}/>
          <NavigationList items={title}/>
        </div>
        <div className="righ-side flex flex-row items-center gap-8 p-3 text-center">
          <Search handleChange={handleChange} search={search}/>
          <Cart/>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const items = [
  { id: "1", description: "Áo giữ nhiệt" },
  { id: "2", description: "Áo thun" },
  { id: "3", description: "Áo Polo" },
  { id: "4", description: "Đồ lót" },
];

const ItemSuggestions = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <a className="flex items-center gap-3 capitalize tracking-normal  border-b-2 border-black pb-1 text-3xl ">
          Áo giữ nhiệt{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </a>
      </MenuHandler>
      <MenuList className="rounded-lg w-[13rem] !m-0 border border-black">
        {items.map(({ id, description }) => (
          <MenuItem key={id} className="hover:bg-blue-100 flex" role="menuitem">
            <Typography className="font-normal py-2 px-1 pl-2 flex">
              {description}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ItemSuggestions;

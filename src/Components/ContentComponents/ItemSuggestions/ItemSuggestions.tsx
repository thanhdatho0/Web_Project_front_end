import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { SetStateAction, useState } from "react";

const items = [
  { id: "1", description: "Áo giữ nhiệt" },
  { id: "2", description: "Áo thun" },
  { id: "3", description: "Áo Polo" },
  { id: "4", description: "Đồ lót" },
];

const widths = [
  "w-[13rem]", // áo giữ nhiệt
  "w-[10rem]", // áo thun
  "w-[9rem]", // áo polo
  "w-[8rem]", // đồ lót
];

const ItemSuggestions = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState(
    items[0].description
  );
  const [dropdownWidth, setDropdownWidth] = useState(widths[0]);

  const handleSelect = (description: SetStateAction<string>) => {
    const selectedIndex = items.findIndex(
      (item) => item.description === description
    );
    if (selectedIndex !== -1) {
      setDropdownWidth(widths[selectedIndex]); // Cập nhật chiều rộng dựa trên chỉ số của sản phẩm đã chọn
    }
    setSelectedProductType(description);
    setOpenMenu(false);
  };

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <button
          className="text-black focus:outline-none rounded-lg text-3xl inline-flex items-center border-b-2 border-black"
          type="button"
        >
          {selectedProductType}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-4 w-9 ml-2 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </button>
      </MenuHandler>
      <MenuList
        className={`z-10 bg-white divide-y divide-gray-200 rounded-lg shadow ${dropdownWidth}`}
      >
        {items.map(({ id, description }) => (
          <MenuItem key={id}>
            <Typography
              className="block pl-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-500 dark:hover:text-white text-left"
              onClick={() => handleSelect(description)}
            >
              {description}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ItemSuggestions;

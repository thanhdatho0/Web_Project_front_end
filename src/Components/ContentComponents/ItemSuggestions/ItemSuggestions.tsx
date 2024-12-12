import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import CardList from "../CardList/CardList";
import { Subcategory } from "../../../Interface";
import { SubcategoryList } from "../../../api";

const ItemSuggestions = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]); // Store categories
  const [error, setError] = useState<string | null>(null);

  const [openMenu, setOpenMenu] = useState(false);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number>(1); // Default subcategory ID
  const [dropdownWidth, setDropdownWidth] = useState("w-[13rem]"); // Default width

  // Handle subcategory selection
  const handleSelect = (id: number) => {
    setSelectedSubcategoryId(id); // Update the selected subcategory
    const subcategoryIndex = subcategories.findIndex(
      (subcategory) => subcategory.subcategoryId === id
    );
    if (subcategoryIndex !== -1) {
      setDropdownWidth("w-[13rem]"); // Update dropdown width dynamically (if needed)
    }
    setOpenMenu(false); // Close the dropdown menu
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await SubcategoryList();
        if (typeof response === "string") {
          setError(response); // Handle API error
        } else {
          setSubcategories(response); // Store subcategories
          setSelectedSubcategoryId(response[0]?.subcategoryId || 1); // Default to the first subcategory
        }
      } catch (e) {
        console.error("Unexpected error while fetching subcategories", e);
        setError("An unexpected error occurred.");
        console.log(error);
      }
    };
    fetchSubcategories();
  }, []);

  return (
    <>
      <div className="flex w-full justify-center pt-4">
        <h2 className="mr-3 flex h-12 justify-center text-3xl pt-1 bg-gradient-to-r from-yellow-900 to-yellow-500 text-transparent bg-clip-text">
          Gợi ý sản phẩm
        </h2>
        <Menu open={openMenu} handler={setOpenMenu} allowHover>
          <MenuHandler>
            <button
              className="text-black focus:outline-none rounded-lg text-3xl inline-flex items-center border-b-2 border-black"
              type="button"
            >
              {subcategories.find(
                (cat) => cat.subcategoryId === selectedSubcategoryId
              )?.subcategoryName || "Chọn danh mục"}
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
            {subcategories.map((subcategory, index) => (
              <MenuItem key={index}>
                <Typography
                  className="block pl-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-500 dark:hover:text-white text-left"
                  onClick={() => handleSelect(subcategory.subcategoryId)}
                >
                  {subcategory.subcategoryName}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <div>
        <CardList subcategoryId={selectedSubcategoryId} />
      </div>
    </>
  );
};

export default ItemSuggestions;

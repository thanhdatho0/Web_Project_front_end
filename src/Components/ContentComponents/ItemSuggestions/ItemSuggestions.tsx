import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { CategoryList } from "../../../api";
import CardList from "../CardList/CardList";
import { Product } from "../../../Product";
import { Category } from "../../../Interface";

const ItemSuggestions = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Store categories
  const [products, setProducts] = useState<Product[]>([]); // Store products
  const [error, setError] = useState<string | null>(null);

  const [openMenu, setOpenMenu] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1); // Default category ID
  const [dropdownWidth, setDropdownWidth] = useState("w-[13rem]"); // Default width

  // Handle category selection
  const handleSelect = (id: number) => {
    setSelectedCategoryId(id); // Update the selected category
    const categoryIndex = categories.findIndex(
      (category) => category.categoryId === id
    );
    if (categoryIndex !== -1) {
      setDropdownWidth("w-[13rem]"); // Update dropdown width dynamically (if needed)
    }
    setOpenMenu(false); // Close the dropdown menu
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryList();
        if (typeof response === "string") {
          setError(response); // Handle API error
        } else {
          setCategories(response); // Store categories
          setSelectedCategoryId(response[0]?.categoryId || 1); // Default to the first category
        }
      } catch (e) {
        console.error("Unexpected error while fetching categories", e);
        setError("An unexpected error occurred.");
      }
    };
    fetchCategories();
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
              {categories.find((cat) => cat.categoryId === selectedCategoryId)
                ?.name || "Chọn danh mục"}
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
            {categories.map((category) => (
              <MenuItem key={category.categoryId}>
                <Typography
                  className="block pl-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-500 dark:hover:text-white text-left"
                  onClick={() => handleSelect(category.categoryId)}
                >
                  {category.name}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <div>
        <CardList categoryId={selectedCategoryId} />
      </div>
    </>
  );
};

export default ItemSuggestions;

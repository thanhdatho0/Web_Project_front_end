import {
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../Interface";

const slugify = (text: string) => {
  const from =
    "áàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ";
  const to =
    "aaaaaaaaaaaaaaaaaaooooooooooooooooeeeeeeeeeeeuuuuuuuuuuuuiiiiiyyyyyd";

  let slug = text
    .split("")
    .map((char) => {
      const i = from.indexOf(char.toLowerCase());
      return i !== -1 ? to[i] : char;
    })
    .join("");

  slug = slug.toLowerCase();

  slug = slug.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  return slug.replace(/^-+|-+$/g, "");
};

interface Props {
  targetId: number;
  name: string;
  items: Category[];
  img: { url: string; alt: string };
}

const WideDropdownMenu = ({ targetId, name, items, img }: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = async (
    targetCustomerId: number,
    categoryId: number,
    name: string,
    subcategoryId?: number
  ) => {
    try {
      const formattedName = slugify(name);
      const path = subcategoryId
        ? `subCategory/${formattedName}`
        : `category/${formattedName}`;
      console.log("targetCustomerId = " + targetCustomerId);
      navigate(path, {
        state: {
          targetCustomerId,
          categoryId,
          ...(subcategoryId && { subcategoryId }),
        },
      });

      setOpenMenu(false);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  const columnCategories: Category[][] = Array.from({ length: 5 }, () => []);

  items.forEach((category, index) => {
    if (index < 5) {
      columnCategories[index].push(category);
    } else {
      const columnWithFewestLines = columnCategories.reduce(
        (minColIdx, col, colIdx, cols) =>
          col.reduce((sum, group) => sum + group.subcategories.length, 0) <
          cols[minColIdx].reduce(
            (sum, group) => sum + group.subcategories.length,
            0
          )
            ? colIdx
            : minColIdx,
        0
      );
      columnCategories[columnWithFewestLines].push(category);
    }
  });

  return (
    <Menu open={openMenu}>
      <MenuHandler>
        <div
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
          className="text-black focus:outline-none px-2 py-2 inline-flex items-center cursor-pointer"
        >
          {name}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-5 ml-0 transition-transform flex-shrink-0 ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </div>
      </MenuHandler>
      <div
        onMouseEnter={() => setOpenMenu(true)}
        onMouseLeave={() => setOpenMenu(false)}
      >
        <MenuList className="w-full z-10">
          <div
            className="grid grid-cols-6 "
            style={{ border: "none !important" }}
          >
            {columnCategories.map((categories, index) => (
              <div
                key={index}
                className={`col-span-1 ${
                  index < 4 ? "border-r border-gray-300" : ""
                }`}
              >
                {categories.map(
                  (category, groupIdx) =>
                    category.subcategories.length > 0 && (
                      <div key={groupIdx}>
                        {/* Tên danh mục chính */}
                        <div
                          key={category.categoryId}
                          className="font-bold pb-2 mb-1 mt-2  pl-2 text-sm text-gray-700 text-left cursor-pointer"
                          onClick={() =>
                            handleNavigation(
                              targetId,
                              category.categoryId,
                              category.name
                            )
                          }
                        >
                          {category.name}
                        </div>

                        {/* Danh sách danh mục con */}
                        {category.subcategories.map((subcategory, idx) => (
                          <Typography
                            key={idx}
                            className="text-sm pb-2 pl-2 text-gray-700 text-left cursor-pointer"
                            onClick={() =>
                              handleNavigation(
                                targetId,
                                category.categoryId,
                                subcategory.subcategoryName,
                                subcategory.subcategoryId
                              )
                            }
                          >
                            {/* <Link
                        to={{
                          pathname: `/category/${item.navigate}`,
                          state: { categoryData: item },
                        }}
                        className="dark:hover:text-red-600 ml-4"
                      ></Link> */}
                            {subcategory.subcategoryName}
                          </Typography>
                        ))}
                      </div>
                    )
                )}
              </div>
            ))}
            <div className="col-span-1">
              <img src={img.url} alt={img.alt} className="w-full h-auto" />
            </div>
          </div>
        </MenuList>
      </div>
    </Menu>
  );
};

export default WideDropdownMenu;

import {
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
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

const WideDropdownMenu = ({
  name,
  items,
  img,
}: {
  name: string;
  items: Category[];
  img: { url: string; alt: string };
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleSelect = async (id: number, description: string) => {
    if (!id) {
      console.error("Invalid ID:", id);
      return;
    }
    console.log(description);
    try {
      const formattedDescription = slugify(description);
      navigate(`subcategory/${formattedDescription}`, {
        state: { subcategoryId: id },
      });
      setOpenMenu(false);
    } catch (error) {
      console.error("Error fetching subcategory:", error);
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
        <Link
          to="/"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
          className="text-black focus:outline-none px-2 py-2 inline-flex items-center"
        >
          {name}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-5 ml-0 transition-transform flex-shrink-0 ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Link>
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
                {categories.map((category, groupIdx) => (
                  <div key={groupIdx}>
                    {/* Tên danh mục chính */}
                    <div
                      key={category.categoryId}
                      className="font-bold pb-2 mb-1 mt-2  pl-2 text-sm text-gray-700 text-left"
                    >
                      <Link to="/">{category.name}</Link>
                    </div>

                    {/* Danh sách danh mục con */}
                    {category.subcategories.map((subcategory, idx) => (
                      <Typography
                        key={idx}
                        className="text-sm pb-2 pl-2 text-gray-700 text-left"
                        onClick={() =>
                          handleSelect(
                            Number(subcategory.subcategoryId),
                            subcategory.subcategoryName
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
                ))}
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

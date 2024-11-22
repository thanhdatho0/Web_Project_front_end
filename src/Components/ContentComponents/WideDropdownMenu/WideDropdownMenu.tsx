import {
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
interface Item {
  navigate: string;
  description: string;
  id?: number;
}

type ItemGroup = Item[];

const WideDropdownMenu = ({
  name,
  items,
  img,
}: {
  name: string;
  items: ItemGroup[];
  img: string;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleSelect = async (id: number) => {
    if (!id) {
      console.error("Invalid ID:", id);
      return;
    }

    try {
      navigate(`/category/${id}`, {
        state: { categoryId: id },
      });
      setOpenMenu(false);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const columns: ItemGroup[][] = Array.from({ length: 5 }, () => []);

  items.forEach((itemGroup, index) => {
    if (index < 5) {
      columns[index].push(itemGroup);
    } else {
      const columnWithFewestLines = columns.reduce(
        (minColIdx, col, colIdx, cols) =>
          col.reduce((sum, group) => sum + group.length, 0) <
          cols[minColIdx].reduce((sum, group) => sum + group.length, 0)
            ? colIdx
            : minColIdx,
        0
      );
      columns[columnWithFewestLines].push(itemGroup);
    }
  });

  return (
    <Menu open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <a
          href="#"
          className="text-black focus:outline-none px-2 py-2 inline-flex items-center"
          onClick={toggleMenu}
        >
          {name}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-5 ml-0 transition-transform flex-shrink-0 ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </a>
      </MenuHandler>
      <MenuList className="w-full z-10">
        <div
          className="grid grid-cols-6 "
          style={{ border: "none !important" }}
        >
          {columns.map((columnItems, index) => (
            <div
              key={index}
              className={`col-span-1 ${
                index < 4 ? "border-r border-gray-300" : ""
              }`}
            >
              {columnItems.map((itemGroup, groupIdx) => (
                <div key={groupIdx}>
                  {itemGroup.map((item, idx) => (
                    <Typography
                      key={idx}
                      className={`${
                        idx === 0 ? "font-bold pb-2 mb-1 mt-2" : "text-sm pb-2"
                      }
                     pl-2 text-sm text-gray-700 text-left`}
                      onClick={() => handleSelect(Number(item.id))}
                    >
                      {/* <Link
                        to={{
                          pathname: `/category/${item.navigate}`,
                          state: { categoryData: item },
                        }}
                        className="dark:hover:text-red-600 ml-4"
                      ></Link> */}
                      {item.description}
                    </Typography>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className="col-span-1">
            <img src={img} className="w-full h-auto" />
          </div>
        </div>
      </MenuList>
    </Menu>
  );
};

export default WideDropdownMenu;

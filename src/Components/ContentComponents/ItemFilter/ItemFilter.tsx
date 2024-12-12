import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface ItemFilterProps {
  selectedFilter: { id: string }[];
  onDeleteItem: (filterId: string) => void;
}

const ItemFilter: React.FC<ItemFilterProps> = ({
  selectedFilter,
  onDeleteItem,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      {selectedFilter.length < 4 ? (
        <ul className="flex flex-wrap gap-2 p-0 list-none">
          {selectedFilter.map((filter, index) => (
            <li key={index} className="inline-block border-dashed">
              <button onClick={() => onDeleteItem(filter.id)}>
                {filter.id} ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex w-56  rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            onClick={handleClick}
          >
            {selectedFilter.length} bộ lọc
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 ml-auto"
              aria-hidden="true"
            />
          </button>
          <div className="absolute right-0 z-10 mt-2 w-56  rounded-md bg-white shadow-lg  ring-black ">
            {open ? (
              <div className="py-1" role="none">
                {selectedFilter.map((filter, index) => (
                  <div
                    key={index}
                    className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <span>{filter.id}</span>
                    <button
                      onClick={() => onDeleteItem(filter.id)}
                      className="text-red-500"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemFilter;

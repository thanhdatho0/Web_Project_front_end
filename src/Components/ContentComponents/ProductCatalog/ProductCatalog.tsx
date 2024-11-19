"use client";
import Card from "../Card/Card";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import ItemFilter from "../ItemFilter/ItemFilter";
import aoNamItems from "../../../JsonData/AoNamItems.json";
// import quanNamItems from "../../../JsonData/QuanNamItems.json";

const sortOptions = [
  { name: "Nổi bật", href: "#", current: false },
  { name: "Mới nhất", href: "#", current: false },
  { name: "Giá từ thấp đến cao", href: "#", current: false },
  { name: "Giá từ cao đến thấp", href: "#", current: false },
];
const filters = [
  {
    id: "color",
    name: "Màu sắc",
    options: [
      { value: "white", label: "Trắng", checked: false },
      { value: "beige", label: "Màu be", checked: false },
      { value: "blue", label: "Xanh nước biển", checked: false },
      { value: "brown", label: "Nâu", checked: false },
      { value: "green", label: "Xanh lá cây", checked: false },
      { value: "purple", label: "Tím", checked: false },
    ],
  },
  {
    id: "Price",
    name: "Theo giá",
    options: [
      { value: "duoi-350", label: "Dưới 350", checked: false },
      {
        value: "tu-350.000-750.000",
        label: "Từ 350.000đ - 750.000đ",
        checked: false,
      },
      {
        value: "tren-750",
        label: "Trên 750.000đ",
        checked: false,
      },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
      { value: "0", label: "0", checked: false },
      { value: "1", label: "1", checked: false },
      { value: "2", label: "2", checked: false },
    ],
  },
];

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  categoryName: string;
  categoryLocation: string;
}

const ProductCatalog: React.FC<Props> = ({
  categoryName,
  categoryLocation,
}: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<{ id: string }[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    { id: number; name: string; price: number; navigate: string }[]
  >([]);
  const handleAddItem = (value) => {
    setSelectedFilters((selectedFilters) => [
      ...selectedFilters,
      { id: value },
    ]);
  };

  const handleDeleteItem = (filterId: string) => {
    setSelectedFilters((selectedFilters) =>
      selectedFilters.filter((item) => item.id !== filterId)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { selectedFilters, id: Date.now() };
    handleAddItem(newItem);
  };

  useEffect(() => {
    const matchedCategory = aoNamItems.find(
      (category) => category.navigate === categoryLocation
    );

    if (matchedCategory && Array.isArray(matchedCategory.products)) {
      setFilteredProducts(matchedCategory.products);
    } else {
      setFilteredProducts([]);
    }
  }, [categoryLocation]);
  return (
    <div className="bg-white">
      <div>
        <main className="">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-5">
            {categoryName}
          </h1>
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 pt-2">
            <span className="text-lg  tracking-tight text-gray-900">
              ... sản phẩm
            </span>
            <ItemFilter
              selectedFilter={selectedFilters}
              onDeleteItem={handleDeleteItem}
            />
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sắp xếp theo
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <span id="products-heading" className=""></span>
            <h3 id="products-heading" className="font-bold text-xl">
              Bộ lọc
            </h3>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    defaultOpen
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6" onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              checked={selectedFilters.some(
                                (item) => item.id === option.label
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleAddItem(option.label);
                                } else {
                                  handleDeleteItem(option.label);
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* thông tin products */}
                {filteredProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;

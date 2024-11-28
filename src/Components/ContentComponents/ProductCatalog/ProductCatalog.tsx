"use client";
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
import { Product } from "../../../Interface";
import Card from "../Card/Card";
// import { ProductList } from "../../../api";
import axios from "axios";

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
      { value: "4", label: "Hồng", checked: false },
      { value: "9", label: "Tím", checked: false },
      { value: "10", label: "Nâu", checked: false },
      { value: "6", label: "Trắng", checked: false },
      { value: "5", label: "Đen", checked: false },
      { value: "1", label: "Đỏ", checked: false },
      { value: "12", label: "Xám", checked: false },
    ],
  },
  {
    id: "price",
    name: "Theo giá",
    options: [
      { value: "duoi-350", label: "Dưới 350", checked: false },
      {
        value: "350.000-750.000",
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
      { value: "1", label: "S", checked: false },
      { value: "2", label: "M", checked: false },
      { value: "3", label: "L", checked: false },
      { value: "4", label: "XL", checked: false },
    ],
  },
];

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  subcategoryName: string;
  subcategoryId: number;
}

const ProductCatalog: React.FC<Props> = ({
  subcategoryName,
  subcategoryId,
}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [colorId, setColorId] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ id: string }[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState("Sắp xếp theo");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("CategoryId", categoryId.toString());

        if (colorId.length > 0) {
          queryParams.append("ColorId", colorId.join(","));
        }
        if (size.length > 0) {
          queryParams.append("SizeId", size.join(","));
        }

        if (price.length > 0) {
          queryParams.append("Price", price.join(","));
        }

        const response = await axios.get<Product[]>(
          `http://localhost:5254/api/products?${queryParams.toString()}`
        );

        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setProductCount(response.data.length);
        } else {
          console.error("Invalid product data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [colorId, size, price, categoryId]);

  const handleSortSelect = (value: string) => {
    setSortBy(value);
  };

  const handleAddColorId = (newColorId) => {
    setColorId((prev) => {
      const updatedColorIds = [...prev, newColorId];
      return [...new Set(updatedColorIds)];
    });
  };

  const handleDeleteColorId = (newColorId) => {
    setColorId((prev: string[]) => prev.filter((id) => id !== newColorId));
  };

  const handleAddPrice = (newPrice) => {
    setPrice((prev) => [...prev, newPrice]);
  };

  const handleDeletePrice = (newPrice) => {
    setPrice((prev) => prev.filter((id) => id !== newPrice));
  };

  const handleAddSize = (newSize) => {
    setSize((prev) => {
      const updateSize = [...prev, newSize];
      return [...new Set(updateSize)];
    });
  };

  const handleDeleteSize = (newSize) => {
    setSize((prev: string[]) => prev.filter((id) => id !== newSize));
  };

  const handleAddItem = (value: string) => {
    setSelectedFilters((selectedFilters) => [
      ...selectedFilters,
      { id: value },
    ]);
  };

  const handleDeleteItem = (filterId: string) => {
    setSelectedFilters((prev) => prev.filter((item) => item.id !== filterId));
    const filterOption = filters
      .flatMap((filter) => filter.options)
      .find((opt) => opt.value === filterId);

    if (!filterOption) return;
    const filter = filters.find((f) =>
      f.options.some((o) => o.value === filterId)
    );
    if (!filter) return;
    if (filter.id === "color") {
      setColorId((prev) => prev.filter((id) => id !== filterOption.value));
    } else if (filter.id === "size") {
      setSize((prev) => prev.filter((id) => id !== filterOption.value));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  const handleClearListFilters = () => {
    setSelectedFilters([]);
    setColorId([]);
    setSize([]);
  };
  return (
    <div className="bg-white">
      <div>
        <main className="">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-5">
            {subcategoryName}
          </h1>
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-2">
            <div className="flex items-center">
              <div className="flex mr-60">
                <span
                  className=" font-medium text-gray-900 flex-shrink-0"
                  style={{ fontSize: "17px" }}
                >
                  {productCount} sản phẩm
                </span>
              </div>
              {selectedFilters.length > 0 ? (
                <span className="mr-3">Đang dùng bộ lọc: </span>
              ) : (
                ""
              )}
              <ItemFilter
                selectedFilter={selectedFilters}
                onDeleteItem={handleDeleteItem}
              />
              {selectedFilters.length > 0 ? (
                <button className="ml-3" onClick={handleClearListFilters}>
                  Xóa tất cả ❌
                </button>
              ) : (
                ""
              )}
            </div>

            <div>
              <Menu
                as="div"
                className="relative inline-block text-left ml-auto"
              >
                <div>
                  <MenuButton className="group text-base inline-flex justify-center font-medium text-gray-900 hover:text-gray-900">
                    {sortBy}
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
                      <MenuItem
                        key={option.name}
                        onClick={() => handleSortSelect(option.name)}
                      >
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-900",
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
                    <DisclosurePanel className="pt-6">
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
                                  if (section.id === "color") {
                                    handleAddColorId(option.value);
                                  } else if (section.id === "size") {
                                    handleAddSize(option.value);
                                  } else if (section.id === "price") {
                                    handleAddPrice(option.value);
                                  }
                                } else {
                                  handleDeleteItem(option.label);
                                  if (section.id === "color") {
                                    handleDeleteColorId(option.value);
                                  } else if (section.id === "size") {
                                    handleDeleteSize(option.value);
                                  } else if (section.id === "price") {
                                    handleDeletePrice(option.value);
                                  }
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-900"
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
              <div className="lg:col-span-3 gap-6">
                <div className="my-5 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Array.isArray(products)
                    ? products.map((product) => (
                        <Card key={product.productId} product={product} />
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;

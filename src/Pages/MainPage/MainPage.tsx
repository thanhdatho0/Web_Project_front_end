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
import { getAllProducts } from "../../api";
import { Product } from "../../Interface";
import Card from "../../Components/ContentComponents/Card/Card";
import { useLocation } from "react-router";
import ItemFilter from "../../Components/ContentComponents/ItemFilter/ItemFilter";
import Breadcrumbs from "../../Components/ContentComponents/Breadcrumb/Breadcrumbs";

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
      {
        value: "tat-ca",
        label: "Tất cả",
        checked: true,
      },
      { value: "duoi-350", label: "Dưới 350.000đ", checked: false },
      {
        value: "350-750",
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

interface Option {
  value: string;
  name: string;
  current: boolean;
}
const Options = [
  { value: "trend", name: "Nổi bật", current: false },
  { value: "date", name: "Mới nhất", current: false },
  { value: "low", name: "Giá từ thấp đến cao", current: false },
  { value: "hight", name: "Giá từ cao đến thấp", current: false },
];

const MainPage = () => {
  const location = useLocation();
  const { targetCustomerId, categoryId, subcategoryId } = location.state || {};
  const [products, setProducts] = useState<Product[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [colorId, setColorId] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ id: string }[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [sortOptions, setSortOptions] = useState(Options);
  const [sortBy, setSortBy] = useState("Sắp xếp theo");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectTitle, setSelectTitle] = useState<string>("");

  const [offset, setOffset] = useState(8);
  const [pageSize] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (categoryId || subcategoryId) {
      handleClearListFilters();
      setSortBy("Sắp xếp theo");
      setSortOptions(Options);
      setOffset(8);
      setHasMore(true);
      window.scrollTo(0, 0);
    }
  }, [categoryId, subcategoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();

        // Các tham số cơ bản
        if (targetCustomerId)
          queryParams.append("TargetCustomerId", targetCustomerId.toString());
        if (categoryId) queryParams.append("CategoryId", categoryId.toString());
        if (subcategoryId)
          queryParams.append("SubcategoryId", subcategoryId.toString());

        // Các tham số tùy chọn
        if (colorId.length > 0)
          queryParams.append("ColorId", colorId.join(","));
        if (size.length > 0) queryParams.append("SizeId", size.join(","));
        if (price.length > 0) queryParams.append("Price", price.join(","));
        if (sortBy !== "Sắp xếp theo" && selectedOption)
          queryParams.append("SortBy", selectedOption);

        // Gọi API
        const response = await getAllProducts(queryParams); // Truyền URLSearchParams vào hàm API

        // Xử lý kết quả
        if (Array.isArray(response)) {
          setProducts(response);
        } else {
          console.error("Invalid product data:", response);
          setProducts([]); // Nếu dữ liệu không hợp lệ, trả về mảng rỗng
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Chỉ gọi API khi có ít nhất một trong các tham số quan trọng
    const hasValidParams =
      targetCustomerId ||
      categoryId ||
      subcategoryId ||
      colorId.length > 0 ||
      size.length > 0 ||
      price.length > 0 ||
      (sortBy !== "Sắp xếp theo" && selectedOption);

    if (hasValidParams) {
      fetchProducts();
    } else {
      setProducts([]); // Không gọi API nếu không có tham số
    }
  }, [
    targetCustomerId,
    categoryId,
    subcategoryId,
    colorId,
    size,
    price,
    sortBy,
    selectedOption,
  ]);

  useEffect(() => {
    const fetchMore = async () => {
      try {
        const queryParams = new URLSearchParams();

        // Các tham số cơ bản
        if (targetCustomerId)
          queryParams.append("TargetCustomerId", targetCustomerId.toString());
        if (categoryId) queryParams.append("CategoryId", categoryId.toString());
        if (subcategoryId)
          queryParams.append("SubcategoryId", subcategoryId.toString());

        // Các tham số tùy chọn
        if (colorId.length > 0)
          queryParams.append("ColorId", colorId.join(","));
        if (size.length > 0) queryParams.append("SizeId", size.join(","));
        if (price.length > 0) queryParams.append("Price", price.join(","));
        if (sortBy !== "Sắp xếp theo" && selectedOption)
          queryParams.append("SortBy", selectedOption);

        queryParams.append("Offset", offset.toString());
        queryParams.append("PageSize", pageSize.toString());

        // Gọi API
        const response = await getAllProducts(queryParams); // Truyền URLSearchParams vào hàm API

        // Xử lý kết quả
        if (Array.isArray(response)) {
          const newProducts = response;
          if (newProducts.length > 0) {
            setProducts((prev) => [...prev, ...newProducts]);
          } else setHasMore(false);
        } else {
          console.error("Invalid product data:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchMore();
    // Chỉ gọi API khi có ít nhất một trong các tham số quan trọng
  }, [offset]);

  const loadMore = () => {
    setOffset((prev) => prev + pageSize);
  };

  useEffect(() => {
    setProductCount(products.length);
  }, [products]);

  const handleSelectTitle = (name: string) => {
    setSelectTitle(name);
  };

  const handleSortSelect = (option: Option) => {
    setSortOptions((prevOptions) =>
      prevOptions.map((o) => {
        if (o.name === option.name) {
          if (selectedOption === option.value) {
            setSortBy("Sắp xếp theo");
            setSelectedOption(null);
            return { ...o, current: false };
          }
          setSortBy(o.name);
          setSelectedOption(o.value);
          return { ...o, current: true };
        }
        return { ...o, current: false };
      })
    );
  };

  const handleAddColorId = (newColorId: string) => {
    setColorId((prev) => {
      const updatedColorIds = [...prev, newColorId];
      return [...new Set(updatedColorIds)];
    });
  };

  const handleDeleteColorId = (newColorId: string) => {
    setColorId((prev: string[]) => prev.filter((id) => id !== newColorId));
  };

  const handleAddPrice = (newPrice: string) => {
    setPrice([newPrice]); // Only one price can be selected at a time
  };

  // const handleDeletePrice = () => {
  //   setSelectedFilters((prev) => [
  //     ...prev.filter((item) => item.id !== "Theo giá"), // Remove any existing price filter
  //     { id: "Theo giá" }, // Add the new price filter
  //   ]);
  // };

  const handleAddSize = (newSize: string) => {
    setSize((prev) => {
      const updateSize = [...prev, newSize];
      return [...new Set(updateSize)];
    });
  };

  const handleDeleteSize = (newSize: string) => {
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
    setPrice([]);
  };

  return (
    <div className="lg:w-[90%] mx-auto">
      <div className="pb-2 mt-16"></div>
      <Breadcrumbs
        targetId={targetCustomerId}
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        onTitleChange={handleSelectTitle}
      />
      <div className="bg-white">
        <div>
          <main className="">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-5">
              {selectTitle}
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
                      {sortOptions.map((option, index) => (
                        <MenuItem key={index}>
                          <div
                            onClick={() => handleSortSelect(option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-900",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-pointer"
                            )}
                          >
                            {option.name}
                          </div>
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
                <form className="hidden lg:block overflow-y-scroll h-[400px]">
                  {filters.map((section, index) => (
                    <Disclosure
                      defaultOpen
                      key={index}
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
                            <div key={optionIdx} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={section.id} // Same name for radio buttons to group them
                                type={
                                  section.id === "price" ? "radio" : "checkbox"
                                } // Use radio for price
                                checked={
                                  section.id === "price"
                                    ? price.includes(option.value)
                                    : selectedFilters.some(
                                        (item) => item.id === option.label
                                      )
                                }
                                onChange={(e) => {
                                  if (section.id === "price") {
                                    handleAddPrice(option.value); // Only one price selected
                                  } else if (e.target.checked) {
                                    handleAddItem(option.label);
                                    if (section.id === "color")
                                      handleAddColorId(option.value);
                                    else if (section.id === "size")
                                      handleAddSize(option.value);
                                  } else {
                                    handleDeleteItem(option.label);
                                    if (section.id === "color")
                                      handleDeleteColorId(option.value);
                                    else if (section.id === "size")
                                      handleDeleteSize(option.value);
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
                  {products.length > 0 && Array.isArray(products) ? (
                    <div className="my-5 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {products.map((product) => (
                        <Card key={product.productId} product={product} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center font-bold text-red-400 text-3xl">
                      Đã hết hàng
                    </p>
                  )}
                  {hasMore ? (
                    <div className="flex w-full justify-center pt-4">
                      <button
                        onClick={loadMore}
                        className="cursor-pointer w-2/6 rounded-xl border-2 border-slate-500 py-2.5 bg-while-500 hover:bg-gray-300 font-bold text-center"
                      >
                        Xem thêm
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

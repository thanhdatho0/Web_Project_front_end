import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "./SearchIcon.tsx";

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string | undefined;
}

interface Product {
  productId: number;
  name: string;
  subcategoryName: string;
  price: number;
  description: string;
  cost: number;
  discountPercentage: number;
  inStock: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  sizes: { sizeId: number; sizeValue: string }[];
  colors: {
    colorId: number;
    hexaCode: string;
    name: string;
    images: { imageId: number; url: string; alt: string }[];
  }[];
}

const Search = ({ handleChange, search }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5254/api/products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

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

  // Filter products by name whenever the search query changes
  useEffect(() => {
    if (search) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [search, products]);

  const handleProductClick = (product: Product) => {
    setIsSearchBoxFocused(false); // Hide the dropdown

    // Clear the search box by resetting the `search` state
    handleChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);

    // Add to search history
    setSearchHistory((prev) => [
      product.name,
      ...prev.filter((name) => name !== product.name),
    ]);

    // Navigate to the product page
    navigate(`/product/${slugify(product.name)}`, {
      state: { product },
    });

    // Scroll to top of the page
    window.scrollTo(0, 0);
  };

  const handleFocus = () => setIsSearchBoxFocused(true);

  const handleBlur = () => {
    setTimeout(() => {
      setIsSearchBoxFocused(false);
    }, 200); // Small delay to allow clicks on dropdown items
  };

  return (
    <div className="relative border-2 border-solid rounded-lg py-2">
      <div className="absolute pl-2 top-1/2 transform -translate-y-1/2">
        <SearchIcon />
      </div>
      <input
        value={search}
        onChange={(e) => handleChange(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        className="pl-9 border-none outline-none rounded-lg w-full text-base"
      />
      {(search || isSearchBoxFocused) && (
        <div
          className="absolute left-0 top-full mt-2 bg-white shadow-lg max-h-60 overflow-y-auto border border-gray-200 rounded-lg w-[300px] z-10"
          style={{ scrollbarWidth: "thin" }}
        >
          {search && filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.slice(0, 5).map((product) => (
                <li
                  key={product.productId}
                  className="p-3 border-b hover:bg-gray-100 cursor-pointer max-w-full text-lg flex items-center"
                  onClick={() => handleProductClick(product)}
                >
                  <strong className="block truncate text-l">
                    {product.name}
                  </strong>
                </li>
              ))}
            </ul>
          ) : isSearchBoxFocused && searchHistory.length > 0 ? (
            <>
              <h4 className="text-gray-700 p-4 text-lg">Lịch sử tìm kiếm</h4>
              <ul>
                {searchHistory.slice(0, 5).map((item, index) => {
                  const product = products.find(
                    (product) => product.name === item
                  ); // Find the product by name
                  return product ? (
                    <li
                      key={index}
                      className="p-4 border-b hover:bg-gray-100 cursor-pointer text-lg"
                      onClick={() => handleProductClick(product)} // Pass full product object
                    >
                      <strong className="block truncate">{item}</strong>
                    </li>
                  ) : null;
                })}
              </ul>
            </>
          ) : (
            search && (
              <p className="text-gray-500 p-4 text-lg">
                Không tìm thấy sản phẩm
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

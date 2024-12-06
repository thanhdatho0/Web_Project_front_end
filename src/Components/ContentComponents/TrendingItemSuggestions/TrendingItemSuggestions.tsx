import { useEffect, useState } from "react";
import { Product } from "../../../Interface";
import { getAllProducts } from "../../../api";
import Card from "../Card/Card";

const TrendingItemSuggestions = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // const [subcategories, setSubcategories] = useState<Subcategory[]>([]); // Store subcategories

  // const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number>(1); // Store selected subcategory
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await SubcategoryList();
  //       if (typeof response === "string") {
  //         // Handle API returning a string error
  //         setError(response);
  //       } else {
  //         // Store categories in state
  //         setSubcategories(response);
  //       }
  //     } catch (e) {
  //       console.error("Unexpected error while fetching Subcategory", error);
  //       setError("An unexpected error occurred.");
  //     }
  //   };
  //   fetchProduct();
  // }, []);

  // const handleSubcategoryClick = async (subcategoryId: number) => {
  //   setSelectedSubcategoryId(subcategoryId); // Update selected subcategory
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("PageSize", "8");
        queryParams.append("SortBy", "trend");

        const response = await getAllProducts(queryParams);

        if (Array.isArray(response)) {
          setProducts(response);
        } else {
          console.error("Invalid product data:", response);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) <div>Loading............</div>;

  return (
    <div className="lg:col-span-3 gap-6">
      {products.length > 0 && Array.isArray(products) ? (
        <div className="my-5 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center font-bold text-red-400 text-3xl">
          Chưa có sản phẩm bán chạy
        </p>
      )}
    </div>
  );
};

export default TrendingItemSuggestions;

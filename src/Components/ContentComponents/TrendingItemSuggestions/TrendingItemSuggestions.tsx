import React, { useEffect, useState } from "react";
import { Category, Product } from "../../../Interface";
import { CategoryList, ProductList } from "../../../api";
import CardList from "../CardList/CardList";

const TrendingItemSuggestions: React.FC = (): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]); // Store categories
  const [products, setProducts] = useState<Product[]>([]); // Store products
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1); // Store selected category
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await CategoryList();
        if (typeof response === "string") {
          // Handle API returning a string error
          setError(response);
        } else {
          // Store categories in state
          setCategories(response);
        }
      } catch (e) {
        console.error("Unexpected error while fetching products", error);
        setError("An unexpected error occurred.");
      }
    };
    fetchProduct();
  }, []);
  const handleCategoryClick = async (categoryId: number) => {
    setSelectedCategoryId(categoryId); // Update selected category
    try {
      const productData = await ProductList(categoryId); // Fetch products for the clicked category
      if (typeof productData === "string") {
        setError(productData); // Handle error message
      } else {
        setProducts(productData); // Set products for the selected category
        console.log(categoryId);
      }
    } catch (e) {
      setError("Failed to fetch products.");
    }
  };
  return (
    <>
      <div className="m-1 flex w-full items-center justify-start space-x-4 font-sans xl:justify-center">
        {Array.isArray(categories) ? (
          categories.map((category) => (
            <div
              key={category.categoryId} // Ensure each item has a unique key
              className="cursor-pointer rounded-3xl bg-stone-100 px-7 py-2 text-xl text-slate-400"
              onClick={() => handleCategoryClick(category.categoryId)}
            >
              {category.name}
            </div>
          ))
        ) : (
          <div>{error || "No categories available at the moment."}</div>
        )}
      </div>
      <CardList categoryId={selectedCategoryId} />
    </>
  );
};

export default TrendingItemSuggestions;

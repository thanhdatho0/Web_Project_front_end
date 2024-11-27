import React, { useEffect, useState } from "react";
import { Subcategory } from "../../../Interface";
import { SubcategoryList } from "../../../api";
import CardList from "../CardList/CardList";

const TrendingItemSuggestions: React.FC = (): JSX.Element => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]); // Store subcategories
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number>(1); // Store selected subcategory
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await SubcategoryList();
        if (typeof response === "string") {
          // Handle API returning a string error
          setError(response);
        } else {
          // Store categories in state
          setSubcategories(response);
        }
      } catch (e) {
        console.error("Unexpected error while fetching products", error);
        setError("An unexpected error occurred.");
      }
    };
    fetchProduct();
  }, []);
  const handleSubcategoryClick = async (subcategoryId: number) => {
    setSelectedSubcategoryId(subcategoryId); // Update selected category
  };
  return (
    <>
      <div className="m-1 flex w-full items-center justify-start space-x-4 font-sans xl:justify-center">
        {Array.isArray(subcategories) ? (
          subcategories.map((subcategory) => (
            <div
              key={subcategory.subcategoryId} // Ensure each item has a unique key
              className="cursor-pointer rounded-3xl bg-stone-100 px-7 py-2 text-xl text-slate-400"
              onClick={() => handleSubcategoryClick(subcategory.subcategoryId)}
            >
              {subcategory.subcategoryName}
            </div>
          ))
        ) : (
          <div>{error || "No subcategories available at the moment."}</div>
        )}
      </div>
      <CardList subcategoryId={selectedSubcategoryId} />
    </>
  );
};

export default TrendingItemSuggestions;

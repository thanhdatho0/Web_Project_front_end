import { useEffect, useState } from "react";
import Breadcrumbs from "../../Components/ContentComponents/Breadcrumb/Breadcrumbs";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCatalog from "../../Components/ContentComponents/ProductCatalog/ProductCatalog";

const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [cateloryLocation, setCateloryLocation] = useState("");

  const location = useLocation();
  const { categoryId } = location.state || {};
  const handleAddCategoryName = (categoryName: string) => {
    setCategoryName(categoryName);
  };

  const handleAddCategoryLocation = (category: string) => {
    setCateloryLocation(category);
  };

  useEffect(() => {
    if (!categoryId) {
      console.error("Category ID is missing");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/api/products?CategoryId=${categoryId}&PageNumber=1&PageSize=10`
        );
        console.log(categoryId);
        if (Array.isArray(response.data)) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="lg:w-[85%] mx-auto">
      <div className="pb-2 mt-16"></div>
      <Breadcrumbs
        onAddCategoryName={handleAddCategoryName}
        onAddCategoryLocation={handleAddCategoryLocation}
      />
      <ProductCatalog
        categoryName={categoryName}
        categoryLocation={cateloryLocation}
        categoryId={categoryId}
      />
    </div>
  );
};
export default CategoryPage;

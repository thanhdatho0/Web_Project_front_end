import { useState } from "react";
import ProductCatalog from "../../Components/ContentComponents/ProductCatalog/ProductCatalog";
import Breadcrumbs from "../../Components/ContentComponents/Breadcrumb/Breadcrumbs";

// interface Props {
//   category: string;
//   product: string;
// }
const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [cateloryLocation, setCateloryLocation] = useState("");

  const handleAddCategoryName = (categoryName: string) => {
    setCategoryName(categoryName);
  };

  const handleAddCategoryLocation = (category: string) => {
    setCateloryLocation(category);
  };
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
      />
    </div>
  );
};

export default CategoryPage;

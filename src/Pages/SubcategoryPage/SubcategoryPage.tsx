// import { useEffect, useState } from "react";
// import Breadcrumbs from "../../Components/ContentComponents/Breadcrumb/Breadcrumbs";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import ProductCatalog from "../../Components/ContentComponents/ProductCatalog/ProductCatalog";

// const SubCategoryPage = () => {
//   const [subcategoryName, setSubcategoryName] = useState("");

//   const location = useLocation();
//   const { subcategoryId } = location.state || {};
//   // const handleAddSubcategoryName = (subcategoryName: string) => {
//   //   setSubcategoryName(subcategoryName);
//   // };

//   useEffect(() => {
//     if (!subcategoryId) {
//       console.error("Subcategory ID is missing");
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `/api/products?SubcategoryId=${subcategoryId}`
//         );
//         if (Array.isArray(response.data)) {
//           console.log(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [subcategoryId]);

//   return (
//     <div className="lg:w-[85%] mx-auto">
//       <div className="pb-2 mt-16"></div>
//       {/* <Breadcrumbs
//         onAddSubcategoryName={handleAddSubcategoryName}
//         subcategoryId={subcategoryId}
//       /> */}
//       <ProductCatalog
//         subcategoryName={subcategoryName}
//         subcategoryId={subcategoryId}
//       />
//     </div>
//   );
// };
// export default SubCategoryPage;

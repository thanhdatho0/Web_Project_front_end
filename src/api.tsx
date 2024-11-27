import axios from "axios";
import { Product, Subcategory } from "./Interface";

const BASE_URL = "http://localhost:5254/api";

export const ProductList = async (subcategoryId: number) => {
  try {
    const response = await axios.get<Product[]>(
      `${BASE_URL}/products?SubcategoryId=${subcategoryId}`
    );
    // Giả sử response.data chứa mảng các sản phẩm
    return response.data; // Trả về mảng sản phẩm
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error Message", error.message);
      return error.message; // Trả về chuỗi lỗi
    } else {
      console.log("Unexpected Error", error);
      return "Unexpected Error"; // Trả về chuỗi lỗi nếu không phải lỗi Axios
    }
  }
};

export const SubcategoryList = async () => {
  try {
    const response = await axios.get<Subcategory[]>(
      `${BASE_URL}/subcategories`
    );
    // Giả sử response.data chứa mảng các sản phẩm
    return response.data; // Trả về mảng sản phẩm
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error Message", error.message);
      return error.message; // Trả về chuỗi lỗi
    } else {
      console.log("Unexpected Error", error);
      return "Unexpected Error"; // Trả về chuỗi lỗi nếu không phải lỗi Axios
    }
  }
};

// export const CategoryTitleList = async (): Promise => {
//   try {
//     const response = await axios.get<CategoryResponse>(
//       `${BASE_URL}/categories`
//     );
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("Error Message", error.message);
//       return error.message;
//     } else {
//       console.log("Unexpected Error", error);
//       return "Unexpected Error";
//     }
//   }
// };

// export const ColorList = async (id: number) => {
//   try {
//     const response = await axios.get<Product>(
//       `http://localhost:5254/api/products/${id}`
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("Error Message", error.message);
//       return error.message; // Trả về chuỗi lỗi
//     } else {
//       console.log("Unexpected Error", error);
//       return "Unexpected Error"; // Trả về chuỗi lỗi nếu không phải lỗi Axios
//     }
//   }
// };

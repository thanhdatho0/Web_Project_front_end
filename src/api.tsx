// import { Product } from "./Product";
import { NavBarCategoryTitle } from "./Category";
import axios from "axios";
import { Product } from "./Interface";

interface ProductListResponse {
  data: Product[];
}

interface CategoryResponse {
  data: NavBarCategoryTitle[];
}

// interface CategorypResponse {
//   categoryId: number;
//   name: string;
//   description: string;
//   products: Product[];
// }

export const ProductList = async () => {
  try {
    const response = await axios.get<Product[]>(
      // "http://localhost:5254/api/products"
      `http://localhost:5254/api/products?CategoryId=${1}`
    );
    // Giả sử response.data chứa mảng các sản phẩm
    console.log(response.data);
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

export const CategoryTitleList = async () => {
  try {
    return await axios.get<CategoryResponse>(
      "http://localhost:5254/api/categories"
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error Message", error.message);
      return error.message;
    } else {
      console.log("Unexpected Error", error);
      return "Unexpected Error";
    }
  }
};

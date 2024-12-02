import axios from "axios";
import { Product, Subcategory, TargerCustomer } from "./Interface";

const BASE_URL = "http://localhost:5254/api";

export const ProductList = async (
  subcategoryId: number,
  colorId?: number,
  sizeId?: number
) => {
  try {
    const queryParams = new URLSearchParams();
    if (subcategoryId !== undefined)
      queryParams.append("SubcategoryId", subcategoryId.toString());
    if (colorId !== undefined)
      queryParams.append("ColorId", colorId.toString());
    if (sizeId !== undefined) queryParams.append("SizeId", sizeId.toString());
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

export const targerCustomer = async (): Promise<TargerCustomer[] | string> => {
  // trả về một mảng Category hoặc một chuỗi lỗi
  try {
    const response = await axios.get<TargerCustomer[]>(
      `${BASE_URL}/targetcustomers`
    );
    return response.data; // chỉ trả về dữ liệu trong response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error Message", error.message);
      return error.message; // trả về thông báo lỗi khi có lỗi từ axios
    } else {
      console.log("Unexpected Error", error);
      return "Unexpected Error"; // trả về lỗi không xác định
    }
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
    return response.data;
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

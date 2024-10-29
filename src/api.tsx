import {Product} from "./Product";
import {NavBarCategoryTitle} from "./Category"
import axios from "axios";

interface ProductListResponse {
    data: Product[];
}

interface CategoryResponse {
    data: NavBarCategoryTitle[];
}

export const ProductList = async () =>{
    try{
        return await axios.get<ProductListResponse>("http://localhost:5254/api/categories");
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Error Message", error.message);
            return error.message;
        }
        else{
            console.log("Unexpected Error", error);
            return "Unexpected Error";
        }
    }
}

export const CategoryTitleList = async () =>{
    try{
        return await axios.get<CategoryResponse>("http://localhost:5254/api/categories");
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Error Message", error.message);
            return error.message;
        }
        else{
            console.log("Unexpected Error", error);
            return "Unexpected Error";
        }
    }
}
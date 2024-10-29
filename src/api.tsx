import {Product} from "./Product";
import axios from "axios";

interface ProductListResponse {
    data: Product[];
}

export const ProductList = async () =>{
    try{
        return await axios.get<ProductListResponse>("https://fakestoreapi.com/products");
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
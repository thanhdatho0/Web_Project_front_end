import './App.css'
import ProductCardList from "./Components/ProductCardList/ProductCardList.tsx";
import {useState} from "react";
import {Product} from "./Product";
import {ProductList} from "./api.tsx";

function App() {
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Product[]>([]);

    const getAllProducts = async () => {
        const result = await ProductList();
        if(typeof result === "string"){
            setError(result);
            console.log("Error Message", error);
        }else if(Array.isArray(result.data)){
            setData(result.data);
        }
    }
    getAllProducts();
  return (
    <>
      <ProductCardList ListData={data}/>
    </>
  )
}

export default App

import ProductCard from "../ProductCard/ProductCard.tsx";
import {Product} from "../../Product";

interface ProductCardListProps {
    ListData: Product[];
}

const ProductCardList = ({ListData}: ProductCardListProps) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 w-[80%] mx-auto">
            {ListData ? (
                ListData.map((product: Product) => <ProductCard title={product.title} price={product.price} description={product.description} img={product.image}/>)
            ):(
                <h1>404 NOT FOUND</h1>
            )}
        </div>
    );
};

export default ProductCardList;
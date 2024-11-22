import { useEffect, useState } from "react";
import { Product } from "../../Interface";
import ProductCard from "../ProductCard/ProductCard.tsx";
import { ProductList } from "../../api.tsx";
// import {Product} from "../../Product";

// interface ProductCardListProps {
//     ListData: Product[];
// }

// const ProductCardList = ({ListData}: ProductCardListProps) => {
const ProductCardList: React.FC = (): JSX.Element => {
  const [products, setProducts] = useState<Product[] | string>([]); // Lưu trữ danh sách sản phẩm
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductList();
        if (typeof response === "string") {
          // Xử lý lỗi trả về nếu response là chuỗi lỗi
          setError(response);
        } else {
          // Gán dữ liệu sản phẩm vào state
          setProducts(response);
        }
      } catch (e) {
        console.error("Unexpected error while fetching products", error);
        setError("An unexpected error occurred.");
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
      {Array.isArray(products) ? (
        products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))
      ) : (
        <h1>{error ? error : "404 NOT FOUND"}</h1>
      )}
    </div>
  );
};

export default ProductCardList;

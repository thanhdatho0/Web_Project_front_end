import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { ProductList } from "../../../api";
import { Color, Product, Size } from "../../../Interface";

const CardList: React.FC = (): JSX.Element => {
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
    <div className="my-5 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.isArray(products) ? (
        products.map((product) => (
          <Card key={product.productId} product={product} />
        ))
      ) : (
        <div>{error ? error : "No products found"}</div> // Hiển thị lỗi nếu có
      )}
    </div>
  );
};

export default CardList;

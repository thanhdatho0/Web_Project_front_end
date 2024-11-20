import { useEffect, useState } from "react";
import Card from "../Card/Card";

interface Product {
  productId: number;
  name: string;
  price: number;
  navigate: string;
}

const CardList: React.FC = (): JSX.Element => {
  const URL = "http://localhost:5254/api/products";
  const [products, setProducts] = useState<Product[]>([]); // Lưu trữ danh sách sản phẩm

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(URL);
        const data = await result.json();
        setProducts(data); // Lưu danh sách sản phẩm từ API vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [URL]);

  return (
    <div className="my-5 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Card key={product.productId} product={product} />
      ))}
    </div>
  );
};

export default CardList;

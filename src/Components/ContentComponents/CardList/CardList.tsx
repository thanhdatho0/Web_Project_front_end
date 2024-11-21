import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { ProductList } from "../../../api";
import { Product } from "../../../Interface";

interface Props {
  categoryId: number;
}

const CardList: React.FC<Props> = ({ categoryId }: Props): JSX.Element => {
  const [products, setProducts] = useState<Product[] | string>([]); // Store products or error message
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await ProductList(categoryId);
        if (typeof response === "string") {
          // Handle error if response is a string
          setError(response);
        } else {
          // Set products if the response is valid
          setProducts(response);
        }
      } catch (e) {
        console.error("Unexpected error while fetching products", e); // Log the actual error
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct();
  }, [categoryId]); // Re-fetch when categoryId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="my-5 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.isArray(products) ? (
        products.map((product) => (
          <Card key={product.productId} product={product} />
        ))
      ) : (
        <div>{error ? error : "No products found"}</div> // Display error or no products message
      )}
    </div>
  );
};

export default CardList;

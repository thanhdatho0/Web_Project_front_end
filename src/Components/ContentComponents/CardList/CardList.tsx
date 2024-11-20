import Card from "../Card/Card";

interface Props {}

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
  interface Product {
    id: number;
    name: string;
    price: number;
    navigate: string;
  }
  const product1: Product = {
    id: 1,
    name: "Sample Product",
    price: 100,
    navigate: "/sample",
  };
  return (
    <div className="my-5 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {<Card product={product1} />}
    </div>
  );
};

export default CardList;

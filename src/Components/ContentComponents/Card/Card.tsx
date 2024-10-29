import React from "react";
import ColorCard from "../ColorCard/ColorCard";
import { Link } from "react-router-dom";

interface Props {}

const Card: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <Link to="#">
      <div className="relative overflow-hidden">
        <img
          alt=""
          className="w-full object-cover"
          src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/smm4073-den-5-c0028085-1e0a-4909-8a9a-254b104651d7.jpg"
        />
      </div>
      <div className="pt-2 text-sm">
        <div>Áo sơ mi trắng</div>
        <div className="pt-2 text-base font-semibold tracking-wider">
          500.000 đ
        </div>
      </div>
      <ColorCard />
    </Link>
  );
};
export default Card;

import { Link } from "react-router-dom";
import ImageLinkPair from "../ImageLinkPair/ImageLinkPair";
import ItemSuggestions from "../ItemSuggestions/ItemSuggestions";
import TrendingItemSuggestions from "../TrendingItemSuggestions/TrendingItemSuggestions";

const Content = () => {
  return (
    <div className="relative m-auto w-full overflow-hidden pb-6 pt-6">
      <h2 className="my-4 flex h-12 justify-center text-4xl font-medium">
        Sản phẩm ưa chuộng
      </h2>
      <TrendingItemSuggestions />
      <div className="flex w-full justify-center pt-4">
        <Link
          to="/collection"
          className="w-1/5 rounded-xl border-2 border-slate-500 py-2.5 bg-while-500 hover:bg-gray-300 font-bold text-center"
        >
          Xem thêm
        </Link>
      </div>
      <div className="pt-7">
        <img
          src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/collections/Collection%20List%20Banner_Website_1800x600.jpg"
          alt="A couple wearing orange jackets standing in a field of tall grass"
        />
      </div>

      <ItemSuggestions />

      <div>
        <ImageLinkPair />
      </div>
    </div>
  );
};

export default Content;

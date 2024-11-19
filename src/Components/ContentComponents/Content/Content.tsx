import { Link } from "react-router-dom";
import CardList from "../CardList/CardList";
import ImageLinkPair from "../ImageLinkPair/ImageLinkPair";
import ItemSuggestions from "../ItemSuggestions/ItemSuggestions";
import tabTitles from "./TabSectionData.json";

const Content = () => {
  return (
    <div className="relative m-auto w-full overflow-hidden pb-6 pt-6">
      <h2 className="my-4 flex h-12 justify-center text-4xl font-medium">
        Sản phẩm ưa chuộng
      </h2>
      <div className="m-1 flex w-full items-center justify-start space-x-4 font-sans xl:justify-center">
        {tabTitles.map((title) => (
          <div
            id={title.id}
            className="cursor-pointer rounded-3xl bg-stone-100 px-7 py-2 text-xl text-slate-400"
          >
            {title.title}
          </div>
        ))}
      </div>
      <div>
        <CardList />
      </div>
      <div className="flex w-full justify-center pt-4">
        <Link
          to="/Cart"
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
      <div className="flex w-full justify-center pt-4">
        <h2 className="mr-3 flex h-12 justify-center text-3xl pt-1 bg-gradient-to-r from-yellow-900 to-yellow-500 text-transparent bg-clip-text">
          Gợi ý sản phẩm
        </h2>
        <ItemSuggestions />
      </div>
      <div>
        <CardList />
        <CardList />
        đưa ra các products mới nhất
      </div>
      <div>
        <ImageLinkPair />
      </div>
    </div>
  );
};

export default Content;

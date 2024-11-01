import CardList from "../CardList/CardList";
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
        <button className="w-1/5 rounded-xl border-2 border-slate-500 py-2.5 bg-while-500 hover:bg-gray-300 font-bold">
          Xem thêm
        </button>
      </div>
      <div className="pt-7">
        <img
          src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/collections/Collection%20List%20Banner_Website_1800x600.jpg"
          alt="A couple wearing orange jackets standing in a field of tall grass"
        />
      </div>
      <div className="flex w-full justify-center pt-4">
        <h2 className="mr-3 flex h-12 justify-center text-3xl pt-1 bg-gradient-to-r from-yellow-900 to-transparent text-transparent bg-clip-text">
          Gợi ý sản phẩm
        </h2>
        <ItemSuggestions />
      </div>
      <div>
        <CardList />
        <CardList />
      </div>
      <div className="flex w-full justify-center pt-4">
        <button className="w-1/5 rounded-xl border-2 border-slate-500 py-2.5 bg-while-500 hover:bg-gray-300 font-bold">
          Xem thêm
        </button>
      </div>
      <div className="pt-7 flex">
        <img
          className="w-1/2 mr-2"
          src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/YODY%20x%20Wintel_893x598.jpg"
          alt="A couple wearing orange jackets standing in a field of tall grass"
        />
        <img
          className="w-1/2 ml-2"
          src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/YODY_XANH%20SM_893x598.jpg"
          alt="A couple wearing orange jackets standing in a field of tall grass"
        />
      </div>
      <div className="pt-4 flex">
        <img
          className="w-1/2 mr-2"
          src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/Frame%2032%201.jpg"
          alt="A couple wearing orange jackets standing in a field of tall grass"
        />
        <img
          className="w-1/2 ml-2"
          src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/Frame%2031%201.jpg"
          alt="A couple wearing orange jackets standing in a field of tall grass"
        />
      </div>
      <div className="pt-7">
        <h1 className="bg-black text-5xl text-white w-full font-bold py-4 text-center">
          #Yody tự hào thương hiệu việt
        </h1>
      </div>
    </div>
  );
};

export default Content;

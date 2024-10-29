import CardList from "../CardList/CardList";
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
        <button className="w-2/5 rounded-xl border-2 border-slate-500 py-2.5 hover:bg-slate-100">
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default Content;

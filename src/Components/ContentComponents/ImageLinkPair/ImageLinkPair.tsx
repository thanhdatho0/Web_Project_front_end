import { Link } from "react-router-dom";

const ImageLinkPair = () => {
  return (
    <div>
      <div className="flex w-full justify-center pt-4">
        <Link
          to="/Cart"
          className="w-1/5 rounded-xl border-2 border-slate-500 py-2.5 bg-while-500 hover:bg-gray-300 font-bold text-center"
        >
          Xem thêm
        </Link>
      </div>
      <div className="pt-7 flex">
        <a href="" className="w-1/2 mr-2">
          <img
            src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/YODY%20x%20Wintel_893x598.jpg"
            alt="A couple wearing orange jackets standing in a field of tall grass"
          />
        </a>

        <a href="" className="w-1/2 ml-2">
          <img
            src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/YODY_XANH%20SM_893x598.jpg"
            alt="A couple wearing orange jackets standing in a field of tall grass"
          />
        </a>
      </div>
      <div className="pt-4 flex">
        <a href="" className="w-1/2 mr-2">
          <img
            src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/Frame%2032%201.jpg"
            alt="A couple wearing orange jackets standing in a field of tall grass"
          />
        </a>

        <a href="" className="w-1/2 ml-2">
          <img
            src="https://m.yodycdn.com/fit-in/filters:format(webp)//products/Frame%2031%201.jpg"
            alt="A couple wearing orange jackets standing in a field of tall grass"
          />
        </a>
      </div>
      <div className="pt-5">
        <h1 className="bg-black text-5xl text-white w-full font-bold py-4 text-center">
          #Yody tự hào thương hiệu việt
        </h1>
      </div>
      <div className="flex">
        <div className="w-1/2 mr-2">
          <a href="">
            <img
              className="mb-3"
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-top-10-thuong-hieu-thoi-trang.jpg"
              alt="A couple wearing orange jackets standing in a field of tall grass"
            />
            <div className="text-2xl font-bold mb-2">
              YODY lọt Top 10 thương hiệu thời trang lớn nhất tại...
            </div>
            <span>
              YODY được website Campaign Asia-Pacific vinh danh là Thương Hiệu
              Thời Trang thuộc Top 7 Đông Nam Á & Top 10 Việt Nam.{" "}
            </span>
          </a>
        </div>

        <div className="w-1/2 ml-2">
          <a href="">
            <img
              className="mb-3"
              src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/280.jpeg"
              alt="A couple wearing orange jackets standing in a field of tall grass"
            />
            <div className="text-2xl font-bold mb-2">
              Cán Mốc 280 Cửa Hàng - YODY Chinh Phục Mọi Miền...
            </div>
            <span>
              Thương hiệu thời trang Việt Nam YODY vừa ghi dấu ấn mới trong hành
              trình phát triển của mình khi chính thức cán mốc 280 cửa hàng trên
              toàn quốc.
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkPair;

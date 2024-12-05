import { useEffect } from "react";

const CollectionPage = () => {
  useEffect(() => {
    // Scroll to the top after component renders
    window.scrollTo(0, 0);
  }, []); // Chạy chỉ khi component mount lần đầu

  return (
    <div className="lg:w-[90%] mx-auto">
      <div className="pb-2 mt-16"></div>
      <img
        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/collections/BANNER%20COLLECTION%201800X600px.png"
        alt=""
      />
    </div>
  );
};
export default CollectionPage;

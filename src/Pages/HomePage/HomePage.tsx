import Content from "../../Components/ContentComponents/Content/Content.tsx";
import Slider from "../../Components/Slider/Slider.tsx";

const HomePage = () => {
  return (
    <div className="lg:w-[85%] mx-auto">
      <Slider />
      <Content />
    </div>
  );
};

export default HomePage;

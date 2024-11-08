import Content from "../../Components/ContentComponents/Content/Content.tsx";
import Slider from "../../Components/Slider/Slider.tsx";

const HomePage = () => {
  return (
    <section>
      <div className="lg:w-[85%] mx-auto">
        <Slider />
        <Content />
      </div>
    </section>
  );
};

export default HomePage;

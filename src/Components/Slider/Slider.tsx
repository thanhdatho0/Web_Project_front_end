import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";

const slides = [
  {
    imgSrc:
      "https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m1acnkuz77djwysa293c%C3%B3%20cta%201800x833.png",
    altText:
      "A couple wearing orange jackets standing in a field of tall grass",
  },
  {
    imgSrc:
      "https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m24c2t93d0ibdynbinmngay-cua-nang-ngan-uu-dai-1800x833.jpg",
    altText:
      "A couple wearing orange jackets standing in a field of tall grass",
  },
  {
    imgSrc:
      "https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m1ra3e0i7won6u05a1qJ%201800x833.jpg",
    altText:
      "A couple wearing orange jackets standing in a field of tall grass",
  },
  {
    imgSrc:
      "https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/m1h5t6esl6r65pev2xp1800x833%20bst%20thu%20dong%20pc.png",
    altText:
      "A couple wearing orange jackets standing in a field of tall grass",
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCarousel = (index: number) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    updateCarousel(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    updateCarousel(newIndex);
  };

  useEffect(() => {
    const autoSlide = () => {
      const newIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
      updateCarousel(newIndex);
    };

    const interval = setInterval(autoSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative m-auto w-full overflow-hidden pb-6 pt-6 mt-16">
      <div
        className="carousel flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full flex-shrink-0">
            <img
              alt={slide.altText}
              className="object-fill"
              src={slide.imgSrc}
            />
          </div>
        ))}
      </div>
      <div className="absolute left-0 top-1/2 ml-6 -translate-y-1/2 transform">
        <button
          className="h-10 w-10 rounded-full bg-white hover:bg-gray-200"
          onClick={prevSlide}
        >
          <Icon
            icon="bxs:left-arrow"
            style={{ color: "black" }}
            className="m-auto text-center"
          />
        </button>
      </div>
      <div className="absolute right-0 top-1/2 mr-6 -translate-y-1/2 transform">
        <button
          className="h-10 w-10 rounded-full bg-white hover:bg-gray-200"
          onClick={nextSlide}
        >
          <Icon
            icon="bxs:right-arrow"
            style={{ color: "black" }}
            className="m-auto text-center"
          />
        </button>
      </div>
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full bg-white ${
              currentIndex === index ? "" : "opacity-50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

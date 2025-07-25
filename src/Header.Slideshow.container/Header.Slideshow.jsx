import React, { useState } from "react";
import "./Header.Slideshow.css";

const SlidingWindow = ({ items, windowSize = 3}) => {
  const [index, setIndex] = useState(0);

  const maxIndex = items.length - windowSize;

  const nextSlide = () => {
    if (index < maxIndex) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(maxIndex);
    }
  };

  return (
    <div className="slider-container">
      <button onClick={prevSlide} className="slider-btn">
        ◀
      </button>

      <div className="slider-window">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${index * (100 / windowSize)}%)` }}
        >
          {items.map((item, i) => (
            <div className="slider-item" key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="slider-btn"
      >
        ▶
      </button>
    </div>
  );
};

export default SlidingWindow;

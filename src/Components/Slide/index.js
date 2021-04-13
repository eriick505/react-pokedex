import React from 'react';
import { slideContainer, content, slideControl } from './Slide.module.css';
import Chevron from '../Svg/Chevron';

function Slide(props) {
  const { children, itens } = props;
  const [slideActive, setSlideActive] = React.useState(0);
  const [positionSlide, setPositionSlide] = React.useState(0);
  const contentRef = React.useRef();

  function slidePrev() {
    const isActiveGreaterThanZero = slideActive > 0;

    if (isActiveGreaterThanZero) setSlideActive(slideActive - 1);
  }

  function slideNext() {
    if (itens.length) {
      const isActiveMinorThanTotalItems = slideActive < itens.length - 2;

      if (isActiveMinorThanTotalItems) setSlideActive(slideActive + 1);
    }
  }

  React.useEffect(() => {
    if (contentRef.current) {
      const { width } = contentRef.current.getBoundingClientRect();
      setPositionSlide(-(width * slideActive));
    }
  }, [slideActive]);

  return (
    <div className={slideContainer}>
      <div
        ref={contentRef}
        className={content}
        style={{ transform: `translateX(${positionSlide}px)` }}
      >
        {children}
      </div>
      <nav className={slideControl}>
        <button onClick={slidePrev}>
          <Chevron width={20} height={20} left={true} />
        </button>
        <button onClick={slideNext}>
          <Chevron width={20} height={20} />
        </button>
      </nav>
    </div>
  );
}

export default Slide;

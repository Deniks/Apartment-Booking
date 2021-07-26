import React, { useState, useEffect } from 'react';

import Slide from './Slide';

import './style.css';

const s = {
  container: 'fullW fullH rel overflowH',
  onScreen: 'left0',
  offScreenRight: 'left100vw',
  offScreenLeft: 'leftM100vw',
};

export const Slider = ({ images }) => {
  const [slide1, setSlide1] = useState({
    id: 0,
    position: s.onScreen,
  });
  const [slide2, setSlide2] = useState({
    id: 1,
    position: s.offScreenRight,
  });
  const [currentId, setCurrentId] = useState(0);

  const setSlideState = (slide1, slide2, currentId) => {
    setSlide1(slide1);
    setSlide2(slide2);
    setCurrentId(currentId);
  };

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      transitionSlides();
    }, 4000);

    const resetSlideTransitions = (slide1, slide2, currentId) => {
      setTimeout(() => {
        setSlideState(slide1, slide2, currentId);
      }, 500);
    };
    function transitionSlides() {
      let currentId;
      if (slide1['position'] === s.onScreen) {
        slide1['position'] = s.offScreenLeft;
        slide2['position'] = s.onScreen;
        currentId = slide2.id;
      } else {
        slide1['position'] = s.onScreen;
        slide2['position'] = s.offScreenLeft;
        currentId = slide1.id;
      }
      setSlideState(slide1, slide2, currentId);
      setTimeout(() => {
        resetSlideOffScreen();
      }, 1000);
    }

    function resetSlideOffScreen() {
      if (slide1['position'] === s.offScreenLeft) {
        slide1['position'] = s.offScreenRight;
        slide1['id'] = slide2.id + 1 === images.length ? 0 : slide2.id + 1;
      } else {
        slide2['position'] = s.offScreenRight;
        slide2['id'] = slide1.id + 1 === images.length ? 0 : slide1.id + 1;
      }
      setSlideState(slide1, slide2, currentId);
      resetSlideTransitions(slide1, slide2, currentId);
    }
    return () => {
      clearInterval(carouselInterval);
    };
  }, [currentId, images.length, slide1, slide2]);

  return (
    <div id="slider">
      <Slide image={images[slide1.id]} position={slide1.position} />
      <Slide image={images[slide2.id]} position={slide2.position} />
    </div>
  );
};

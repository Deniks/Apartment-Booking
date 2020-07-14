import React from 'react';

import autoPlay from 'react-swipeable-views-utils/lib/autoPlay';
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import SwipeableViews from 'react-swipeable-views';

const modulo = (a, n) => ((a % n) + n) % n;

const VirtualizeSwipeViews = virtualize(SwipeableViews);
const VirtualizeAutoPlaySwipeViews = autoPlay(VirtualizeSwipeViews);

const carouselSlideRenderer = (children) => ({ index, key }) => {
  return React.cloneElement(children[modulo(index, children.length)], { key });
};

export const Carousel = ({ children, autoplay, ...other }) => {
  const slideRenderer = carouselSlideRenderer(children);
  return autoplay ? (
    <VirtualizeAutoPlaySwipeViews {...other} slideRenderer={slideRenderer} />
  ) : (
    <VirtualizeSwipeViews {...other} slideRenderer={slideRenderer} />
  );
};

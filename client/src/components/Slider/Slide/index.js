import React, { memo } from 'react';

const s = {
  container: 'abs fullW fullH',
  slideImage: 'fullH fullW imgCover',
  transition: 'transition1l',
};

const Slide = ({ position, image }) => {
  return (
    <div className={`${s.container}  ${position} ${s.transition}`}>
      <img src={image} className={s.slideImage} alt="slide" />
    </div>
  );
};

export default memo(Slide);

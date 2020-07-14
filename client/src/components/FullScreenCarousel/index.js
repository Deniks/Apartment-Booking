import React, { useState } from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import Image from 'material-ui-image';
import CloseIcon from '@material-ui/icons/Close';

export const FullScreenCarousel = ({
  images,
  isMobile,
  triggered,
  setTrigger,
}) => {
  const xs = useMediaQuery('xs');
  const handleModal = () => {
    setTrigger(!triggered);
  };
  return (
    <div>
      {/* <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button> */}
      <AutoRotatingCarousel
        label={<CloseIcon />}
        ButtonProps={{
          style: {
            position: 'absolute',
            right: 0,
            bottom: 0,
          },
        }}
        open={triggered}
        onClose={handleModal}
        onStart={handleModal}
        autoplay={false}
        mobile={isMobile}
      >
        {images.map((image, i) => (
          <Image
            key={i}
            src={image}
            aspectRatio={16 / 9}
            imageStyle={{
              objectFit: 'contain',
              maxHeight: xs ? 350 : 590,
              marginTop: xs ? '50%' : 'none',
            }}
            style={{
              height: '100%',
              backgroundColor: 'none',
            }}
          />
        ))}
      </AutoRotatingCarousel>
    </div>
  );
};

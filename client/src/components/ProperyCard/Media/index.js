import React, { useState, useEffect, useRef } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { animated } from 'react-spring';

import CardActionArea from '@material-ui/core/CardActionArea';
import Image from 'material-ui-image';

import { CarouselNavigation } from './CarouselNavigation';
import { Carousel } from './Carousel';
import { FullScreenCarousel } from '../../FullScreenCarousel';

const useStyles = makeStyles((theme) => ({
  mediaContainer: ({ expand }) => ({
    height: expand ? '100%' : 190,
    width: '100%',
    flexBasis: '50%',
    position: 'relative',
    overflow: 'hidden',
  }),
  cardActionArea: {
    width: '100%',
    height: '100%',
  },
  media: ({ expand }) => ({
    width: '100%',
    height: '100%',
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }),
  slide: {
    width: '100%',
    height: '100%',
  },

  carousel: {
    height: '100%',
  },
  carouselContainer: {
    height: '100%',
  },
}));

export const Media = ({
  images,
  open,
  mediaProps,
  imageProps,
  containerStyle,
}) => {
  const [modal, setModal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const cardActionArea = useRef();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({ expand: open });

  const handleFullScreenClick = () => {
    setModal(!modal);
  };

  const handleDotClick = (slideIndex) => {
    setSlideIndex(slideIndex);
  };

  const hasMultipleChildren = images.length != null;

  useEffect(() => {
    cardActionArea.current.oncontextmenu = () => false;
  });
  return (
    <animated.div className={classes.mediaContainer} style={mediaProps}>
      <CardActionArea ref={cardActionArea} className={classes.cardActionArea}>
        {open ? (
          <Carousel
            autoplay={open && hasMultipleChildren && !modal}
            className={classes.carousel}
            containerStyle={{ height: '100%', ...containerStyle }}
            index={slideIndex}
            onChangeIndex={handleDotClick}
            slideClassName={classes.slide}
          >
            {React.Children.map(images, (img) =>
              React.cloneElement(
                <Image
                  src={img}
                  className={classes.media}
                  imageStyle={{ objectFit: 'cover', userSelect: 'none' }}
                  style={{ padding: 0, height: '100%' }}
                />
              )
            )}
          </Carousel>
        ) : (
          <animated.div style={imageProps}>
            <Image
              onClick={handleFullScreenClick}
              src={images[0]}
              className={classes.media}
              imageStyle={{ objectFit: 'cover' }}
              style={{ padding: 0, height: '100%' }}
            />
          </animated.div>
        )}
      </CardActionArea>
      {open && (
        <>
          <CarouselNavigation
            slideIndex={slideIndex}
            childrenLength={images.length}
            handleDotClick={handleDotClick}
            handleFullScreenClick={handleFullScreenClick}
          />
        </>
      )}
      <FullScreenCarousel
        images={images}
        isMobile={xs}
        triggered={modal}
        setTrigger={setModal}
      />
    </animated.div>
  );
};
/*

      <CardActionArea className={classes.cardActionArea}>
        {open ? (
          <Carousel
            autoplay={open && hasMultipleChildren}
            className={classes.carousel}
            containerStyle={{ height: '100%', ...containerStyle }}
            index={slideIndex}
            onChangeIndex={handleDotClick}
            slideClassName={classes.slide}
          >
            {React.Children.map(images, (img) =>
              React.cloneElement(
                <CardMedia
                  className={classes.media}
                  title="Contemplative Reptile"
                  image={img}
                />
              )
            )}
          </Carousel>
        ) : (
<CardMedia
className={classes.media}
title="Contemplative Reptile"
image={images[0]}
onClick={handleFullScreenClick}
/>
        )}
      </CardActionArea>

*/

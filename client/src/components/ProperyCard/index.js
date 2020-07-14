import React, { useRef, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useSpring, useChain, config, animated } from 'react-spring';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { Tabs, TabPanel } from '../Tabs';
import { Description } from './Description';
import { Features } from './Features';
import { Map } from './Map';
import { BookingDialog } from '../BookingDialog';
import { Footer } from './Footer';
import { Media } from './Media';
import { Options } from './Options';
import { full_hd_images } from '../../global/apartments_detail/images';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    willChange: 'height, width',
  },

  pos: {
    marginBottom: 12,
  },
  properties: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contentContainer: ({ expand }) => ({
    flexBasis: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: expand ? '100vw' : '100%',
    },
  }),
  cardContent: ({ expand }) => ({
    maxHeight: 368,
    height: expand ? 368 : 'auto',
    overflow: 'auto',
    position: 'relative',
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px     rgba(0,0,0,0.3)',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 10,
    },
    '&::-webkit-scrollbar': {
      width: 6,
    },
  }),
  contentItem: {
    textAlign: 'left',
    paddingLeft: 0,
  },
  buyBtn: {
    marginLeft: 'auto',
  },
  icon: {
    paddingRight: '5px !important',
  },
  cardFooter: ({ expand }) => ({
    marginTop: expand ? '0' : 0,
  }),
}));

export const PropertyCard = ({
  name,
  price,
  bedrooms,
  bathrooms,
  size,
  garage,
  description,
  features,
  address,
  expand,
  set,
  index,
  containerRef,
  sm,
  xs,
}) => {
  const open = expand.index === index && expand.state;

  const [tabValue, setTabValue] = useState(0);
  const [isAnimated, setAnimationState] = useState(false);
  const [isDialogOpened, setDialog] = useState(false);
  const [isHovered, setHover] = useState(false);

  const classes = useStyles({ expand: open });
  const card = useRef();
  const springRef = useRef();
  const mediaRef = useRef();
  const contentRef = useRef();
  const propertiesRef = useRef();

  const handleViewBtnClick = () => {
    set({ state: open ? !expand.state : true, index });
  };

  const handleBookBtnClick = () => {
    setDialog(!isDialogOpened);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (isAnimated) {
      const elementRect = card.current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - window.innerHeight / 2 + 250;
      window.scrollTo({
        left: 0,
        top: middle,
        behavior: 'smooth',
      });
    }
  }, [isAnimated]);

  const { height, width, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.default,
    to: {
      width: open
        ? xs
          ? '100vw'
          : containerRef.getBoundingClientRect().width
        : 330,
      height: open ? (sm ? 1010 : 500) : 'auto',
      marginRight: sm ? 'auto' : '100%',
      display: open ? 'flex' : 'block',
      flexWrap: open ? 'wrap' : 'none',
    },
    onStart: () => {
      setAnimationState(true);
    },
    onRest: () => {
      setAnimationState(false);
    },
  });

  const mediaProps = useSpring({
    ref: mediaRef,

    to: {
      height: open ? (sm ? '50%' : '100%') : 190,
      width: '100%',
      flexBasis: sm ? '100%' : '50%',
    },
  });

  const contentProps = useSpring({
    ref: contentRef,
    to: {
      opacity: open ? 1 : 0,
    },
  });

  const propertiesProps = useSpring({
    ref: propertiesRef,
    to: {
      opacity: open ? 1 : 0,
      width: '100%',
      flexBasis: '50%',
      marginLeft: open ? 'auto' : 0,
    },
  });

  const buttonsProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: isHovered ? 1 : 0,
      transform: isHovered ? 'scale(1)' : 'scale(0)',
    },
    config: config.stiff,
  });

  const optionsProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: isHovered ? 1 : 0,
    },
  });

  const imageProps = useSpring({
    from: {
      height: '100%',
    },
    to: {
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    },
  });

  useChain(
    open
      ? [springRef, mediaRef, propertiesRef, contentRef]
      : [contentRef, propertiesRef, mediaRef, springRef],
    [0, open ? 0.2 : 0.5, open ? 0.4 : 0.3, open ? 0.5 : 0]
  );

  const AnimatedCard = animated(Card);
  const AnimatedCardContent = animated(CardContent);
  return (
    <AnimatedCard
      variant="outlined"
      ref={card}
      style={{ ...rest, height, width }}
      className={classes.root}
      onMouseEnter={() => !sm && setHover(true)}
      onMouseLeave={() => !sm && setHover(false)}
    >
      <Media
        open={open}
        mediaProps={mediaProps}
        imageProps={imageProps}
        images={full_hd_images[name]}
      />
      <animated.div className={classes.contentContainer}>
        {open ? (
          <>
            <Tabs onChange={handleTabChange} value={tabValue} />
            <AnimatedCardContent
              className={classes.cardContent}
              style={contentProps}
            >
              <TabPanel value={tabValue} index={0}>
                <Description
                  content={description}
                  open={open}
                  name={name}
                  price={price}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Features content={features} />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Map isMarkerShown />
              </TabPanel>
            </AnimatedCardContent>
            <Footer
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              size={size}
              garage={garage}
              onViewBtnClick={handleViewBtnClick}
              onBookBtnClick={handleBookBtnClick}
              propertiesProps={propertiesProps}
              open={open}
            />
          </>
        ) : (
          <>
            <AnimatedCardContent className={classes.cardContent}>
              <animated.div style={sm ? {} : optionsProps}>
                <Options name={name} />
              </animated.div>
              <Description
                open={open}
                content={description}
                name={name}
                price={price}
              />
            </AnimatedCardContent>
            <Footer
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              size={size}
              garage={garage}
              onViewBtnClick={handleViewBtnClick}
              onBookBtnClick={handleBookBtnClick}
              open={open}
              buttonsProps={sm ? {} : buttonsProps}
            />
          </>
        )}
      </animated.div>

      <BookingDialog
        open={isDialogOpened}
        setDialog={setDialog}
        apartmentName={name}
        xs={xs}
      />
    </AnimatedCard>
  );
};

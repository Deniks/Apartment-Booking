import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Image from 'material-ui-image';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FullScreenCarousel } from '../../FullScreenCarousel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  item: {
    height: '100%',
    width: '100%',
  },
}));

export const Gallery = ({ images }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [carousel, setCarousel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (index) => {
    setSelectedImage(index);
    setOpen(!open);
  };

  const handleImage = (index) => {
    setCarousel(true);
    setSelectedImage(0);
  };

  return (
    <>
      <FullScreenCarousel
        images={images}
        isMobile={'false'}
        triggered={carousel}
        setTrigger={setCarousel}
      />
      <div className={classes.root}>
        <GridList
          spacing={10}
          cellHeight={380}
          className={classes.gridList}
          cols={2}
        >
          <ButtonBase component="div" style={{ height: 380, padding: 0 }}>
            <GridListTile
              onClick={() => handleImage(0)}
              style={{ width: '100%', height: '100%' }}
              cols={1}
            >
              <Image
                src={images[0]}
                className={classes.media}
                imageStyle={{
                  objectFit: 'cover',
                  borderBottomLeftRadius: 15,
                  borderTopLeftRadius: 15,
                }}
                style={{ padding: 0, height: '100%' }}
              />{' '}
            </GridListTile>
          </ButtonBase>
          <GridListTile cols={1}>
            <GridList
              spacing={10}
              cellHeight="auto"
              className={classes.gridList}
              cols={2}
            >
              <ButtonBase component="div" style={{ height: 190 }}>
                <GridListTile
                  onClick={() => handleImage(1)}
                  className={classes.item}
                  cols={1}
                >
                  <Image
                    src={images[1]}
                    className={classes.media}
                    imageStyle={{ objectFit: 'cover' }}
                    style={{ padding: 0, height: '100%' }}
                  />
                </GridListTile>
              </ButtonBase>
              <ButtonBase component="div" style={{ height: 190 }}>
                <GridListTile
                  onClick={() => handleImage(2)}
                  className={classes.item}
                  cols={1}
                >
                  <Image
                    src={images[2]}
                    className={classes.media}
                    imageStyle={{
                      objectFit: 'cover',
                      borderTopRightRadius: 15,
                    }}
                    style={{ padding: 0, height: '100%' }}
                  />
                </GridListTile>
              </ButtonBase>
              <ButtonBase component="div" style={{ height: 190 }}>
                <GridListTile
                  onClick={() => handleImage(3)}
                  className={classes.item}
                  cols={1}
                >
                  <Image
                    src={images[3]}
                    className={classes.media}
                    imageStyle={{ objectFit: 'cover' }}
                    style={{ padding: 0, height: '100%' }}
                  />
                </GridListTile>
              </ButtonBase>
              <ButtonBase component="div" style={{ height: 190 }}>
                <GridListTile
                  onClick={() => handleImage(4)}
                  className={classes.item}
                  cols={1}
                >
                  <Image
                    src={images[4]}
                    className={classes.media}
                    imageStyle={{
                      objectFit: 'cover',
                      borderBottomRightRadius: 15,
                    }}
                    style={{ padding: 0, height: '100%' }}
                  />
                </GridListTile>
              </ButtonBase>
            </GridList>
          </GridListTile>
        </GridList>
      </div>
    </>
  );
};

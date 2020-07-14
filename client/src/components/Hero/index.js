import React, { memo } from 'react';

import Container from '@material-ui/core/Container';

import './style.css';

import { Slider } from '../Slider';

/*
//  FULL HD IMAGES

import propertyImg1 from '../../assets/images/apartments/belem_21/full-hd/lv_DSC0280.jpg';
import propertyImg2 from '../../assets/images/apartments/bico_do_marques_15/full-hd/lv_DSC6466.jpg';
import propertyImg3 from '../../assets/images/apartments/memoria_25/full-hd/id_DSC2665.jpg';
import propertyImg4 from '../../assets/images/apartments/principe_real_31/full-hd/_DSC0071.jpg';
import propertyImg5 from '../../assets/images/apartments/rodrigues_sampaio_28/full-hd/_DSC6133.jpg';
*/

import propertyImg1 from '../../assets/images/apartments/rodrigues_sampaio_28/_DSC6148.jpg';
import propertyImg2 from '../../assets/images/apartments/bico_do_marques_15/lv_DSC6466.jpg';
import propertyImg3 from '../../assets/images/apartments/memoria_25/id_DSC2665.jpg';
import propertyImg4 from '../../assets/images/apartments/principe_real_31/_DSC0071.jpg';
import propertyImg5 from '../../assets/images/apartments/rodrigues_sampaio_28/_DSC6133.jpg';

const images = [
  propertyImg1,
  propertyImg2,
  propertyImg3,
  propertyImg4,
  propertyImg5,
];

const props = (prevProps, nextProps) => true;

export const Hero = memo(() => {
  return (
    <section className="hero">
      <Slider images={images} />
    </section>
  );
}, props);

/**
 * 
 *       <Container>
        <h1>Find Your Best Property</h1>
        <h3>Esteem spirit temper too say adieus who direct esteem.</h3>
      </Container>
 */

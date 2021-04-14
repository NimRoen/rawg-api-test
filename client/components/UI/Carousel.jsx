import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  margin: 30px 0;
  background: no-repeat center url('${p => p.background}');
  background-size: cover;
  border-radius: 16px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${p => p.theme.defaultBackground};
    opacity: 0.7;
  }

  & .carousel-root,
  & .carousel.carousel-slider {
    width: 100%;
    height: 100%;
  }

  & .control-arrow {
    width: 100px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: contain;
`;

const Carousel = ({ images, background }) => {
  const hasImages = images.length > 0;

  return (
    <Container background={background}>
      {hasImages && (
        <ResponsiveCarousel
          infiniteLoop={true}
          showStatus={false}
          showThumbs={false}
          autoPlay={true}
          transitionTime={500}
          interval={5000}
        >
          {images.map(({ image }, index) =>
            <Image key={`carousel-slide-${index}`} src={image} alt={`Game screenshot ${index + 1}`} />
          )}
        </ResponsiveCarousel>
      )}
    </Container>
  );
};

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  background: PropTypes.string,
};

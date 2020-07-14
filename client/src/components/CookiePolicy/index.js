import React, { useState, useEffect, useRef } from 'react';

import { useSpring, config, animated } from 'react-spring';
import { useCookies } from 'react-cookie';

import { CookieWarning } from '../CookieWarning';

export const CookiePolicy = ({ children }) => {
  const [cookies, setCookie] = useCookies(['cookie-name']);
  const [active, setActive] = useState(true);
  const [isAnimating, setAnimation] = useState(false);
  const [height, setHeight] = useState(0);
  const cookieWarning = useRef();

  const { transform } = useSpring({
    config: config.wobbly,
    to: {
      transform: active ? 'translateY(0px)' : `translateY(-${height}px)`,
    },
    onRest: () => {
      setAnimation(true);
    },
  });

  const boxProps = useSpring({
    config: config.wobbly,
    to: {
      transform: active ? 'translateY(0%)' : 'translateY(-100%)',
    },
  });

  const handleClose = () => {
    setActive(false);
    setCookie('name', 'newname', { path: '/' });
    console.log(cookies);
  };

  useEffect(() => {
    try {
      const { height } = cookieWarning.current.getBoundingClientRect();
      setHeight(height);
    } catch (error) {
      console.log('Cookies are active');
    }
  }, []);

  return cookies.name ? (
    children
  ) : (
    <>
      <CookieWarning
        style={{ display: isAnimating ? 'none' : 'block', ...boxProps }}
        reference={cookieWarning}
        active={active}
        handleClose={handleClose}
      />
      <animated.div
        style={{
          transform: active ? 'none' : isAnimating ? 'none' : transform,
        }}
      >
        {children}
      </animated.div>
    </>
  );
};

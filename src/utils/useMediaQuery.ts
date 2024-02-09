import React, { useState, useEffect } from 'react';

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= width) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return targetReached;
};

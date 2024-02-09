import React, {useState, useEffect} from 'react';


export const useMediaQueryRange = (minWidth, maxWidth) => {
  const [targetReached, setTargetReached] = useState(false);


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= minWidth && window.innerWidth <= maxWidth) {
        setTargetReached(true)
      } else {
        setTargetReached(false)
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return targetReached;
};

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scorri in cima alla pagina quando cambia il pathname
  }, [pathname]);

  return null; // Non ha bisogno di renderizzare nulla
}

export default ScrollToTop;
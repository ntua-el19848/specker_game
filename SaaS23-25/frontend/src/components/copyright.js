/* Copyright bar in bottom of each page */
import React from 'react';

const CopyrightNotice = () => {
  return (
    <footer className="copyright">
      &copy; {new Date().getFullYear()} My Charts. All rights reserved.
    </footer>
  );
};

export default CopyrightNotice;
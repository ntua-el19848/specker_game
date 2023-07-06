/* Header bar in top of each page with dynamically added title */
import React from 'react';
import {useLocation } from 'react-router-dom';

const Header = () => {
    
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
  
    function getPageTitle(pathname) {
      /* Logic to get the page title based on the current pathname
         You can use a library like react-router-dom's "useLocation" hook to get the current pathname
         Return the corresponding title for each page
         For simplicity, this example assumes the title is based on the last segment of the pathname */
      const segments = pathname.split('/');
      const lastSegment = segments[segments.length - 1];
      const pages = [ "","about", "account", "landing", "credits", "errorCreate", "Charts", "myCharts", "newChart", "newUser", "successfulCreate"];
      /* if last part of URL is empty or landing you are in home, so return myCharts in title */
      if(lastSegment==="" || lastSegment==="landing"){
        return "myCharts"

      }
      /* else beuatify the last part to take this for the header title */
      else if(pages.includes(lastSegment)) {
        const title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
        return title.replace(/([a-z])([A-Z])/g, "$1 $2");
      }
      else {
        return "Not Found"
      }
    }
  
    return (
      <header className="header">
        <h1 className="header-title">{pageTitle}</h1>
      </header>
    );
  };

export default Header;

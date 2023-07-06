/* This compoment implements the sidebar functionality that we have on our website */
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";



function SideBar() {
  const [sidebar, setSidebar] = useState(false);

  /* this function toggles the sidebar and set the sidebar state parameter in the complement of previous value */
  const showSidebar = () => {
    setSidebar(!sidebar);
    const pageContent = document.querySelector(".top-div");
    if (pageContent != null) {
      pageContent.classList.toggle("side");
    }
  }

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
          {sidebar ? <AiIcons.AiOutlineClose onClick={showSidebar} /> : <FaIcons.FaBars onClick={showSidebar} />}
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" >
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={showSidebar}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

const SideBarLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);

export default SideBarLayout;

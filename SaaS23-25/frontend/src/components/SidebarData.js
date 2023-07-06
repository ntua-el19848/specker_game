/* In this component we add Sidebar data (the options of sidebar) 
   We are taking icons of each option from react libraries.
   Each option has title, path, icon and cName attributes */
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/landing",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Credits",
    path: "/credits",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "My Account",
    path: "/account",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "My Charts",
    path: "/myCharts",
    icon: <FaIcons.FaChartBar />,
    cName: "nav-text",
  },
  {
    title: "New Chart",
    path: "/newChart",
    icon: <AiIcons.AiOutlineLineChart />,
    cName: "nav-text",
  },
  {
    title: "About",
    path: "/about",
    icon: <FaIcons.FaInfoCircle />,
    cName: "nav-text",
  },
];
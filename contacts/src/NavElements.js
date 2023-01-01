import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import './navbar.css'
import { useState } from 'react';

//import { NavLink as Link } from 'react-router-dom'

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from 'react';
const Navbar = () => {
 const [click, setClick] = useState(true);
 return (
  <>
   <nav className="navbar">
    <div className="navbar-container container">
     <ul className={click ? "nav-menu active" : "nav-menu"}>
      <li className='nav-item nav-link'>
       <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}>Courses</NavLink></li>

      <li ><NavLink to="/newcourse" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}>New Course</NavLink></li>
      <li ><NavLink to="/newsubject" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}>New Subject</NavLink></li>
     </ul>
    </div>
   </nav>
  </>
 );
}
export default Navbar;

// export const PrimaryNav = styled.nav`
//   z-index: 14;
//   height: 90px;
//   display: flex;
//   background: #8bc34a;
//   justify-content: space-between;
//   padding: 0.18rem calc((100vw - 1000px) / 2);
// `
// export const MenuLink = styled(Link)`
//   color: #fff;
//   display: flex;
//   cursor: pointer;
//   align-items: center;
//   text-decoration: none;
//   padding: 0 1.2rem;
//   height: 100%;
//   &.active {
//     color: #000000;
//   }
// `
// export const Hamburger = styled(FaBars)`
//   display: none;
//   color: #ffffff;
//   @media screen and (max-width: 768px) {
//     display: block;
//     font-size: 1.9rem;
//     top: 0;
//     right: 0;
//     position: absolute;
//     cursor: pointer;
//     transform: translate(-100%, 75%);
//   }
// `
// export const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   margin-right: -25px;
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `
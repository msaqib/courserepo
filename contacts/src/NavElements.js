import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import './navbar.css'
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
 const [click, setClick] = useState(false);

 return (
  <>
   <nav className="navigation">
    <a href="#" onClick={() => {
     setClick(!click);
    }} className="hamburger">
     <FontAwesomeIcon icon={faBars} />
    </a>
    <div className={click ? "navigation-menu expanded" : "navigation-menu"}>
     <ul >
      <li >
       <NavLink to="/" className={({ isActive }) => isActive ? "activated" : ""}>Courses</NavLink></li>

      <li ><NavLink to="/newcourse" className={({ isActive }) => isActive ? "activated" : ""}>New Course</NavLink></li>
      <li ><NavLink to="/newsubject" className={({ isActive }) => isActive ? "activated" : ""}>New Subject</NavLink></li>
     </ul>
    </div>
   </nav>
  </>
 );
}
export default Navbar;
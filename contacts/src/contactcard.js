import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import "./styles.css";

const Card = props => {
 return (
  <div className="course-card">
   <img src={props.avatar} alt="profile">

   </img>
   <div className="course-details">
    <div id="name"><FontAwesomeIcon icon={solid('home')} /> <a href={props.url} target="_blank">{props.name}</a></div>
    <div id="subject"><FontAwesomeIcon icon={solid('tag')} /> {props.subject}</div>
    <div id="level"><FontAwesomeIcon icon={solid('fire')} /> {props.level}</div>
    <div id="trash"><FontAwesomeIcon icon={solid('trash-can')} /></div>
   </div>

  </div>
 );
}

export default Card;
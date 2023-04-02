import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Card = props => {
 const delHandler = () => {
  props.delHandler(props.id)
 }

 const nav = useNavigate();
 const handler = function (id) {
  nav(`/course/${id}`)
 }

 return (
  <div className="course-card">
   <img onClick={() => handler(props.id)} src={props.avatar} alt="profile">
   </img>
   <div className="course-details">
    <div id="name"><FontAwesomeIcon icon={solid('home')} /> <a href={props.url} target="_blank">{props.name}</a></div>
    <div id="subject"><FontAwesomeIcon icon={solid('tag')} /> {props.subject}</div>
    <div id="level"><FontAwesomeIcon icon={solid('fire')} /> {props.level}</div>
    <div id="trash" onClick={delHandler}><FontAwesomeIcon icon={solid('trash-can')} /></div>
   </div>

  </div >
 );
}

export default Card;
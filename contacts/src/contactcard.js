import React from "react";
import { useNotify, Confirm } from "react-admin";
import { useForm } from "react-hook-form"
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

 const form = useForm();
 const notify = useNotify();
 const [open, setOpen] = React.useState(false);
 const handleClick = () => setOpen(true);
 const handleDialogClose = () => setOpen(false);

 const handleConfirm = () => {
  notify('Course deleted.');
  delHandler();
  setOpen(false);
 };

 var ct = "Do you really want to do stuff?";

 return (
  <div className="course-card">
   <img onClick={() => handler(props.id)} src={props.avatar} alt="profile">
   </img>
   <div className="course-details">
    <div className="activebutton" id="name"><FontAwesomeIcon icon={solid('home')} /> <a href={props.url} target="_blank">{props.name}</a></div>
    <div className="activebutton" id="subject"><FontAwesomeIcon icon={solid('tag')} /> {props.subject}</div>
    <div className="activebutton" id="level"><FontAwesomeIcon icon={solid('fire')} /> {props.level}</div>
    <div className="activebutton" id="trash" onClick={handleClick}><FontAwesomeIcon icon={solid('trash-can')} /></div><Confirm
     isOpen={open}
     title="Delete course"
     content={ct}
     onConfirm={handleConfirm}
     onClose={handleDialogClose}
     confirm="Yes"
     cancel="No"
    />
   </div>

  </div >
 );
}

export default Card;
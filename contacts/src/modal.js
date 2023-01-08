import React, { useState, useEffect } from "react"

const Modal = (props) => {
 //console.log(props.show)


 const courses = props.courselist;

 if (!props.show) {
  return null
 }



 // const loadCourses = new XMLHttpRequest();
 // loadCourses.open('GET', 'http://localhost:3500/courses', false)
 // loadCourses.send();

 // const courses = JSON.parse(loadCourses.responseText)

 const onClose = (e) => {
  // checkboxState now has the checkboxes state
  props.onClose(e)
 }



 return (
  <div className="modal">
   <div className="modal-content">
    <div className="modal-header">
     <h3 className="modal-title">{props.title}</h3>
    </div>
    <div className="modal-body">
     {courses.map((course, index) => {
      return <div className="list-select" key={index}>
       <input type="checkbox"
        id={`checkbox-${index}`}
        name={course.name}
        value={course.name}
        //checked={props.checkboxState[index]}
        onChange={() => { props.onCheckbox(index) }} />

       <span className="course-select">
        <div>Name: {course.name}</div>
        <div>Level: {course.level}</div>
        <div>Subject: {course.subject}</div>
       </span>
      </div>
     })}
    </div>
    <div className="modal-footer">
     <button className="modal-button" onClick={onClose}>Close</button>
    </div>
   </div>

  </div>
 )
}

export default Modal;
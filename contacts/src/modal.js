import React from "react"

const Modal = (props) => {
 console.log(props.show)
 if (!props.show) {
  return null
 }

 const loadCourses = new XMLHttpRequest();
 loadCourses.open('GET', 'http://localhost:3500/courses', false)
 loadCourses.send();

 const courses = JSON.parse(loadCourses.responseText)

 return (
  <div className="modal">
   <div className="modal-content">
    <div className="modal-header">
     <h3 className="modal-title">{props.title}</h3>
    </div>
    <div className="modal-body">
     {courses.map(course => {
      return <div><div>Name: {course.name}</div><div>Level: {course.level}</div><div>Subject: {course.subject}</div></div>
     })}
    </div>
    <div className="modal-footer">
     <button className="modal-button" onClick={props.onClose}>Close</button>
    </div>
   </div>

  </div>
 )
}

export default Modal;
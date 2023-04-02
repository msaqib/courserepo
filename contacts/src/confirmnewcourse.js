import React from "react";

export function ConfirmNewCourse(props) {

 return (
  <>
   <div className="confirmpre">
    {/* Pre-requisites */}
    <ul>
     {props.pre.map((pre, index) => {
      return <li key={index}><a href={pre.url}>{pre.name}</a></li>
     })}
    </ul>
   </div>
   <div className="separator"></div>
   <div className="confirmcourse">
    {/* Course information */}
    <h4><a href={props.course.url}>{props.course.name}</a> </h4>
    <div>Subject: {props.course.subject}</div>
    <div>Level: {props.course.level}</div>
   </div>
   <div className="separator"></div>
   <div className="confirmpost">
    {/* Follow-ups */}
    <ul>
     {props.post.map((post, index) => {
      return <li key={index}><a href={post.url}>{post.name}</a></li>
     })}
    </ul>
   </div>
  </>
 )
}
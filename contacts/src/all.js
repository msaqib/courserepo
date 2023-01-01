import React from 'react';
import Card from './contactcard';
export default function All() {
 const loadCourses = new XMLHttpRequest();
 loadCourses.open('GET', 'http://localhost:3500/courses', false)
 loadCourses.send();

 const courses = JSON.parse(loadCourses.responseText)
 return (
  <>
   <h2>Course list</h2>
   <div className="course-list">

    {courses.map(
     course => {
      return <Card avatar="https://via.placeholder.com/150"
       name={course.name}
       url={course.url}
       level={course.level}
       subject={course.subject}
      />
     }
    )}
   </div>
  </>
 );
};
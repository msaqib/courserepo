import React from 'react';
import { useState } from 'react';
import Card from './contactcard';
export default function All() {
  const [c, setCourses] = useState([]);
  const loadCourses = new XMLHttpRequest();
  loadCourses.open('GET', 'http://localhost:3500/courses', false)
  loadCourses.send();

  const courses = JSON.parse(loadCourses.responseText)

  const del = function (id) {
    // deletes a course
    console.log(id)
    const url = `http://localhost:3500/deletesubject`;
    fetch(url, {
      "method": "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        const newCourses = courses.filter(course => course.id !== id)
        setCourses(newCourses)
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <h2>Course list</h2>
      <div className="course-list">

        {courses.map(
          course => {
            return <Card avatar="https://via.placeholder.com/150"
              key={course.ID}
              id={course.ID}
              name={course.name}
              url={course.url}
              level={course.level}
              subject={course.subject}
              delHandler={del}
            />
          }
        )}
      </div>
    </>
  );
};
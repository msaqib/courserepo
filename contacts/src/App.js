import React from "react";
import "./styles.css";
import { Route, Routes, useParams } from 'react-router-dom';
//import Card from "./contactcard";
import Newcourse2 from "./newcourse-1";
import Newsubject from "./newsubjects";
import Navbar from "./NavElements";
import All from './all'
import { CourseDetails } from "./CourseDetail";
import { getCourseList, getSubjectList, submitNewCourse, deleteCourse } from "./netfun";
import { useEffect, useState } from 'react';

const App = () => {
  const [courses, setCourses] = useState([])
  const [isLoaded, setLoaded] = useState(false);
  const [isSubjectsLoaded, setSubjectsLoaded] = useState(false);
  const [isCoursesLoaded, setCoursesLoaded] = useState(false);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    getCourseList().then(courses => {
      setCourses(courses)
      setCoursesLoaded(true)
    }).catch(err => {
      console.log(err)
    })

    getSubjectList().then(subjects => {
      setSubjects(subjects)
      setSubjectsLoaded(true)
    }).catch(err => {
      console.log(err)
    })
  }, []
  )

  useEffect(() => {
    if (isSubjectsLoaded) {
      setLoaded(true)
    }
  }
    , [isCoursesLoaded])

  useEffect(() => {
    if (isCoursesLoaded) {
      setLoaded(true)
    }
  }
    , [isSubjectsLoaded])

  useEffect(() => {
  }, [isLoaded])

  const del = function (id) {
    setLoaded(false)
    // deletes a course
    deleteCourse(id).then(response => {
      const newCourses = courses.filter(course => course.ID !== id)
      setCourses(newCourses)
      setLoaded(true)
    })
      .catch(err => {
        console.log(err);
      });
  }

  const newCourseHandler = (course) => {
    console.log(courses[0])
    console.log(course)
    submitNewCourse(course).then(id => {
      course.ID = id.ID
      course.prereq1 = course.pre[0]
      course.prereq2 = course.pre[1]
      course.prereq3 = course.pre[2]
      course.prereq4 = course.pre[3]

      course.follow1 = course.post[0]
      course.follow2 = course.post[1]
      course.follow3 = course.post[2]
      course.follow4 = course.post[3]
      setCourses([...courses, course])
    })
  }

  if (isLoaded) {
    return (
      <><Navbar />
        <div className="courses">
          <Routes>
            <Route path='/' element={<All courseList={courses} subjectsList={subjects} delHandler={del} />} />
            <Route path='/newcourse' element={<Newcourse2 courseList={courses} subjectsList={subjects} newCourseHandler={newCourseHandler} />} />
            <Route path='/newsubject' element={<Newsubject />} />
            <Route path='/course/:id' element={<CourseDetails coursedata={courses} />} />
          </Routes>
        </div>
      </>
    )
  }
  else {
    return (
      <><Navbar />
        <h2>Loading...</h2>
      </>
    )
  }
}


export default App;
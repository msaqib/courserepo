import React from 'react'
import { useParams } from 'react-router-dom'

export function CourseDetails(props) {
 const { id } = useParams()
 const courses = props.coursedata
 const course = courses.filter(course => course.ID === parseInt(id))[0]
 const p1 = courses.filter(item => item.ID === course.prereq1)[0]
 const p2 = courses.filter(item => item.ID === course.prereq2)[0]
 const p3 = courses.filter(item => item.ID === course.prereq3)[0]
 const p4 = courses.filter(item => item.ID === course.prereq4)[0]

 const ps = [p1, p2, p3, p4].filter((item) => { return item !== undefined })

 const f1 = courses.filter(item => item.ID === course.follow1)[0]
 const f2 = courses.filter(item => item.ID === course.follow2)[0]
 const f3 = courses.filter(item => item.ID === course.follow3)[0]
 const f4 = courses.filter(item => item.ID === course.follow4)[0]

 const fs = [f1, f2, f3, f4].filter((item) => { return item !== undefined })

 return (
  <div id="coursedetailsview">
   {ps.map(p => <><div className='pre'><a href={p.url}>{p.name}</a><div>Level: {p.level}</div><div>Subject: {p.subject}</div></div><div className='sep'></div></>)}
   <div id="course">
    <a href={course.url}><div id="name">{course.name}</div></a>
    <div id="level">Level: {course.level}</div>
    <div id="subject">Subject: {course.subject}</div>
   </div>
   {fs.map(p => <><div className='sep'></div><div className='follow'><a href={p.url}>{p.name}</a><div>Level: {p.level}</div><div>Subject: {p.subject}</div></div></>)}
  </div >
 )
}
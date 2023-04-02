import React, { useState, useEffect } from "react"

export function SelectCourses(props) {
 useEffect(() => {
  setSubjectsFilter(props.subjects.map((subject) => { return subject.name }))
  document.getElementById('allbutton').checked = allState;
  const chkboxes = document.getElementsByName("filter")
  chkboxes.forEach(chbox => {
   chbox.checked = true
  })
 }, [])

 const courses = props.courselist;
 const subjects = props.subjects;
 const [subjectsFilter, setSubjectsFilter] = useState([])
 const [allState, setAllState] = useState(true)
 const filteredCourses = courses.filter((course) => { return subjectsFilter.includes(course.subject) })
 const filterHandler = (event) => {
  if (event.target.checked) {
   if (event.target.value === "All") {
    setAllState(true)
    const chkboxes = document.getElementsByName("filter")
    chkboxes.forEach(chbox => {
     chbox.checked = true
    })
    setSubjectsFilter(subjects.map(subject => { return subject.name }))
   } else {
    setSubjectsFilter([...subjectsFilter, event.target.value])
   }
  } else {
   if (event.target.value === "All") {
    const chkboxes = document.getElementsByName("filter")
    chkboxes.forEach(chbox => {
     chbox.checked = false
    })
    setSubjectsFilter([])
   } else {
    setAllState(false)
    setSubjectsFilter(subjectsFilter.filter((filter) => filter !== event.target.value))
   }
  }
 }
 return (
  <div className="course-selector">
   <div className="filters"><span>Filter by subject</span>
    <label htmlFor="all">
     <input
      type="checkbox"
      onChange={filterHandler}
      checked={allState}
      value="All"
      id="allbutton"
      key="All"
     />
     <span>All</span>
    </label>
    {subjects.map((subject) => {
     return <label htmlFor={subject.name}>
      <input type="checkbox" name="filter" onChange={filterHandler} value={subject.name} id={subject.name} key={subject.name}></input>
      <span>{subject.name}</span>
     </label>
    })}

   </div>
   <div className="selector-header">
    <h3 className="selector-title">{props.title}</h3>
   </div>
   <div className="course-list">
    {filteredCourses.map((course, index) => {
     return <div className="list-select" key={index}>
      <input type="checkbox"
       id={`checkbox-${index}`}
       key={index}
       name={course.name}
       value={course.name}
       checked={props.checkboxState[index]}
       onChange={() => { props.onCheckbox(index) }} />

      <div className="course-select">
       <div>Name: {course.name}</div>
       <div>Level: {course.level}</div>
       <div>Subject: {course.subject}</div>
      </div>
     </div>
    })}
   </div>
  </div>

 )
}
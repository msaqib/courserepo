import React, { useState, useEffect } from "react"
import Card from './contactcard';
import { useNavigate } from 'react-router-dom';
export function FilterCourses(props) {
  const history = useNavigate();

  const courses = props.courselist;
  const subjects = props.subjects;
  const [selectedCategories, setSelectedCategories] = useState([])
  useEffect(() => {
    document.getElementsByName('All').forEach(el => el.checked = true)
  }, [])
  useEffect(() => {
    setSelectedCategories(subjects.map(subject => {
      return subject.name
    }))
    subjects.forEach((subject) => {
      const elements = document.getElementsByName(subject.name)
      elements.forEach(el => el.checked = true)
    })
  }, [subjects])

  function handleCategoryChange(event) {
    const { name, checked } = event.target;
    if (checked) {
      if (name === "All") {
        let filters = document.getElementById('filters')
        filters = filters.querySelectorAll('input[type="checkbox"]:not([name="All"])')
        filters.forEach(filter => filter.checked = true)
        let allSubjects = Array.from(filters).map(filter => { return filter.name })
        setSelectedCategories(allSubjects)
      }
      else {
        //event.target.checked = true;
        setSelectedCategories(prevSelectedCategories => [
          ...prevSelectedCategories,
          name,
        ]);
      }

    } else {
      if (name === "All") {
        let filters = document.getElementById('filters')
        filters = filters.querySelectorAll('input[type="checkbox"]:not([name="All"])')
        filters.forEach(filter => filter.checked = false)
        setSelectedCategories([])
      }
      else {
        document.getElementById('All').checked = false;
        setSelectedCategories(prevSelectedCategories =>
          prevSelectedCategories.filter(category => category !== name)
        );
      }

    }
  }

  let categoryCheckboxes = <label key="All">
    <input type="checkbox" name="All" id="All" onChange={handleCategoryChange} />
    All
  </label>
  categoryCheckboxes = [categoryCheckboxes, subjects.map(subject => (
    <label key={subject.name}>
      <input
        type="checkbox"
        name={subject.name}
        //checked={selectedCategories.some(sub => { return sub.name === subject.name })}
        onChange={handleCategoryChange}
      />
      {subject.name}
    </label>
  ))]

  let filteredItems =
    selectedCategories.length === 0
      ? courses
      : courses.filter(item => selectedCategories.includes(item.subject));

  filteredItems = courses.filter(item =>
    selectedCategories.includes(item.subject)
  )

  return (
    <>
      <div id="filters">{categoryCheckboxes}</div>
      <div className="filteredcourses">{filteredItems.map(course => {
        return (
          <Card avatar="https://via.placeholder.com/150"
            key={course.ID}
            id={course.ID}
            name={course.name}
            url={course.url}
            level={course.level}
            subject={course.subject}
            delHandler={props.delHandler}
          />

        )
      })}
      </div>
    </>
  );
}
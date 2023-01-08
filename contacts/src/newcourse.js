import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from './modal'
import { getCourseList } from './netfun';

export default function Newcourse() {
 const [name, setName] = useState("");
 const [url, setURL] = useState("");
 const [level, setLevel] = useState("Beginner");
 const [subject, setSubject] = useState("");
 const [courses, setCourses] = useState(null);
 const [checkboxState, setCheckboxState] = useState(null);

 const [subs, setSubs] = useState([]);

 const [showModal, setShowModal] = useState(false);

 useEffect(() => {
  let mounted = true;
  getCourseList().then(items => {
   if (mounted) {
    setCourses(items)
    const checkboxes = new Array(items.length).fill(false)
    setCheckboxState(checkboxes)
    console.log(items)
   }
  })
  return () => mounted = false;
 }, [])

 useEffect(() => {
  fetch('http://localhost:3500/subjects').then(response => {
   return response.json()
  }).then(data => {
   setSubs(data)
   if (data.length > 0) {
    setSubject(data[0].name)
   }
  })

 }, [])

 const onCheckbox = (loc) => {
  const newCheckboxState = checkboxState.map((item, index) => (index == loc) ? !item : item)
  setCheckboxState(newCheckboxState)
 }

 const handleSubmit = (event) => {
  event.preventDefault();
  console.log({ name: name, url: url, level: level, subject: subject });
  fetch('http://localhost:3500/course', {
   method: 'POST',
   body: JSON.stringify({ name: name, url: url, level: level, subject: subject }),
   headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
   }
  }).then(function (response) {
   console.log(response)
   return response.json();
  });
 }

 // let subjects = [];
 // fetch('http://localhost:3500/subjects')
 //  .then(response => {
 //   return response.json();
 //  }).then(data => {
 //   subjects = data.map((sub) => {
 //    console.log(sub)
 //    return sub.name
 //   });
 //   //console.log(subjects);
 //  });

 // console.log(subjects)
 return (
  <>
   <h1>Create a new course</h1>
   <form onSubmit={handleSubmit}>
    <label>
     Course name:
     <input type="text" value={name} onChange={(evt) => setName(evt.target.value)}></input>
    </label>

    <label>
     URL:
     <input type="text" value={url} onChange={(evt) => setURL(evt.target.value)}></input>
    </label>

    <label>
     Level:
     <select value={level} onChange={(evt) => setLevel(evt.target.value)}>
      <option value="Beginner" key="beginner">Beginner</option>
      <option value="Intermediate" key="intermediate">Intermediate</option>
      <option value="Advanced" key="advanced">Advanced</option>
     </select>
    </label>

    <label>
     Subject:
     <select value={subject} onChange={(evt) => setSubject(evt.target.value)}>
      {subs.map((subject) => <option value={subject.name}>{subject.name}</option>)}
     </select>
     <label>
      <button onClick={(e) => { e.preventDefault(); setShowModal(true) }}>Select pre-requisites</button>
      <Modal courselist={courses} show={showModal} checkboxState={checkboxState} onCheckbox={onCheckbox} onClose={(e) => { e.preventDefault(); setShowModal(false); }} title="Pre-requisites" />
     </label>
     <label>
      <button>Select follow-ons</button>
     </label>
    </label>
    <input type="submit" />
   </form>
  </>
 )
};
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Newcourse() {
 const [name, setName] = useState("");
 const [url, setURL] = useState("");
 const [level, setLevel] = useState("Beginner");
 const [subject, setSubject] = useState("");

 const [subs, setSubs] = useState([]);

 useEffect(() => {
  fetch('http://localhost:3500/subjects').then(response => {
   return response.json()
  }).then(data => setSubs(data))

 }, [])

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

 let subjects = [];
 fetch('http://localhost:3500/subjects')
  .then(response => {
   return response.json();
  }).then(data => {
   subjects = data.map((sub) => {
    //console.log(sub)
    return sub.name
   });
   //console.log(subjects);
  });

 // const fetchSubjects = () => {
 //  console.log('Fetching subjects')
 //  fetch('http://localhost:3500/subjects', {
 //   method: 'GET',
 //   headers: {
 //    Accept: 'application/json',
 //    'Content-Type': 'application/json'
 //   }
 //  }).then((response) => {
 //   response.json().then((subjects) => {
 //    return subjects
 //   })
 //  })
 // }

 //const subjects = fetchSubjects();
 console.log(subjects)
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
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
     </select>
    </label>

    <label>
     Subject:
     <select value={subject} onChange={(evt) => setSubject(evt.target.value)}>
      {subs.map((subject) => <option value={subject.name}>{subject.name}</option>)}
     </select>

    </label>
    <input type="submit" />
   </form>
  </>
 )
};
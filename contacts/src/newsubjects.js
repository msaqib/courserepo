import React from 'react';
import { useState } from 'react';

export default function Newsubject() {
 const [subjectName, setSubjectName] = useState('');
 const [inputFields, setInputFields] = useState([''])

 const handleSubjectChange = (event) => {
  setSubjectName(event.target.value);
  // fetch('http://localhost:3500/checksubject', {
  //  method: 'POST',
  //  body: JSON.stringify({ name: subjectName }),
  //  headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json'
  //  }
  // }).then(function (response) {
  //  console.log(response)
  //  return response.json();
  // });
 }
 const handleFormChange = (index, event) => {
  let data = [...inputFields];

  data[index] = event.target.value;
  setInputFields(data)
 }

 const addFields = (e) => {
  e.preventDefault();
  let newField = ''

  setInputFields([...inputFields, newField])
 }

 const onSubmit = (e) => {
  e.preventDefault();
  console.log([subjectName, inputFields]);
  // Check if this subject isn't a duplicate
  fetch('http://localhost:3500/checksubject', {
   method: 'POST',
   body: JSON.stringify({ name: subjectName }),
   headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
   }
  }).then((response) => response.json()).then((data) => {
   if (data.status !== 'Duplicate') {
    console.log('Inserting')
    fetch('http://localhost:3500/newsubject', {
     method: 'POST',
     body: JSON.stringify({ name: subjectName, subtopics: inputFields }),
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
     }
    }).then((response) =>
     response.json()).then((data) => {
      console.log('Data' + data.ID)
     })
   }
   else {
    console.log('Not inserting')
   }
  })
  // .then(function (response) {
  //  response.json().then((data) => console.log(data.status))
  //  if (response.ok) {
  //   fetch('http://localhost:3500/newsubject', {
  //    method: 'POST',
  //    body: JSON.stringify({ name: subjectName, subtopics: inputFields }),
  //    headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //    }
  //   }).then(function (response) {
  //    console.log(response)
  //    //return response.json();
  //   });
  //  }
  //  return response.json();
  // });


 }

 const removeField = (index) => {
  let data = [...inputFields]
  data.splice(index, 1)
  setInputFields(data)
 }

 // const handleSubmit = (event) => {
 //  event.preventDefault();
 //  console.log({ name: name, url: url, level: level, subject: subject });
 //  fetch('http://localhost:3500/subject', {
 //   method: 'POST',
 //   body: JSON.stringify({ name: name, url: url, level: level, subject: subject }),
 //   headers: {
 //    Accept: 'application/json',
 //    'Content-Type': 'application/json'
 //   }
 //  }).then(function (response) {
 //   console.log(response)
 //   return response.json();
 //  });
 // }
 return (
  <div className="subjectform">
   <h1>Enter new subject</h1>
   <form onSubmit={onSubmit}>
    <input
     name='name'
     placeholder='Subject name'
     //value='{input.name}'
     onChange={event => handleSubjectChange(event)}
    />
    {inputFields.map((input, index) => {
     return (
      <>
       <div key={index}>
        <input
         name='subtopic'
         placeholder='Subtopic name'
         //value='{input.subtopic}'
         onChange={event => handleFormChange(index, event)}
        />
        <button onClick={() => { removeField(index) }}>Remove</button>
       </div>
      </>
     )
    })}
    <button onClick={addFields}>Add More ...</button>
    <button onClick={onSubmit}>Submit</button>
   </form>
  </div>
 );
}
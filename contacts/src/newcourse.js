import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from './modal'
import { getCourseList } from './netfun';
import { BasicInfo } from './coursebasic';
import { SelectCourses } from './selectCourses';

async function getCourses() {
 const data = await fetch('http://localhost:3500/courses');
 const response = await data.json();
 return response;
}

export default function Newcourse() {
 const [name, setName] = useState("");
 const [url, setURL] = useState("");
 const [level, setLevel] = useState("Beginner");
 const [subject, setSubject] = useState("");
 const [courses, setCourses] = useState();
 const [courselist, setCourselist] = useState({ courses: [], isFetching: false });
 const [checkboxState, setCheckboxState] = useState(null);

 const [subs, setSubs] = useState([]);

 const [showModal, setShowModal] = useState(false);

 const changeName = (value) => {
  setName(name + value)
 }

 const changeURL = (value) => {
  setURL(url + value)
 }

 const changeSubject = (value) => {
  setSubject(subject)
 }

 const changeLevel = (value) => {
  setLevel(value)
 }

 // Render the component for the basic course information
 const stepOne = () => {
  return <BasicInfo handleSubmit={handleNext} nameChange={changeName} urlChange={changeURL} subjectChange={changeSubject} levelChange={changeLevel} subject={subject} subs={subs} />
 }

 const preCourses = () => {

  return <SelectCourses courselist={courses} checkboxState={checkboxState} onCheckbox={onCheckbox} onClose={(e) => { e.preventDefault(); }} title="Pre-requisites" />
 }

 const postCourses = () => {
  return <div>Select follow-up courses</div>
 }
 const [steps, setSteps] = useState([
  { key: 'basicInfo', label: 'Basic information', isDone: true, component: stepOne },
  { key: 'before', label: 'Prior courses', isDone: false, component: preCourses },
  { key: 'after', label: 'Follow-up courses', isDone: false, component: postCourses },
 ])

 const [currentStep, setCurrentStep] = useState(steps[0])

 const handleNext = () => {
  console.log('Next called', name, url, level)

  if (steps[steps.length - 1].key === currentStep.key) {
   alert('All done')
   return
  }
  //setName(name)
  const index = steps.findIndex(x => x.key === currentStep.key)
  let newSteps = steps;
  steps[index].isDone = false;
  steps[index + 1].isDone = true;
  setSteps(newSteps)
  setCurrentStep(steps[index + 1])
 }

 const handlePrevious = () => {
  const index = steps.findIndex(x => x.key === currentStep.key)
  let newSteps = steps;
  steps[index].isDone = false;
  steps[index - 1].isDone = true;
  setSteps(newSteps)
  setCurrentStep(steps[index - 1])
 }


 useEffect(() => {
  let mounted = true;
  setCourselist((courselist) => ({ courses: courselist.courses, isFetching: true }));
  const arr = ['Alan', 'Bruce']
  if (mounted) {
   const coursedata = getCourses().then(courses1 => {

    // let coursel = []
    // for (let course in courses1) {
    //  console.log('Check', courses1[course])
    //  coursel.push(courses1[course])
    // }
    // const courses2 = Object.values(Object.keys(courses1).map(key => courses1[key]))

    console.log('Before 1', courselist);
    setCourselist((courselist) => ({ courses: arr, isFetching: true }))
    console.log('Before 2', courselist);
    //setCourses(coursel);
   })
  }
  return () => mounted = false;
 }, [])



 //fetch('http://localhost:3500/courses').then(response => response.json()).then(data => {
 //setCourses(data);
 // console.log('Before 1', data);
 // console.log('Before 2', courses);
 //})

 // getCourseList().then(items => {
 //  if (mounted) {
 //   setCourses(items)
 //   const checkboxes = new Array(items.length).fill(false)
 //   setCheckboxState(checkboxes)
 //   console.log('Courses', courses)
 //  }
 // })
 //  return () => mounted = false;
 // }, [])

 // useEffect(() => {
 //  fetch('http://localhost:3500/subjects').then(response => {
 //   return response.json()
 //  }).then(data => {
 //   setSubs(data)
 //   if (data.length > 0) {

 //   }
 //  })

 // }, [])

 const onCheckbox = (loc) => {
  const newCheckboxState = checkboxState.map((item, index) => (index === loc) ? !item : item)
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
  <div>
   <h2>New course information</h2>
   <section className="step-wizard">
    <ul className="step-wizard-list">
     {
      steps.map((step, index) => {
       return <li key={index} className={`step-wizard-item ${currentStep.key === step.key ? 'current-item' : ''}`}><span className="progress-count">{index + 1}</span><span className="progress-label">{step.label}</span></li>
      }

      )
     }
    </ul>
    {console.log(currentStep.component())}
    {currentStep.component()}

    <div className="buttons">
     <input type="button" value="Back" onClick={handlePrevious} disabled={steps[0].key === currentStep.key} />
     <input type="button" value={steps[steps.length - 1].key !== currentStep.key ? 'Next' : 'Submit'} onClick={handleNext} />

    </div>
   </section>

  </div>
 )


 // return (
 //  <>
 //   <h1>Create a new course</h1>
 //   <form onSubmit={handleSubmit}>
 //    <label>
 //     Course name:
 //     <input type="text" value={name} onChange={(evt) => setName(evt.target.value)}></input>
 //    </label>

 //    <label>
 //     URL:
 //     <input type="text" value={url} onChange={(evt) => setURL(evt.target.value)}></input>
 //    </label>

 //    <label>
 //     Level:
 //     <select value={level} onChange={(evt) => setLevel(evt.target.value)}>
 //      <option value="Beginner" key="beginner">Beginner</option>
 //      <option value="Intermediate" key="intermediate">Intermediate</option>
 //      <option value="Advanced" key="advanced">Advanced</option>
 //     </select>
 //    </label>

 //    <label>
 //     Subject:
 //     <select value={subject} onChange={(evt) => setSubject(evt.target.value)}>
 //      {subs.map((subject) => <option value={subject.name}>{subject.name}</option>)}
 //     </select>
 //     <label>
 //      <button onClick={(e) => { e.preventDefault(); setShowModal(true) }}>Select pre-requisites</button>
 //      <Modal courselist={courses} show={showModal} checkboxState={checkboxState} onCheckbox={onCheckbox} onClose={(e) => { e.preventDefault(); setShowModal(false); }} title="Pre-requisites" />
 //     </label>
 //     <label>
 //      <button>Select follow-ons</button>
 //     </label>
 //    </label>
 //    <input type="submit" />
 //   </form>
 //  </>
 // )
};
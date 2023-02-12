
import React, { useState, useEffect } from 'react';
import { getCourseList, submitNewCourse } from './netfun';
import { BasicInfo } from './coursebasic';
import { SelectCourses } from './selectCourses';
import { ConfirmNewCourse } from './confirmnewcourse';
export default function NewCourse2() {

 const [name, setName] = useState("");
 const [url, setURL] = useState("");
 const [level, setLevel] = useState("Beginner");
 const [subject, setSubject] = useState("");
 const [courses, setCourselist] = useState([{ ID: 1, name: 'None', url: 'None', level: 'Beginner', subject: 'None' }]);
 const [checkboxState, setCheckboxState] = useState(null);
 const [precourses, setPrecourses] = useState([]);
 const [checkboxState2, setCheckboxState2] = useState(null);
 const [postcourses, setPostcourses] = useState([]);
 const [coursefornetwork, setCoursefornetwork] = useState(null)
 const [subs, setSubs] = useState([]);
 const [pre, setPre] = useState([]);
 //const [coursepreview, setCoursePreview] = useState(null);

 const initState = () => {
  setName('')
  setURL('')
  setLevel('Beginner')
  setSubject('')
  setCourselist([])
  setCheckboxState(null)
  setCheckboxState2(null)
  setCurrentStep(0)
 }

 const changeName = (value) => {
  setName(value)
 }

 const changeURL = (value) => {
  setURL(value)
 }

 const changeSubject = (value) => {
  setSubject(subject)
 }

 const changeLevel = (value) => {
  setLevel(value)
 }

 const [steps, setSteps] = useState([
  { key: 0, label: 'Basic information' },
  { key: 1, label: 'Prior courses' },
  { key: 2, label: 'Follow-up courses' },
  { key: 3, label: 'Confirm' }
 ])

 const [currentStep, setCurrentStep] = useState(0);

 const filter = () => {

 }
 const handleNext = () => {
  if (currentStep === 0) {
   // Nothing to do since all state is saved 
  }
  else if (currentStep === 1) {
   // Set pre-requisites
   let pre_input = []
   checkboxState.map((element, index) => {
    if (element) {
     //setPre([...pre, courses[index].ID])
     const course = { name: courses[index].name, ID: courses[index].ID, url: courses[index].url };
     pre_input = [...pre_input, course]
     //setPrecourses([...precourses, course])
    }
    setPre(pre_input.map((course) => {
     return course.ID
    }))
    setPrecourses(pre_input)
   })
   //const newCheckboxState2 = new Array(checkboxState.length).fill(false);
   //setCheckboxState2(newCheckboxState2)

   /*for (let i = 0; i < checkboxState.length; i = i + 1) {
    if (checkboxState[i]) {
     setPre([...pre, courses[i].ID])
    }
   }*/

  }
  else if (currentStep === steps.length - 2) {
   // Store the follow-up courses
   let post = []
   checkboxState2.map((element, index) => {
    if (element) {
     const course = { name: courses[index].name, ID: courses[index].ID, url: courses[index].url };
     post = [...post, course]
    }

   })
   console.log('Did we get it', post)
   setPostcourses(post)
   // Prepare the course data to submit the form
   const new_course = {
    name: name,
    url: url,
    level: level,
    subject: subject,
    pre: precourses,
    post: post,
   }

   setCoursefornetwork(new_course)
   // Display confirmation component
  }
  else if (currentStep === steps.length - 1) {
   let pruned_course = coursefornetwork
   pruned_course.pre = pruned_course.pre.map((course) => { return course.ID })
   pruned_course.post = pruned_course.post.map((course) => { return course.ID })
   submitNewCourse(pruned_course)
   initState();
   return;
  }
  setCurrentStep(currentStep + 1)
 }

 const handlePrevious = () => {
  if (currentStep === 0) {
   return
  }
  setCurrentStep(currentStep - 1)

 }

 const handleSubmit = () => {
  alert('all done 2')
 }

 const onCheckbox = (loc) => {
  const newCheckboxState = checkboxState.map((item, index) => (index === loc) ? !item : item)
  setCheckboxState(newCheckboxState)
 }
 const onCheckbox2 = (loc) => {
  const newCheckboxState = checkboxState2.map((item, index) => (index === loc) ? !item : item)
  setCheckboxState2(newCheckboxState)
 }

 useEffect(() => {
  fetch('http://localhost:3500/subjects').then(response => {
   return response.json()
  }).then(data => {
   setSubs(data)
   setSubject(data[0].name)
   console.log(data)
   if (data.length > 0) {

   }
  })

 }, [])

 useEffect(() => {
  let mounted = true;
  if (mounted) {
   const coursedata = getCourseList().then(courses1 => {
    const newCheckboxState = Array(courses1.length).fill(false)
    setCheckboxState(newCheckboxState)
    const newCheckboxState2 = Array(courses1.length).fill(false)
    setCheckboxState2(newCheckboxState2)
    setCourselist(courses1)
   })
  }
  return () => mounted = false;
 }, [])

 return (
  <div>
   <h2>New course information</h2>
   <section className="step-wizard">
    <ul className="step-wizard-list">
     {
      steps.map((step, index) => {
       return <li key={index} className={`step-wizard-item ${currentStep === step.key ? 'current-item' : ''}`}><span className="progress-count">{index + 1}</span><span className="progress-label">{step.label}</span></li>
      }

      )
     }
    </ul>
    {currentStep === 0 && <BasicInfo handleSubmit={handleNext} nameChange={changeName} urlChange={changeURL} subjectChange={changeSubject} levelChange={changeLevel} subject={subject} subs={subs} />}
    {currentStep === 1 && <SelectCourses courselist={courses} subjects={subs} checkboxState={checkboxState} onCheckbox={onCheckbox} onClose={(e) => { e.preventDefault(); }} title="Pre-requisites" />}
    {currentStep === 2 && <SelectCourses courselist={courses} subjects={subs} checkboxState={checkboxState2} onCheckbox={onCheckbox2} onClose={(e) => { e.preventDefault(); }} title="Follow-ups" />}
    {currentStep === 3 && <ConfirmNewCourse course={coursefornetwork} pre={precourses} post={postcourses} onClose={(e) => { e.preventDefault(); }} title="Preview new course" />}
    <div className="buttons">
     <input type="button" value="Back" onClick={handlePrevious} disabled={0 === currentStep} />
     <input type="button" value={steps.length - 1 !== currentStep ? 'Next' : 'Submit'} onClick={handleNext} />
    </div>
   </section>

  </div>
 )
}
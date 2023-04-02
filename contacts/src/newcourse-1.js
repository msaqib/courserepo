
import React, { useState, useEffect } from 'react';
import { BasicInfo } from './coursebasic';
import { SelectCourses } from './selectCourses';
import { ConfirmNewCourse } from './confirmnewcourse';
export default function NewCourse2(props) {

 const [name, setName] = useState("");
 const [url, setURL] = useState("");
 const [level, setLevel] = useState("Beginner");
 const [subject, setSubject] = useState("");
 const [checkboxState, setCheckboxState] = useState(null);
 const [precourses, setPrecourses] = useState([]);
 const [checkboxState2, setCheckboxState2] = useState(null);
 const [postcourses, setPostcourses] = useState([]);
 const [coursefornetwork, setCoursefornetwork] = useState(null)
 const [pre, setPre] = useState([]);

 const initState = () => {
  setName('')
  setURL('')
  setLevel('Beginner')
  setSubject('')
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
  setSubject(value)
 }

 const changeLevel = (value) => {
  setLevel(value)
 }

 const [currentStep, setCurrentStep] = useState(0);

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
     const course = { name: props.courseList[index].name, ID: props.courseList[index].ID, url: props.courseList[index].url };
     pre_input = [...pre_input, course]
     //setPrecourses([...precourses, course])
    }
    setPre(pre_input.map((course) => {
     return course.ID
    }))
    setPrecourses(pre_input)
   })

  }
  else if (currentStep === steps.length - 2) {
   // Store the follow-up courses
   let post = []
   checkboxState2.map((element, index) => {
    if (element) {
     const course = { name: props.courseList[index].name, ID: props.courseList[index].ID, url: props.courseList[index].url };
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
   props.newCourseHandler(pruned_course)
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

 const onCheckbox = (loc) => {
  const newCheckboxState = checkboxState.map((item, index) => (index === loc) ? !item : item)
  setCheckboxState(newCheckboxState)
 }
 const onCheckbox2 = (loc) => {
  const newCheckboxState = checkboxState2.map((item, index) => (index === loc) ? !item : item)
  setCheckboxState2(newCheckboxState)
 }

 useEffect(() => {
  setSubject(props.subjectsList[0].name)
  const newCheckboxState = Array(props.courseList.length).fill(false)
  setCheckboxState(newCheckboxState)
  const newCheckboxState2 = Array(props.courseList.length).fill(false)
  setCheckboxState2(newCheckboxState2)
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
    {currentStep === 0 && <BasicInfo handleSubmit={handleNext} nameChange={changeName} urlChange={changeURL} subjectChange={changeSubject} levelChange={changeLevel} subject={subject} subs={props.subjectsList} />}
    {currentStep === 1 && <SelectCourses courselist={props.courseList} subjects={props.subjectsList} checkboxState={checkboxState} onCheckbox={onCheckbox} onClose={(e) => { e.preventDefault(); }} title="Pre-requisites" />}
    {currentStep === 2 && <SelectCourses courselist={props.courseList} subjects={props.subjectsList} checkboxState={checkboxState2} onCheckbox={onCheckbox2} onClose={(e) => { e.preventDefault(); }} title="Follow-ups" />}
    {currentStep === 3 && <ConfirmNewCourse course={coursefornetwork} pre={precourses} post={postcourses} onClose={(e) => { e.preventDefault(); }} title="Preview new course" />}
    <div className="buttons">
     <input type="button" value="Back" onClick={handlePrevious} disabled={0 === currentStep} />
     <input type="button" value={steps.length - 1 !== currentStep ? 'Next' : 'Submit'} onClick={handleNext} />
    </div>
   </section>

  </div>
 )
}
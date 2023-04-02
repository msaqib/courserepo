import React, { useEffect } from 'react';
import { useState } from 'react';

import { FilterCourses } from './filtercourses';
export default function All(props) {


  return (
    <>
      <h2>Course list</h2>
      <div className="course-list">
        <FilterCourses courselist={props.courseList} subjects={props.subjectsList} delHandler={props.delHandler} />
      </div>
    </>
  );
};
export function getCourseList() {
 return fetch('http://localhost:3500/courses').then(data => data.json())
}

export function submitNewCourse(course) {
 console.log('Sending ', course)
 return fetch('http://localhost:3500/course', {
  method: 'POST',
  body: JSON.stringify(course),
  headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json'
  }
 }).then(response => response.json());
}

export function getSubjectList() {
 return fetch('http://localhost:3500/subjects').then(response => response.json())
}

export function deleteCourse(id) {
 const url = `http://localhost:3500/deletesubject`;
 return fetch(url, {
  "method": "POST",
  body: JSON.stringify({ id: id }),
  headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json'
  }
 }).then(response => response.json())
}
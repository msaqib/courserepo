export function getCourseList() {
 return fetch('http://localhost:3500/courses').then(data => data.json())
}

export function submitNewCourse(course) {
 console.log('Sending ', course)
 fetch('http://localhost:3500/course', {
  method: 'POST',
  body: JSON.stringify(course),
  headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json'
  }
 }).then(function (response) {
  console.log(response)
  return response.json();
 });
}
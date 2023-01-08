export function getCourseList() {
 return fetch('http://localhost:3500/courses').then(data => data.json())
}
export function BasicInfo(props) {
 return (<form className="course-data" onSubmit={props.handleSubmit}>
  <label>
   Course name:
   <input type="text" value={props.name} onChange={(evt) => props.nameChange(evt.target.value)}></input>
  </label>

  <label>
   URL:
   <input type="text" value={props.url} onChange={(evt) => props.urlChange(evt.target.value)}></input>
  </label>

  <label>
   Level:
   <select value={props.level} onChange={(evt) => props.levelChange(evt.target.value)}>
    <option value="Beginner" key="beginner">Beginner</option>
    <option value="Intermediate" key="intermediate">Intermediate</option>
    <option value="Advanced" key="advanced">Advanced</option>
   </select>
  </label>

  <label>
   Subject:
   <select value={props.subject} onChange={(evt) => props.subjectChange(evt.target.value)}>
    {props.subs.map((subject, index) => <option key={index} value={subject.name}>{subject.name}</option>)}
   </select>
  </label>
 </form>)
}
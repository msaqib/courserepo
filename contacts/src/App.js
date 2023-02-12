import React from "react";
import "./styles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import Card from "./contactcard";
import Newcourse2 from "./newcourse-1";
import Newsubject from "./newsubjects";
import Navbar from "./NavElements";
import All from './all'

const App = () => {
  return (
    <>
      <Navbar />
      <div className="courses">
        <Routes>
          <Route path='/' element={<All />} />
          <Route path='/newcourse' element={<Newcourse2 />} />
          <Route path='/newsubject' element={<Newsubject />} />
        </Routes>
      </div>
    </>
  )
}

// const App = () => {
//   const loadContacts = new XMLHttpRequest();
//   loadContacts.open('GET', 'http://localhost:3500/contacts', false)
//   loadContacts.send();

//   const contacts = JSON.parse(loadContacts.responseText)
//   return (
//     <>
//       {contacts.map(
//         contact => {
//           return <Card avatar="https://via.placeholder.com/150"
//             name={contact.name}
//             email={contact.email}
//             age={contact.age}
//           />
//         }
//       )}
//     </>

//   );
// }



export default App;
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = express.Router();
const path = require('path')
const app = express()
const db = require('./db')
const port = 3500;

let contacts = [];
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.post('/course', (req, res) => {
 const course = req.body;
 //console.log('Body', course)
 //contacts.push(contact)
 db.serialize(function () {
  db.run(
   `INSERT into courses values(NULL, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`, course.name, course.url, course.level, course.subject,
   function (error) {
    if (error) {
     return console.error(error)
    }
    console.log('Course added to database')
   }
  )
 })
 res.send('Course is added to the database')
})

router.post('/newsubject', (req, res) => {
 const subject = req.body;
 console.log('Inserting new subject', subject)
 // Process the new subject, then process each sub-topic one by one.
 const subname = subject.name;
 const subtopics = subject.subtopics;

 insertsql = `INSERT INTO subjects values(NULL, ?)`;

 db.run(insertsql, [subname], (err) => {
  if (err) {
   return console.error(err)
  }
  nextsql = `INSERT INTO SUBTOPICS values(NULL, ?)`;
  console.log(subtopics)
  subtopics.forEach(subtopic => {
   db.run(nextsql, subtopic, (err) => {
    if (err) {
     return console.error(err)
    }
    junctionsql = `INSERT INTO subjectssubtopics values (?, ?)`;
    db.run(junctionsql, [subname, subtopic], (err) => {
     if (err) {
      console.error(err)
     }
     console.log('Created the junction ', subname, subtopic)
    })
   })
  })

 })

 res.send(JSON.stringify({ status: 'Subject and subtopics are added to the database' }))
})

router.get('/subjects', (req, res) => {
 console.log('Fetching subjects')
 st = []
 db.serialize(function () {
  db.all("SELECT name from subjects", function (error, rows) {
   if (error) {
    console.log(error)
   }
   console.log(rows)
   res.send(rows)
  }
  )
 })


})

router.get('/subtopics', (req, res) => {
 console.log('Fetching subtopics')
 st = []
 db.serialize(function () {
  db.all("SELECT name from subtopics", function (error, rows) {
   if (error) {
    console.log(error)
   }
   res.send(rows)
  }
  )
 })


})

router.post('/checksubject', (req, res) => {
 const subjectName = req.body;
 console.log('Checking subject: ', subjectName.name);
 db.serialize(function () {
  console.log('Checking subject 2: ', subjectName.name);
  db.all("select * from subjects where subjects.name = '" + subjectName.name + "'", function (err, row) {
   console.log(row);
   if (row.length === 0) {
    res.send(JSON.stringify({ status: 'New' }));
   } else {
    console.log('Duplicate subject entry')
    res.send(JSON.stringify({ status: 'Duplicate' }));
   }
  })
 })
});

router.post('/deletesubject', (req, res) => {
 const courseid = req.body;
 console.log('Deleting course ID ', courseid.id);
 db.serialize(function () {
  console.log('Deleting course: ', courseid.id);
  db.all("delete from courses where courses.id = '" + courseid.id + "'", function (err, row) {
   console.log(row);
   if (row.length === 0) {
    res.send(JSON.stringify({ status: 'Deleted' }));
   } else {
    console.log("Couldn't delete course")
    res.send(JSON.stringify({ status: 'Couldnt' }));
   }
  })
 })
});

router.get('/courses', (req, res) => {
 let contacts = []
 db.serialize(function () {
  db.all('SELECT * from courses', function (error, row) {
   if (error) {
    console.log(error)
   }
   res.send(row)
  })
 })
});


router.get('/course/:name', (req, res) => {
 const name = req.params.name
 let list = []
 for (let course of courses) {
  if (course.name.includes(name)) {
   list.push(course)
  }
 }
 res.json(list)
})

app.use('/', router);

app.listen(port, () => console.log(`Course data app listening on port ${port}!`))
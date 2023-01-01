const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const filepath = './coursesv3.db'

function connect() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath)
  }
  else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message)
      }
      createTable();
      console.log('Connected to Sqlite database');
    })
  }
}

function createTable() {
  const db = new sqlite3.Database(filepath, (err) => {
    if (err) {
      console.log("Getting error " + err);
      exit(1);
    }
    db.exec(
      `
   CREATE TABLE courses
   (
     ID       INTEGER PRIMARY KEY AUTOINCREMENT,
     name       VARCHAR(100) NOT NULL,
     url        VARCHAR(500) NOT NULL,
     level        VARCHAR(15) NOT NULL,
     subject    VARCHAR(500) NOT NULL,
     prereq1    INT,
     prereq2    INT,
     prereq3    INT,
     prereq4    INT,
     follow1    INT,
     follow2    INT,
     follow3    INT,
     follow4    INT
   );
   CREATE TABLE subjects 
   (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(500) NOT NULL collate nocase unique
   );
   CREATE TABLE subtopics
   (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(500) NOT NULL collate nocase unique
   );
   CREATE TABLE subjectssubtopics
   (
    subjectid INTEGER references subjects(ID),
    subtopicid INTEGER references subtopics(ID),
    PRIMARY KEY (subjectid, subtopicid)
   );
 `
    );
  });


}


module.exports = connect();

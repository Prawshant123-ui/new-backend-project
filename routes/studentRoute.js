// const express = require('express');
// const path = require('path');

// const studentRouter = express.Router();
// const addedStudents = [];

// // Show Add Student Form
// studentRouter.get('/add', (req, res) => {
//   res.render('addStudent'); // EJS form
// });

// // Handle Form Submission
// studentRouter.post('/add', (req, res) => {
//   const {
//     studentName,
//     studentAge,
//     studentClass,
//     studentRollNo,
//     studentGender,
//     studentAddress
//   } = req.body;

//   // Minimal validation
//   if (!studentName || !studentRollNo) {
//     return res.status(400).render('errorPage', { message: 'Invalid student input' });
//   }

//   addedStudents.push({
//     name: studentName,
//     age: studentAge,
//     class: studentClass,
//     rollNo: studentRollNo,
//     gender: studentGender,
//     address: studentAddress
//   });

//   res.render('successPage', { type: 'Student' });
// });

// module.exports = {
//   studentRouter,
//   addedStudents
// };





















const express = require('express');
const path = require('path');

const studentRouter = express.Router();
const addedStudents = [];

// Show Add Student Form
studentRouter.get('/add', (req, res) => {
  res.render('addStudent');
});

// Handle Form Submission
studentRouter.post('/add', (req, res) => {
  const {
    studentName,
    studentAge,
    studentClass,
    studentRollNo,
    studentGender,
    studentAddress
  } = req.body;

  if (!studentName || !studentRollNo) {
    return res.status(400).render('errorPage', { message: 'Invalid student input' });
  }

  addedStudents.push({
    name: studentName,
    age: studentAge,
    class: studentClass,
    rollNo: studentRollNo,
    gender: studentGender,
    address: studentAddress
  });

  res.render('successPage', { type: 'Student' });
});

// 🔥 DELETE STUDENT (USING INDEX)
studentRouter.post('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (!isNaN(index) && index >= 0 && index < addedStudents.length) {
    addedStudents.splice(index, 1);
  }

   res.redirect('/studentsPage'); // make sure this route renders the list
});

module.exports = {
  studentRouter,
  addedStudents
};

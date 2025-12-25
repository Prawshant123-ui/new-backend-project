const express = require('express');
const path = require('path');

const teacherRouter = express.Router();
const addedTeachers = [];

// Show Add Teacher Form
teacherRouter.get('/add', (req, res) => {
  res.render('addTeacher'); // EJS form
});

// Handle Form Submission
teacherRouter.post('/add', (req, res) => {
  const {
    teacherName,
    teacherAge,
    teacherIdNo,
    teacherAddress,
    teacherPhoneNo,
    teacherGender,
    teacherSubject
  } = req.body;

  // Minimal validation
  if (!teacherName || !teacherIdNo || !teacherSubject) {
    return res.status(400).render('errorPage', { message: 'Invalid teacher input' });
  }

  addedTeachers.push({
    name: teacherName,
    age: teacherAge,
    idNo: teacherIdNo,
    address: teacherAddress,
    phoneNo: teacherPhoneNo,
    gender: teacherGender,
    subject: teacherSubject
  });

  res.render('successPage1', { type: 'Teacher' });
});

// 🔥 DELETE STUDENT (USING INDEX)
teacherRouter.post('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (!isNaN(index) && index >= 0 && index < addedTeachers.length) {
    addedTeachers.splice(index, 1);
  }

   res.redirect('/teachersPage'); // make sure this route renders the list
});

module.exports = {
  teacherRouter,
  addedTeachers
};

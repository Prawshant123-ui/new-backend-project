const express = require('express');
const path = require('path');

const { studentRouter, addedStudents } = require('./routes/studentRoute');
const { teacherRouter, addedTeachers } = require('./routes/teacherRoute');

const app = express();

/* =======================
   View Engine Configuration
======================= */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* =======================
   Global Middleware
======================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public'), { index: false }));


//chart view in homepage
app.get('/', (req, res) => {
  res.render('homePage', {
    studentCount: addedStudents.length,
    teacherCount: addedTeachers.length
  });
});

/* =======================
   Core Routes
======================= */

// Home
app.get('/', (req, res) => {
  res.render('homePage');
});

// Student routes → /students/*
app.use('/students', studentRouter);

// Teacher routes → /teachers/*
app.use('/teachers', teacherRouter);

/* =======================
   Data View Pages
======================= */

// View students list
app.get('/studentsPage', (req, res) => {
  res.render('studentPage', { addedStudents });
});

// View teachers list
app.get('/teachersPage', (req, res) => {
  res.render('teacherPage', { addedTeachers });
});

/* =======================
   404 Handler (LAST)
======================= */
app.use((req, res) => {
  res.status(404).render('404Page');
});

/* =======================
   Server Bootstrap
======================= */
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server live at http://localhost:${PORT}`);
});









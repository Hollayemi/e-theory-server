require('dotenv').config();
const express = require('express');
const router = require('./Router');
const cors = require('cors');
const connectDB = require('./Router/db');
// const morgan = require('morgan');
const PORT = process.env.PORT || 3020;



const app = express()

// app.use(router);
app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


connectDB()

app.get("/", router.getRoute);
app.post('/student/register', router.registerStudent);
app.post("/staff/register", router.registerStaff)
app.post('/student/login', router.loginHandler);
app.post('/staff/login', router.staffLoginHandle);

app.post('/result/upload', router.saveResults);
// app.put('/result/update', router.updateResult);

// app.get('/results', router.results);
// app.get('/results/student', router.getStudentResults);
// app.get('/result/:code', router.getIndividualResult);
// app.get('/results/:code', router.courseResults);

app.post('/question', router.loadQuestion);
app.get('/question', router.getQuestion);
app.get('/questions/:code', router.getExamQuestions);
app.put('/exam/start/:code', router.startExam);

app.get('/courses', router.getCourse); // endpoint gets all available courses and registered Students
app.get('/courses/student/:code',router.confirmRegistration);
app.post('/courses/register',router.registerCourse);


app.listen(PORT, () => console.log(`Server started at ${PORT}`));

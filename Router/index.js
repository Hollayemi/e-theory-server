const express = require('express');
const router = express.Router();
const questions = require('./services/questionsHandler');
const register = require('./services/registrationhandle');
const login = require('./services/loginHandle');
const answers = require('./services/answers');
const courses = require("./services/courses");

const getRoute = router.get('/', (req, res) =>{
  res.send('app working fine...');
});


//Begining of Registration handle for both staff and students
const registerStaff = (req, res) => {register.staff(req, res)};
const registerStudent = (req, res) =>{register.student(req, res)};

//Login Authentication handle
const loginHandler = (req, res) => {login.student(req, res)};
const staffLoginHandle = (req, res) => {login.staff(req, res)};

//Student module services
const saveResults = (req, res) => {answers.saveResults(req, res)};
// const getStudentResults = (req, res) => {result.studentResult(req, res)};
// const getIndividualResult = (req, res) => {result.specificResult(req, res)};
// const updateResult = (req, res) => {result.updateSingleResult(req, res)};
// const results = (req, res) => {result.allResult(req, res)};
// const courseResults = (req, res) => {result.courseResult(req, res)};

//Question uploading and handling services
const getQuestion = (req, res) => {questions.getQuestions(req, res)};
const loadQuestion = (req, res) => {questions.uploadQuestions(req, res)};
const getCourse = (req, res) => {questions.getCourseCodes(req, res)};
const getExamQuestions = (req, res) => {questions.getExamQuestions(req,res)};
const startExam = (req, res) => {questions.startExam(req,res)};
// //courses
const registerCourse = (req,res) => {courses.registerCourse(req,res)};
const confirmRegistration = (req,res) => {courses.confirmRegistration(req,res)};

module.exports = {
  getRoute,
  router,
  registerStaff,
  registerStudent,
  staffLoginHandle,
  loginHandler,
  saveResults,
  // results,
  // getIndividualResult,
  // getStudentResults,
  // updateResult,
  getQuestion,
  loadQuestion,
  getExamQuestions,
  startExam,
  getCourse,
  confirmRegistration,
  registerCourse,
  // courseResults,
};
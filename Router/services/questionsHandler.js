const ExamSchema = require("../../models/exams")

const getQuestions = async (req, res) => {
  let exams = await ExamSchema.find({ start: true })
  
    if(!exams) return res.status(422).send("No Question");
    res.status(200).send(exams);
  
}

const uploadQuestions = async (req, res) => {
  const {course, code, quest, ans, keys, lecturerId, exam_code } = req.body;
  console.log(req.body)

  const upload = await ExamSchema({
    lecturerId,
    exam_code,
    course_title: course,
    course_code: code,
    question: quest,
    ans: ans,
    keyword: keys,
  }).save()

  
    if(!upload) return res.status(501).send("Error Uploading");
    console.log(upload); 
    res.status(200).send('Uploaded Successfully.');
  
}

const getCourseCodes = async (req, res) => {
  let query = 'select distinct course_code from exams';
  let exams = await ExamSchema.find().select({ course_code: 1 })
  
    if(!exams || !exams.length) return res.status(422).send("No Question");;;
    console.log(exams);
    res.status(200).send(exams);
  
}

const getExamQuestions = async (req, res) => {
  const {code} = req.params;
  let query = 'select * from exams where Lower(course_code) = $1';
  let exams = await ExamSchema.find({ course_code: code })

  
    if(!exams) return res.status(422).send("No Question");
    res.status(200).send(exams);
  
}
const startExam = async (req, res) => {
  const {code} = req.params;
  console.log(code)
  let query = 'select * from exams where Lower(course_code) = $1';
  let update = await ExamSchema.updateMany({ course_code: code }, {
    $set: { start: true }
  })

  let exams = await ExamSchema.find({ course_code: code })
  
    if(!update) return res.status(422).send("No Question");
    res.status(200).send(exams);
  
}

module.exports= {
  uploadQuestions,
  getQuestions,
  getCourseCodes,
  getExamQuestions,
  startExam,
}
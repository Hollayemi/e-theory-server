const Axios = require("axios")
const AnswerSchema = require("../../models/answers")
const StudentSchema = require("../../models/StudReg")
const ExamSchema = require("../../models/exams")


const saveResults = async (req, res, client) => {
    const { regNo, course_code, answers } = req.body
    const userInfo = await StudentSchema.findOne({ regNo }).lean()   
  
    if(!userInfo) return res.status(422).send("Error: Invalid User");

    let ansObj = {};
    let totalScore = 0;
    const eachAns = Object.values(answers);

    // Calculate total possible score
    const maxScorePerAnswer = 100; // 70 from similarity + 30 from keywords
    const totalPossibleScore = eachAns.length * maxScorePerAnswer;


    // Use Promise.all to wait for all the async operations to complete
    await Promise.all(
        eachAns.map(async (each) => {
            const exam = await ExamSchema.findById(each[0].examId).lean();
            console.log(exam.ans, each[0].ans);

            const response = await Axios.post(
            "https://sentence-relation.onrender.com/similarity",
            {
                sentence1: each[0].ans,
                sentence2: exam.ans,
            }
            );

            let score = response.data?.similarity_percentage?.toFixed()
            const scoreFromSimilarity = (score / 100) * 50;
            const answerWords = each[0].ans.toLowerCase().split(" ");
            const keywordMatches = exam.keyword.filter((keyword) => answerWords.includes(keyword));
            const percentageKeywordsFound = (keywordMatches.length / keywords.length) * 100;
            const scoreFromKeywords = (percentageKeywordsFound / 100) * 50;
            const totalAnswerScore = scoreFromSimilarity + scoreFromKeywords;

            ansObj = { ...ansObj, [each[0].examId]: each[0].ans };
            totalScore += totalAnswerScore;
        })
    );

    console.log(ansObj, "ansObj---");
    const percentageOfTotalScore = (totalScore / totalPossibleScore) * 100;

    console.log(percentageOfTotalScore)


    await AnswerSchema({
    course_code,
    answers: ansObj,
    regNo,
    score: totalScore,
    studentId: userInfo._id,
    }).save();

    return res.status(200).send({ total: percentageOfTotalScore });
  
}
  
module.exports = {
  saveResults,
}
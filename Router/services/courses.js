const CourseRegSchema = require("../../models/courseReg")

const registerCourse = async (req,res, client) => {
  const { code,reg_no} = req.body;
 
  const isExist = await CourseRegSchema.findOne({reg_no, code})
 let query = 'insert into courses (title, code,semester, level, students,reg_no) values($1,$2,$3,$4,$5,$6)';
  let checkQuery = "select * from courses where lower(reg_no) =$1 and lower(code) =$2";
  if(isExist){
      res.send("You've previously registered for this course.");
      return;
    }else{
      await CourseRegSchema(req.body).save()
        res.status(200).send('Registration was Successfully.');
    }
}

const confirmRegistration = async (req, res, client) => {

  console.log(req.params);
  console.log(req.query);
  const {code} = req.params;
  const {regno} = req.query;
  const myReg = await CourseRegSchema({ code: code.toLowerCase(), reg_no: regno })
  // let checkQuery = `select * from courses where Lower(code) ='${code.toLowerCase()}' and Lower(reg_no) ='${regno}'`;
  // select * from courses where Lower(code)='iph 101' and reg_no='esut/2014/155200'

  if(!myReg) throw err;
  console.log(myReg);
  res.send(myReg);
}

module.exports ={
  confirmRegistration,
  registerCourse,
}
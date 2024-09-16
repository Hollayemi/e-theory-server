const StaffSchema = require("../../models/StaffReg")
const StudentSchema = require("../../models/StudReg")

const staff = async (req, res) =>{
  
   const exists = await StaffSchema.findOne({email: req.body.email})
   if(exists){ 
      console.log(err);
      return res.status(422).send("Error: Email already exist.");
    }
  await StaffSchema(req.body).save()
  return res.status(200).send('Registered Successfully!');
}
  
const student = async (req, res, client) =>{
  console.log(req.body)
  const exists = await StudentSchema.findOne({regNo: req.body.regNo})
   if(exists){ 
      console.log(err);
      return res.status(422).send("Error: RegNo already exist.");
    }
  await StudentSchema(req.body).save()
  return res.status(200).send('Registered Successfully!');
}
module.exports = {
  staff,
  student
}

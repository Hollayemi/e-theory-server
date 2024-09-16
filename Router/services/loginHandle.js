const StaffSchema = require("../../models/StaffReg")
const StudentSchema = require("../../models/StudReg")


const student = async (req, res, client) => {
  const userInfo = await StudentSchema.findOne({ regNo:  req.body.userName })    
  
    if(!userInfo) return res.status(422).send("Error: Invalid regNo or password");
    console.log(userInfo);
    return res.status(200).send(userInfo);
  
}
  
const staff = async (req, res, client) => {
  console.log(req.body)
  const staffInfo = await StaffSchema.findOne({ email:  req.body.userName })    
    if(!staffInfo) return res.status(422).send("Error: Invalid regNo or password");
    console.log(staffInfo);
    return res.status(200).send(staffInfo);
}

module.exports = {
  student, 
  staff
}
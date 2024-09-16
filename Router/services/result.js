const upload = (req, res, client) => {
  const {name, regNo, course, code, score} = req.body;
  let query = 'insert into result (name, course_title, course_code, score, reg_no) values($1, $2, $3, $4, $5)';
  client.query(query, [name, course, code, score, regNo], (err, result) => {
    if(err) throw err;
    console.log(result);
    res.status(200).send('Reslt submited!');
  })

}

const courseResult = (req, res, client) => {
  let {code} = req.params;
  let query = 'select * from result where Lower(course_code) = $1';
  client.query(query, [code.toLowerCase()], (err, result) => {
    if(err){
      res.status(400).send("Error: Invalid Parameters Supplied.");
      console.log(err);
      return;
    }
    console.log(result.rows);
    res.status(200).send(result.rows);
  })
}

const specificResult = (req, res, client) => {
  let {code} = req.params;
  const {regno} = req.query;
  let query = 'select * from result where Lower(course_code) = $1 and Lower(reg_no) =$2';
  client.query(query, [code.toLowerCase(),regno.toLowerCase()], (err, result) => {
    if(err){
      res.status(400).send("Error: Invalid Parameters Supplied.");
      console.log(err);
      return;
    }
    console.log(result.rows);
    res.status(200).send(result.rows);
  })
}
const studentResult = (req, res, client) => {
  const {regno} = req.query;
  let query = 'select * from result where Lower(reg_no) =$1';
  client.query(query, [regno.toLowerCase()], (err, result) => {
    if(err) throw err;
    console.log(result.rows);
    res.status(200).send(result.rows);
  })
}
const updateSingleResult = (req, res, client) => {
  const {regNo, code, score} = req.body;
  let query = 'update result set score = $1 where lower(reg_no) = $2 and lower(course_code) = $3';
  client.query(query, [score, regNo.toLowerCase(), code.toLowerCase()], (err, result) => {
    if(err) throw err;
    console.log(result);
    res.status(200).send(result);
  })
}
const allResult = (req, res, client) => {
  let query = 'select * from result';
  client.query(query, (err, result) => {
    if(err) throw err;
    console.log('All result')
    console.log(result.rows)
    res.status(200).send(result.rows);
  })
}
module.exports = {
  upload,
  studentResult,
  specificResult,
  updateSingleResult,
  allResult,
  courseResult,
}
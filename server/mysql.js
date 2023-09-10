const mysql = require("mysql");
const db=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "booklike",
  dateStrings: "date",
})
db.connect((err) => {
  if (err) throw err;
  console.log("DB bağlandı");
});
module.exports=db
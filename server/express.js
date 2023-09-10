const express = require("express");
const app = express();
app.use(express.json());

//dotenv
require("dotenv").config();

//port
const port = process.env.PORT || 8080;

//cors
const cors = require("cors");
var corsOption = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOption))
app.listen(port, () => {
  console.log(`Uygulama ${port} üzerinden dinleniyor`);
});

module.exports = app;

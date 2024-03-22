const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');
//const userMiddleware = require('./middleware/middleware')

dotenv.config({ path: "./config.env" });

require("./db/conn");

//give the () ..
app.use(express.json());

app.use(cors());
app.use(cookieParser());
//app.use(userMiddleware);

app.use(require("./router/auth"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

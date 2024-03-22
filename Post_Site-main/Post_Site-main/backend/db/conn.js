const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("Success"))
  .catch((err) => console.log(err));

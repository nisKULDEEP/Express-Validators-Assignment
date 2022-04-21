const express = require("express");
const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect(
    "mongodb+srv://niskuldeep:asd123@masai.juuyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(console.log("DB connect"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is live");
});

const express = require("express");
const { body, validationResult } = require("express-validator");
// const bodyParser = require("body-parser");
const User = require("./model/userModel");

const app = express();

app.use(express.json());

app.post(
  "/user",
  body("first_name")
    .isLength({ min: 1 })
    .withMessage("First Name is compulsory"),
  body("last_name").isLength({ min: 1 }).withMessage("last_name is compulsory"),
  body("email").isEmail().withMessage("email is compulsory"),
  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("pincode is compulsory"),
  body("gender").isLength({ min: 3 }).withMessage("gender is compulsory"),
  body("age").isLength({ min: 1 }).withMessage("age is compulsory"),
  async (req, res, next) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(400).json({
          status: "validation error",
          data: error,
        });
      }
      const data = await User.insertMany(req.body);
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        error,
      });
    }
    next();
  }
);

app.get("/users", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.find({ _id: id });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const data = await User.findByIdAndUpdate({ _id: id }, body);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
});
module.exports = app;

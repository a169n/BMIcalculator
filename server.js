const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const { connectDB } = require("./config/db");
const BMI = require("./models/bmiSchema");

connectDB();

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.post("/", async (req, res) => {
  const { name, height, weight, age, gender, bmi, category, unitSystem } =
    req.body;

  const isMale = gender === "male";

  const user = new BMI({
    name,
    height,
    weight,
    age,
    isMale,
    bmi,
    category,
    unitSystem,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});




app.get("/history", (req, res) => {
  res.status(200).sendFile(__dirname + "/history.html");
});

app.get("/users", async (req, res) => {
  const users = await BMI.find();
  res.status(200).json(users);
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await BMI.findByIdAndDelete(userId);
  res.status(200).json(deletedUser);
});

app.delete("/users", async (req, res) => {
  const deletedUsers = await BMI.deleteMany();
  res.status(200).json(deletedUsers);
});

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);

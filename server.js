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
  const { name, height, weight, age, gender, unitSystem } = req.body;

  let bmi;

  if (unitSystem === "metric") {
    bmi = weight / (height / 100) ** 2;
  } else if (unitSystem === "imperial") {
    bmi = (weight / height ** 2) * 703;
  } else {
    return res.status(400).json({ error: "Invalid unit system" });
  }

  const bmiCategory = getBMICategory(bmi);

  const user = new BMI({
    name,
    height,
    weight,
    age,
    isMale: gender === "male",
    bmi,
    category: bmiCategory,
    unitSystem,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}
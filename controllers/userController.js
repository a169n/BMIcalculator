const BMI = require("../models/bmiSchema");

const getUsers = async (req, res) => {
  const users = await BMI.find();
  res.status(200).json(users);
};

const postUser =  async (req, res) => {
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
}

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

module.exports = { getUsers, postUser };

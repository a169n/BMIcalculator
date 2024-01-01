const mongoose = require("mongoose");

const BMISchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    age: {
      type: Number,
    },
    isMale: {
      type: Boolean,
    },
    bmi: {
      type: Number,
    },
    category: {
      type: String,
    },
    unitSystem: {
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("BMI", BMISchema);

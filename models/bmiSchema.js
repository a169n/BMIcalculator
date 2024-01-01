const mongoose = require("mongoose");

const BMISchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    isMale: {
      type: Boolean,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("BMI", BMISchema);

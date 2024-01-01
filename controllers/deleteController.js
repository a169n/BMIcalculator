const BMI = require("../models/bmiSchema");

const deleteById = async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await BMI.findByIdAndDelete(userId);
  res.status(200).json(deletedUser);
};

const deleteAll = async (req, res) => {
  const deletedUsers = await BMI.deleteMany();
  res.status(200).json(deletedUsers);
}

module.exports = { deleteById, deleteAll };

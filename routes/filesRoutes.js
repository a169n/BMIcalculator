const express = require("express");
const router = express.Router();

const {
  getCSS,
  getIndexHTML,
  getHistoryHTML,
} = require("../controllers/fileController");

router.get("/index", getIndexHTML);
router.get("/history", getHistoryHTML);
router.get("/style.css", getCSS);

module.exports = router;

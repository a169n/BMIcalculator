const getIndexHTML = (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
};

const getCSS = (req, res) => {
  res.sendFile(__dirname + "/style.css");
};

const getHistoryHTML = (req, res) => {
  res.status(200).sendFile(__dirname + "/history.html");
};

module.exports = { getIndexHTML, getCSS, getHistoryHTML };

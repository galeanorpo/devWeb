const connection = require("../models/db");

module.exports.login = (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);
  console.log(password);
  const consult = "SELECT * FROM login WHERE userName = ? AND password = ?";
  try {
    connection.query(consult, [userName, password], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        console.log(result);
        res.send(result);
      } else {
        console.log(result);
        res.send({ message: "wrong user" });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

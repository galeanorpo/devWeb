const connection = require("../models/db");
const jwt = require("jsonwebtoken");

module.exports.login = (req, res) => {
  const { userName, password } = req.body;
  const consult = "SELECT * FROM login WHERE userName = ? AND password = ?";
  try {
    connection.query(consult, [userName, password], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        const token = jwt.sign({ userName }, "Stack", {
          expiresIn: "3m",
        });

        console.log(result);
        res.send({ token });
      } else {
        console.log(result);
        res.send({ message: "wrong user" });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

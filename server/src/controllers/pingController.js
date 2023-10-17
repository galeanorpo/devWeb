const connection = require("../models/db");

module.exports.ping = (req, res) => {
  const query = "select * from login";
  try {
    connection.query(query, (err, res) => {
      console.log(res);
    });
  } catch (e) {
    console.log(e);
  }
};

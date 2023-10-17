const express = require("express");
const app = express();
const port = 3000;
const routes = require("./api/endPoint");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
  })
);
app.use("/", routes);

app.listen(port, () => {
  console.log("app listen in a port 3000");
});

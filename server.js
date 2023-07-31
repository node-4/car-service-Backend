const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const compression = require("compression");
const serverless = require("serverless-http");
const app = express();
// const { errorHandler } = require("./utils/errors");

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const morgan = require("morgan");
app.use(cors());
app.use(morgan("tiny"));

if (process.env.NODE_ENV == "production") {
  console.log = function () {};
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", require("./routes/routes"));
// app.use(errorHandler);
app.all("*", (req, res, next) => {
  res.send("This Route is not registered!! ❗");
});
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
// console.log(process.env.DB_URL);
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB "))
  .catch((err) =>
    console.error("Error occurred while connecting to MongoDB Atlas...\n", err)
  );

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});

module.exports = { handler: serverless(app) };

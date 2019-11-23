/* eslint-disable no-console */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const candidateRoute = require("./routes/candidate.route");
const placeRoute = require("./routes/place.route");
const voterRoute = require("./routes/voter.route");
const voteRoute = require("./routes/vote.route");
const chargeRoute = require("./routes/charge.route");
const partyRoute = require("./routes/party.route");

const database = { url: process.env.DB_LOCAL, server: "local" };

mongoose.set("useCreateIndex", true);
mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to ${database.server} database`);
  });

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/candidate", candidateRoute);
app.use("/api/place", placeRoute);
app.use("/api/voter", voterRoute);
app.use("/api/vote", voteRoute);
app.use("/api/charge", chargeRoute);
app.use("/api/party", partyRoute);

const port = 5000;
app.listen(port);
console.log(`Server listening: ${port}`);

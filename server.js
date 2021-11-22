require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost:workingAuthDB";
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("api is connected");
  })
  .catch((err) => {
    console.log("not connected");
  });

app.get("/", (req, res) => {
  res.send("api is ready to work");
});

app.use("/api", require("./Route/Router"));
app.use("/api/post", require("./PrivateRoute"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

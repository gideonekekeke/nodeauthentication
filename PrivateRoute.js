const express = require("express");
const router = express.Router();
const verify = require("./VerifyToken");
router.get("/", verify, async (req, res) => {
  res.send("welcome to home screen");
});

module.exports = router;

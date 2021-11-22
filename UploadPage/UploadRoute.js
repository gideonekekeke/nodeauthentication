const products = require("../UploadPage/UploadSchema");
const express = require("express");

const router = express.Router();

router.post("/prod", async (req, res) => {
  try {
    const postProducts = await products.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.status(200).json(postProducts);
  } catch (err) {
    res.status(404).json("cannot upload product");
  }
});

router.get("/prods", async (req, res) => {
  try {
  }
});

module.exports = router;

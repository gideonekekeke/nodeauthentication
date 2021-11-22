const mongoose = require("mongoose");

const mySchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },

  price: {
    type: Number,
  },
});

module.exports = mongoose.model("products", mySchema);

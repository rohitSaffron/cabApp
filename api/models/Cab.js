const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cabSchema = new Schema(
  {
    userId:{
      type:String,
    },
    carModel: {
      type: String,
      required: [true, "plz add cab_Modal"],
    },
    luggage: {
      type: String,
      required: [true, "plz add Luggage Space"],
    },
    seats: {
      type: String,
      required: [true, "plz add Available Seats"],
    },
    price: {
      type: String,
      required: [true, "plz add Price Per Hour"],
    },
    cabImage: {
      type: String,
      required: [true, "plz add Car Image Url"],
    },
  },
  { timestamps: true }
);

const Cab = mongoose.model("Cab", cabSchema);
module.exports = Cab;
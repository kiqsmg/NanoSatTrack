import mongoose from "mongoose";

const DateSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    min: 1,
    max: 100,
  },
  satellite_id: String,
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
  },
  minute: {
    type: Number,
    required: true,
  },
  second: {
    type: Number,
    required: true,
  },
});

const Date = mongoose.model("Date", DateSchema);
export default Date;
import mongoose from "mongoose";

const DateSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  hour: {
    type: Number,
    required: true
  },
  minute: {
    type: Number,
    required: true
  },
  second: {
    type: Number,
    required: true
  }
});

const Date = mongoose.model("Date", DateSchema);
export default Date;
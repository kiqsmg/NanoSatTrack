import mongoose from "mongoose";

const DateSchema = new mongoose.Schema(
  {
    Id: String,
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number,
    second: Number,
  }
);

const Date = mongoose.model("Date", DateSchema);
export default Date;
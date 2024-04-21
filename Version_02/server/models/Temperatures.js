import mongoose from "mongoose";

const DateSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    min: 1,
    max: 100,
  },
  date_id: [
    {
      type: [mongoose.Types.ObjectId],
      ref: "Date",
    },
  ],
  eps_temperature: {
    type: Number,
    required: true,
  },
  battery_temperature: {
    type: Number,
    required: true,
  },

});

const Date = mongoose.model("Date", DateSchema);
export default Date;
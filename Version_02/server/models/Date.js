import mongoose from "mongoose";

const DateSchema = new mongoose.Schema({
  satellite_id: { type: mongoose.Types.ObjectId, ref: "Satellite" },
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
},
{ timestamps: true },
);

const Date = mongoose.model("Date", DateSchema);
export default Date;
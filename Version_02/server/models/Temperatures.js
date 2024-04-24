import mongoose from "mongoose";

const TemperatureSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    min: 1,
    max: 100,
  },
  date_id: [
    {
      type: [mongoose.Types.ObjectId],
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

const Temperature = mongoose.model("Temperature", TemperatureSchema);
export default Temperature;
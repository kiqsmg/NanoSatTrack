import mongoose from "mongoose";

const TemperatureSchema = new mongoose.Schema({
  date_id: { type: mongoose.Types.ObjectId, ref: "Date" },

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
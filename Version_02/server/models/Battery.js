import mongoose from "mongoose";

const BatterySchema = new mongoose.Schema({
  date_id: { type: mongoose.Types.ObjectId, ref: "Battery_overall" },

  battery_cell_1_voltage: {
    type: Number,
    required: true,
  },
  battery_cell_2_voltage: {
    type: Number,
    required: true,
  },
  battery_current: {
    type: Number,
    required: true,
  },
  battery_temperature: {
    type: Number,
    required: true,
  },
  battery_charge: {
    type: Number,
    required: true,
  },
  energy_level: {
    type: Number,
    required: true,
  },
},
{ timestamps: true },
);

const BatteryOverall = mongoose.model("Battery_overall", BatterySchema);
export default BatteryOverall;
import mongoose from "mongoose";

const SolarPanelsSchema = new mongoose.Schema({
  date_id: { type: mongoose.Types.ObjectId, ref: "SolarPanels" },

  sp_01_current: {
    type: Number,
    required: true,
  },
  sp_02_current: {
    type: Number,
    required: true,
  },
  sp_03_current: {
    type: Number,
    required: true,
  },
  sp_04_current: {
    type: Number,
    required: true,
  },
  sp_05_current: {
    type: Number,
    required: true,
  },
  sp_06_current: {
    type: Number,
    required: true,
  },

});

const SolarPanels = mongoose.model("SolarPanels", SolarPanelsSchema);
export default SolarPanels;
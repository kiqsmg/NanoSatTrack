import mongoose from "mongoose";

const FloripaSatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
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
    minute: {
      type: Number,
      required: true,
    },
    second: {
      type: Number,
      required: true,
    },
    battery_cell_1_voltage: {
      type: Number,
      required: true,
    },
    battery_cell_2_voltage: {
      type: Number,
      required: true,
    },
    batery_temperature: {
      type: Number,
      required: true,
    },
    battery_current: {
      type: Number,
      required: true,
    },
    battery_charge: {
      type: Number,
      required: true,
    },
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
    sp_01_02_voltage: {
      type: Number,
      required: true,
    },
    sp_03_04_voltage: {
      type: Number,
      required: true,
    },
    sp_05_06_voltage: {
      type: Number,
      required: true,
    },
    energy_level: {
      type: Number,
      required: true,
    },
    reserved_21: {
      type: String,
    },
    reserved_22: {
      type: String,
    },
    reserved_23: {
      type: String,
    },
    reserved_24: {
      type: String,
    },
    reserved_25: {
      type: String,
    },
    reserved_26: {
      type: String,
    },
    reserved_27: {
      type: String,
    },
    reserved_28: {
      type: String,
    },
    reserved_29: {
      type: String,
    },
    reserved_30: {
      type: String,
    },
    reserved_31: {
      type: String,
    },
    reserved_32: {
      type: String,
    },
    reserved_33: {
      type: String,
    },
    reserved_34: {
      type: String,
    },
    reserved_35: {
      type: String,
    },
    eps_temperature: {
      type: Number,
      required: true,
    },
    satNOGS: {
      type: String,
      required: true,
    },
    callsign: {
      type: String,
      required: true,
    },
    grid_locator: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true },
);

const FloripaSat1Overall = mongoose.model("FloripaSat", FloripaSatSchema);
export default FloripaSat1Overall;
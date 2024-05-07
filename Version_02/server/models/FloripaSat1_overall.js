import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
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
      required: true,
    },
    reserved_22: {
      type: String,
      required: true,
    },
    reserved_23: {
      type: String,
      required: true,
    },
    reserved_24: {
      type: String,
      required: true,
    },
    reserved_25: {
      type: String,
      required: true,
    },
    reserved_26: {
      type: String,
      required: true,
    },
    reserved_27: {
      type: String,
      required: true,
    },
    reserved_28: {
      type: String,
      required: true,
    },
    reserved_29: {
      type: String,
      required: true,
    },
    reserved_30: {
      type: String,
      required: true,
    },
    reserved_31: {
      type: String,
      required: true,
    },
    reserved_32: {
      type: String,
      required: true,
    },
    reserved_33: {
      type: String,
      required: true,
    },
    reserved_34: {
      type: String,
      required: true,
    },
    reserved_35: {
      type: String,
      required: true,
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

const Satellite = mongoose.model("Satellite", UserSchema);
export default Satellite;
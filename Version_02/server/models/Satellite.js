import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    date_id: {
      type: String,
      required: true,
    },
    temperatures_id: {
      type: String,
      required: true,
    },
    sp_temp_id: {
      type: String,
      required: true,
    },
    battery_overall_id: {
      type: String,
      required: true,
    },
    connectivity_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Satellite = mongoose.model("Satellite", UserSchema);
export default Satellite;
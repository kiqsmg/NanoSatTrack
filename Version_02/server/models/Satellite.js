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
    category: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 2,
      max: 300,
    },
    dates: Array,
  },
  { timestamps: true },
);

const Satellite = mongoose.model("Satellite", UserSchema);
export default Satellite;
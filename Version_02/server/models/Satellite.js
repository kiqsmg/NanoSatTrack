import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      min: 2,
      max: 100,
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
      max: 100,
    },
    description: {
      type: String,
      required: true,
      min: 2,
      max: 300,
    },
  },
  { timestamps: true },
);

const Satellite = mongoose.model("Satellite", UserSchema);
export default Satellite;
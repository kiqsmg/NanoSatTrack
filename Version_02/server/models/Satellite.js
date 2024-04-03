import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
  },
  { timestamps: true }
);

const Satellite = mongoose.model("Satellite", UserSchema);
export default Satellite;
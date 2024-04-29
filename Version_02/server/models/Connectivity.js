import mongoose from "mongoose";

const ConnectivitySchema = new mongoose.Schema({
  date_id: { type: mongoose.Types.ObjectId, ref: "Connectivity" },

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

const Connectivity = mongoose.model("Connectivity", ConnectivitySchema);
export default Connectivity;
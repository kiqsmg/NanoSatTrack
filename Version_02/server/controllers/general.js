import Satellite from "../models/Satellite.js";

export const getSatellite = async (req, res) => {
  try {
    const { id } = req.params;
    const satellite = await Satellite.findById(id);
    res.status(200).json(satellite);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
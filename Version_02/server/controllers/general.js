import Satellite from "../models/Satellite.js";

export const getSatellite = async (req, res) => {
  try {
    const { satellite_id } = req.params;
    const satellite = await Satellite.findById(satellite_id);
    res.status(200).json(satellite);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
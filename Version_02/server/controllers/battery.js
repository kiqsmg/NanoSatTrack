import Battery from "../models/Battery.js";

export const getBattery = async (req, res) => {
  try {
    const { satellite_id } = req.params;
    const battery = await Battery.findById(satellite_id);
    res.status(200).json(battery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
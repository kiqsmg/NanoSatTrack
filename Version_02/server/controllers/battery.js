import Battery from "../models/Battery.js";

export const getBattery = async (req, res) => {
  try {
    const battery = await Battery.findById(id);
    res.status(200).json(battery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import BatteryOverall from "../models/Battery.js";

//Battery query
export const getBattery = async (req, res) => {
  try {
    const battery = await BatteryOverall.find();
    res.status(200).json(battery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
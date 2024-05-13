
import BatteryOverall from "../models/Battery.js";
import FloripaSat1Overall from "../models/FloripaSat1.js";

//Battery query
export const getBattery = async (req, res) => {
  try {
    const battery = await BatteryOverall.find();
    res.status(200).json(battery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Downlink query
export const getDownlink = async (req, res) => {
  try {
    const downlink = await FloripaSat1Overall.find();
    res.status(200).json(downlink);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import Battery from "../models/Battery.js";

//const { date_id } = req.params;
//Battery query
export const getBattery = async (req, res) => {
  try {
    const battery = await Battery.findById();
    res.status(200).json(battery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

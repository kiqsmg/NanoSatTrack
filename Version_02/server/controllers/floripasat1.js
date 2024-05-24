
import BatteryOverall from "../models/Battery.js";
import FloripaSat1Overall from "../models/FloripaSat1.js";
//import getCountryIso3 from "country-iso-2-to-3"


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

/*
export const getLocation = async(req, res) => {
  try {
      const users = await User.find()

      const mappedLocations = users.reduce((acc,{ country }) => {
          const countryISO3 = getCountryIso3(country)

          if(!acc[countryISO3]) acc[countryISO3] = 1;
          else acc[countryISO3]++
          return acc
      },{});

      const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
          return { id: country, value: count}
      })

      res.status(200).json(formattedLocations)
  } catch ( error ) {
      res.status(404).json({message: error})
  }
};
*/

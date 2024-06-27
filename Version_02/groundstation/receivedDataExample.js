//remember to install dependencies

const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const csvFilePath = './downlink.csv';

const results = [];


// MongoDB connection URI
const uri = 'mongodb://localhost:27017';  // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function processData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('your_database_name');  // Replace with your database name
    const collection = database.collection('your_collection_name');  // Replace with your collection name

    //This code converts the received csv file to an json file
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        const dataFloripaSat1 = results.map(row => ({
          name: row.name,
          year: parseInt(row.year, 10),
          month: parseInt(row.month, 10),
          day: parseInt(row.day, 10),
          hour: parseInt(row.hour, 10),
          minute: parseInt(row.minute, 10),
          second: parseInt(row.second, 10),
          battery_cell_1_voltage: parseFloat(row.battery_cell_1_voltage),
          battery_cell_2_voltage: parseFloat(row.battery_cell_2_voltage),
          battery_temperature: parseFloat(row.battery_temperature),
          battery_current: parseFloat(row.battery_current),
          battery_charge: parseFloat(row.battery_charge),
          sp_01_current: parseFloat(row.sp_01_current),
          sp_02_current: parseFloat(row.sp_02_current),
          sp_03_current: parseFloat(row.sp_03_current),
          sp_04_current: parseFloat(row.sp_04_current),
          sp_05_current: parseFloat(row.sp_05_current),
          sp_06_current: parseFloat(row.sp_06_current),
          sp_01_02_voltage: parseFloat(row.sp_01_02_voltage),
          sp_03_04_voltage: parseFloat(row.sp_03_04_voltage),
          sp_05_06_voltage: parseFloat(row.sp_05_06_voltage),
          energy_level: parseFloat(row.energy_level, 10),
          reserved_21: row.reserved_21 || "",
          reserved_22: row.reserved_22 || "",
          reserved_23: row.reserved_23 || "",
          reserved_24: row.reserved_24 || "",
          reserved_25: row.reserved_25 || "",
          reserved_26: row.reserved_26 || "",
          reserved_27: row.reserved_27 || "",
          reserved_28: row.reserved_28 || "",
          reserved_29: row.reserved_29 || "",
          reserved_30: row.reserved_30 || "",
          reserved_31: row.reserved_31 || "",
          reserved_32: row.reserved_32 || "",
          reserved_33: row.reserved_33 || "",
          reserved_34: row.reserved_34 || "",
          reserved_35: row.reserved_35 || "",
          eps_temperature: parseFloat(row.eps_temperature),
          satNOGS: row.satNOGS || "-",
          callsign: row.callsign,
          grid_locator: row.grid_locator,
        }));

        // Insert data into MongoDB
        const insertResult = await collection.insertMany(dataFloripaSat1);
        console.log(`${insertResult.insertedCount} documents inserted`);

        // Optionally, you can close the MongoDB connection
        await client.close();
        console.log('Disconnected from MongoDB');
      });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

processData();

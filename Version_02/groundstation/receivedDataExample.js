const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = './downlink.csv';

const jsonData = [];


//First section of the code will verify if the received data is according to expected

fs.createReadStream(csvFilePath).pipe(csv()).on('data', (row) => {
  const jsonObject = {
    name: 'floripaSat1',
    year: parseInt(row.year),
    month: parsetInt(row.month),
    day: parseInt(row.day),
    hour: parseInt(row.hour),
    minute: parseInt(row.minute),
    second: parseInt(row.second),
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
    energy_level: parseInt(row.energy_level),
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
    callsign: row.callsign || "DK3WN",
    grid_locator: row.grid_locator || "JN49lr",
  };

  jsonData.push(jsonObject);
}).on('end', () => {
  console.log('export const dataFloripaSat1 = ', JSON.stringify(jasonData, null, 2));
});


/*
for (let i = 0; i < 20; i++) {
    if (typeof data[i] === 'number') {
      console.log(`Element at index ${i} is a number: ${data[i]}`);
    } else {
      console.log(`Element at index ${i} is not a number: ${data[i]}`);
    }
}
*/

  
//import { getDownlink } from "./floripasat1";
import getDownlink from "../data/index5";
//const gridLocators = getDownlink.map(item => item.callsign);


const countCallsigns = (data) => {
    const callsignCounts = {};

    data.forEach((entry) => {
        const callsign = entry.callsign;
        if (callsign in callsignCounts) {
            callsignCounts[callsign] += 1;
        } else {
            callsignCounts[callsign] = 1;
        }
    });

    return callsignCounts;
};

const callsignCounts = countCallsigns(getDownlink);

Object.entries(callsignCounts).forEach(([callsign, count]) => {
    console.log(`${callsign}- ${count}x`);
});

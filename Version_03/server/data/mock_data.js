// Enhanced FloripaSat-1 Mock Data - Full Year (365 days)
// Based on realistic orbital patterns, battery cycles, and solar panel performance

function generateSatelliteData() {
    const data = [];
    const startDate = new Date(2024, 0, 1); // January 1, 2024
    
    // Realistic ranges based on existing data
    const ranges = {
        battery_cell_1_voltage: { min: 3.58, max: 4.17 },
        battery_cell_2_voltage: { min: 3.59, max: 4.18 },
        battery_temperature: { min: 3.8, max: 16.8 },
        battery_current: { min: -0.20, max: 0.18 },
        battery_charge: { min: 2.8, max: 20.5 },
        sp_current: { min: 0, max: 0.49 },
        sp_voltage: { min: 0, max: 4.9 },
        eps_temperature: { min: 13.0, max: 28.0 }
    };

    // Ham radio callsigns for variety
    const callsigns = [
        "DK3WN", "KB9JHU", "K4KDR", "SQ3XZ", "DL4PD", "KJ7LXJ", 
        "ZR1ADC", "JA5BLZ", "VK2DEE", "SM0TER", "F4HPW", "IZ2UUF",
        "PY2SDR", "LU1EQI", "EA1AKS", "JE9PEL", "HL9DX", "BV1EK"
    ];

    const gridLocators = [
        "JN49lr", "EM69uf", "FM17es", "JO82ik", "JO30cr", "LL34js",
        "PM63uo", "QF22lb", "JO89hp", "KP20ke", "JN23db", "JN55wf",
        "GG66sa", "FF33br", "IN80eo", "PM95pd", "OM48dx", "PL05ai"
    ];

    // Helper functions
    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function addNoise(value, noiseLevel = 0.05) {
        return value + (Math.random() - 0.5) * value * noiseLevel;
    }

    function getSeasonalFactor(dayOfYear) {
        // Seasonal variation: higher in summer, lower in winter (Northern hemisphere bias)
        return 0.85 + 0.3 * Math.sin((dayOfYear - 80) * 2 * Math.PI / 365);
    }

    function getOrbitPhase(dayOfYear, timeOfDay) {
        // Simulate orbital period of ~95 minutes
        const orbitPhase = ((dayOfYear * 24 * 60 + timeOfDay * 60) % 95) / 95;
        return orbitPhase;
    }

    function isEclipse(orbitPhase) {
        // Eclipse occurs roughly 35% of orbital period
        return orbitPhase > 0.32 && orbitPhase < 0.68;
    }

    function getSolarIntensity(orbitPhase, seasonalFactor) {
        if (isEclipse(orbitPhase)) return 0;
        
        // Solar intensity varies with orbit phase and season
        const solarAngle = Math.cos((orbitPhase - 0.5) * Math.PI);
        return Math.max(0, solarAngle * seasonalFactor);
    }

    // Generate 365 days of data
    for (let day = 0; day < 365; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day);
        
        const dayOfYear = day + 1;
        const seasonalFactor = getSeasonalFactor(dayOfYear);
        
        // Random time of day for the data point
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        const second = Math.floor(Math.random() * 60);
        
        const orbitPhase = getOrbitPhase(dayOfYear, hour + minute/60);
        const eclipse = isEclipse(orbitPhase);
        const solarIntensity = getSolarIntensity(orbitPhase, seasonalFactor);
        
        // Battery degradation over time (slight capacity loss)
        const batteryDegradation = Math.max(0.85, 1 - (day / 365) * 0.15);
        
        // Battery charge level (cycles with orbit and degrades over time)
        let batteryChargeBase;
        if (eclipse) {
            // Discharging during eclipse
            batteryChargeBase = 8 + 12 * (1 - orbitPhase / 0.68);
        } else {
            // Charging during sunlight
            const chargePhase = (orbitPhase - 0.68) / 0.32;
            batteryChargeBase = 8 + 12 * Math.min(1, chargePhase + 0.3);
        }
        
        const batteryCharge = clamp(
            addNoise(batteryChargeBase * batteryDegradation, 0.1),
            ranges.battery_charge.min,
            ranges.battery_charge.max
        );

        // Battery voltages correlate with charge level
        const voltageBase = 3.6 + (batteryCharge / 20.5) * 0.57;
        const battery_cell_1_voltage = clamp(
            addNoise(voltageBase, 0.02),
            ranges.battery_cell_1_voltage.min,
            ranges.battery_cell_1_voltage.max
        );
        const battery_cell_2_voltage = clamp(
            addNoise(voltageBase + 0.005, 0.02),
            ranges.battery_cell_2_voltage.min,
            ranges.battery_cell_2_voltage.max
        );

        // Battery current: negative when discharging, positive when charging
        let batteryCurrentBase;
        if (eclipse) {
            batteryCurrentBase = -0.05 - Math.random() * 0.15; // Discharging
        } else {
            batteryCurrentBase = 0.02 + solarIntensity * 0.16; // Charging
        }
        const battery_current = clamp(
            addNoise(batteryCurrentBase, 0.1),
            ranges.battery_current.min,
            ranges.battery_current.max
        );

        // Battery temperature varies with current and environment
        const tempBase = eclipse ? 5 + Math.random() * 6 : 12 + Math.random() * 5;
        const currentHeat = Math.abs(battery_current) * 20;
        const battery_temperature = clamp(
            addNoise(tempBase + currentHeat, 0.15),
            ranges.battery_temperature.min,
            ranges.battery_temperature.max
        );

        // Solar panel currents - individual panel variations
        const panelFactors = [1.0, 0.95, 0.98, 1.02, 0.97, 1.01];
        const baseCurrent = solarIntensity * 0.35;
        
        const sp_currents = panelFactors.map(factor => {
            if (eclipse || Math.random() < 0.1) return 0; // Some panels might be off
            return clamp(
                addNoise(baseCurrent * factor, 0.2),
                0,
                ranges.sp_current.max
            );
        });

        // Solar panel voltages - more stable than current
        const spVoltageBase = eclipse ? 0 : 3.8 + solarIntensity * 1.1;
        const sp_voltages = [
            Math.random() < 0.15 ? 0 : clamp(addNoise(spVoltageBase, 0.1), 0, ranges.sp_voltage.max),
            Math.random() < 0.15 ? 0 : clamp(addNoise(spVoltageBase, 0.1), 0, ranges.sp_voltage.max),
            Math.random() < 0.15 ? 0 : clamp(addNoise(spVoltageBase, 0.1), 0, ranges.sp_voltage.max)
        ];

        // EPS temperature varies with solar exposure and system load
        const epsBaseTemp = 15 + seasonalFactor * 8 + solarIntensity * 5;
        const eps_temperature = clamp(
            addNoise(epsBaseTemp, 0.1),
            ranges.eps_temperature.min,
            ranges.eps_temperature.max
        );

        // Random callsign and grid locator
        const randomCallsign = callsigns[Math.floor(Math.random() * callsigns.length)];
        const randomGrid = gridLocators[Math.floor(Math.random() * gridLocators.length)];
        const satNOGS = Math.random() < 0.7 ? Math.floor(1000000 + Math.random() * 900000).toString() : "-";

        // Create data point
        data.push({
            name: "floripasat1",
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate(),
            hour: hour,
            minute: minute,
            second: second,
            battery_cell_1_voltage: parseFloat(battery_cell_1_voltage.toFixed(5)),
            battery_cell_2_voltage: parseFloat(battery_cell_2_voltage.toFixed(5)),
            battery_temperature: parseFloat(battery_temperature.toFixed(3)),
            battery_current: parseFloat(battery_current.toFixed(6)),
            battery_charge: parseFloat(batteryCharge.toFixed(4)),
            sp_01_current: parseFloat(sp_currents[0].toFixed(6)),
            sp_02_current: parseFloat(sp_currents[1].toFixed(6)),
            sp_03_current: parseFloat(sp_currents[2].toFixed(6)),
            sp_04_current: parseFloat(sp_currents[3].toFixed(6)),
            sp_05_current: parseFloat(sp_currents[4].toFixed(6)),
            sp_06_current: parseFloat(sp_currents[5].toFixed(6)),
            sp_01_02_voltage: parseFloat(sp_voltages[0].toFixed(5)),
            sp_03_04_voltage: parseFloat(sp_voltages[1].toFixed(5)),
            sp_05_06_voltage: parseFloat(sp_voltages[2].toFixed(5)),
            energy_level: 1,
            reserved_21: "",
            reserved_22: "",
            reserved_23: "",
            reserved_24: "",
            reserved_25: "",
            reserved_26: "",
            reserved_27: "",
            reserved_28: "",
            reserved_29: "",
            reserved_30: "",
            reserved_31: "",
            reserved_32: "",
            reserved_33: "",
            reserved_34: "",
            reserved_35: "",
            eps_temperature: parseFloat(eps_temperature.toFixed(4)),
            satNOGS: satNOGS,
            callsign: randomCallsign,
            grid_locator: randomGrid,
        });
    }

    return data;
}

// Generate the data
const received_Data = generateSatelliteData();

// Export processed data arrays for charts (same format as original)

//----------------------------------- Solar Panel data -----------------------------------
export const line_sp_01_current = received_Data.map(item => ({
    value: item.sp_01_current,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().slice(-2)}`
}));

export const line_sp_02_current = received_Data.map(item => ({
    value: item.sp_02_current,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().slice(-2)}`
}));

export const line_sp_03_current = received_Data.map(item => ({
    value: item.sp_03_current,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().slice(-2)}`
}));

export const line_sp_04_current = received_Data.map(item => ({
    value: item.sp_04_current,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().slice(-2)}`
}));

export const line_sp_05_current = received_Data.map(item => ({
    value: item.sp_05_current,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().slice(-2)}`
}));

export const line_sp_06_current = received_Data.map(item => ({
    value: item.sp_06_current,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().slice(-2)}`
}));

export const line_sp_01_02_voltage = received_Data.map(item => ({
    value: item.sp_01_02_voltage,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().padStart(2, '0')}`
}));

export const line_sp_03_04_voltage = received_Data.map(item => ({
    value: item.sp_03_04_voltage,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().padStart(2, '0')}`
}));

export const line_sp_05_06_voltage = received_Data.map(item => ({
    value: item.sp_05_06_voltage,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().padStart(2, '0')}`
}));

//----------------------------------- Battery data -----------------------------------

export const line_battery_cell_1_voltage = received_Data.map(item => ({
    value: item.battery_cell_1_voltage,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().padStart(2, '0')}`
}));

export const line_battery_cell_2_voltage = received_Data.map(item => ({
    value: item.battery_cell_2_voltage,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().padStart(2, '0')}`
}));

export const line_battery_temperature = received_Data.map(item => ({
    value: item.battery_temperature,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().padStart(2, '0')}`
}));

export const line_battery_charge = received_Data.map(item => ({
    value: item.battery_charge,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().padStart(2, '0')}`
}));

export const line_battery_current = received_Data.map(item => ({
    value: item.battery_current,
    label: `${item.day.toString().padStart(2, '0')}-${item.month.toString().padStart(2, '0')}-${item.year.toString().padStart(2, '0')}`
}));

// Export raw data as well
export { received_Data }; 
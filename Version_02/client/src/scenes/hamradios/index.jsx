
import React from "react";
import {
  Box,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";



const Hamradio = () => {

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="20px"
        gap="20px"
      >

        <Box>
          <h1>Ham radio operators </h1>
          <p>The Ham radio community plays a crucial part in ensuring the communication, control, and data collection aspects of CubeSat missions.
             The collaboration of the amateur radio community is important since they not only support the mission technically but also foster a 
             collaborative environment where enthusiasts and professionals alike can contribute to space exploration and research.
          </p>

          <h2 >The Spacelab group thanks all Ham Radio operators who collaborated to the FloripaSat-1 mission.
          </h2>
          
        </Box>
      </Box>
    </Box>
  );
};

export default Hamradio;

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

          <h2 style={{ textAlign: 'center', marginTop: '5rem' }}>
            The Spacelab group thanks all Ham Radio operators who collaborated to the FloripaSat-1 mission.
          </h2>

        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          mt="20px"
        >
          <Box
            style={{
              width: '100px',
              margin: '0 10px',
              textAlign: 'center',
              borderRadius: '10px 10px 0 0',
              padding: '10px',
              backgroundColor: '#ccc',
              height: '120px',
              backgroundColor: 'silver',
            }}
          >
            Carlos
          </Box>
          <Box
            style={{
              width: '100px',
              margin: '0 10px',
              textAlign: 'center',
              borderRadius: '10px 10px 0 0',
              padding: '10px',
              backgroundColor: '#ccc',
              height: '150px',
              backgroundColor: 'gold',
            }}
          >
            Joseph
          </Box>
          <Box
            style={{
              width: '100px',
              margin: '0 10px',
              textAlign: 'center',
              borderRadius: '10px 10px 0 0',
              padding: '10px',
              backgroundColor: '#ccc',
              height: '90px',
              backgroundColor: '#cd7f32', // Bronze color
            }}
          >
            Roberta
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
};

export default Hamradio;

import React from "react";
import {
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
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
          <motion.div
            style={{
              width: '100px',
              margin: '0 10px',
              textAlign: 'center',
              borderRadius: '10px 10px 0 0',
              padding: '5px',
              backgroundColor: '#ffffff',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Box
              style={{
                height: '120px',
                color: '#000000',
                backgroundColor: 'silver',
              }}
            >
              KB9JHU<br/><br/> 5X
            </Box>

          </motion.div>
          <motion.div
            style={{
              width: '100px',
              margin: '0 10px',
              textAlign: 'center',
              borderRadius: '10px 10px 0 0',
              padding: '5px',
              backgroundColor: '#ffffff',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Box
              style={{
                height: '150px',
                color: '#000000',
                backgroundColor: 'gold',
              }}
            >
              DK3WN<br/><br/> 8X
            </Box>
          </motion.div>
          <motion.div
            style={{
              width: '100px',
              margin: '0 10px',
              textAlign: 'center',
              borderRadius: '10px 10px 0 0',
              padding: '5px',
              backgroundColor: '#ffffff',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Box
              style={{
                height: '90px',
                color: '#000000',
                backgroundColor: '#cd7f32', // Bronze color
              }}
            >
              ZR1ADC<br/><br/> 5X
            </Box>
          </motion.div>
        </Box>
        
      </Box>
    </Box>
  );
};

export default Hamradio;
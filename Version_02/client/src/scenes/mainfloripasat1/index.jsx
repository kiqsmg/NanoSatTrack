import React from "react";
import FlexBetween from "components/FlexBetween";
import {
  QueryStatsOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import EPS from "../../assets/eps2-pcb-top.png";
import TTC from "../../assets/ttc2_pcb_top.png";
import OBDH from "../../assets/obdh2-pcb-top.png";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';




const Dashboard = () => {
  const theme = useTheme();

  const isBigScreen = useMediaQuery('(max-width: 1000px)');
  const gridProps = isBigScreen ? { } : { width: 1200 };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween sx={{ justifyContent: "flex-end"}}>

        <Box>
        <a href="https://floripasat.ufsc.br/pt/home-br/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <QueryStatsOutlined sx={{ mr: "10px" }} />
              Want to know more?
            </Button>
          </a>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        gap="20px"
      >

        <Box>
          <h1>FloripaSat-1 Mission </h1>
          <p>FloripaSat-1 is a technology demonstration mission entirely developed by SpaceLab UFSC students at the
             Federal University of Santa Catarina (UFSC), Brazil. It is cube-shaped satellite made of 5 modules.
              There the core modules for the mission control and the payloads. The core modules developed at UFSC are the
               On-Board Data Handling (OBDH), the Telemetry, Tracking, and Control (TT&C), the Electric Power System (EPS),
                and the passive Attitude Control System (ACS). The payload is an amateur radio repeater, which can be used
                 all over the globe in emergency and rescue situations, for instance.
          </p>
          
        </Box>

        <Box sx={{mt: 10, display: "flex", flexDirection: "column", alignItems: "center"}}>

            <h2>Mission Modules and subsystems</h2>

            <Grid item xs={12} md={6} mb={5} mt={5} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    EPS
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    “Electric Power System” (EPS)
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                  Te module is designed to capture, store and distribute power to other FloripaSat-1 modules. 
                  The power capture system is based on the conversion of solar energy through six panels located on 
                  each face of the satellite structure. The captured energy is stored in two series-connected lithium batteries. 
                  From decision-making algorithms, the other satellite modules are fed according to the available battery power at
                   a given time. EPS plays a key role in energy management at different times in orbit, such as when the satellite
                    is in eclipse, with the earth covering the sun.
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ margin:2, width: 250, display: { xs: 'none', sm: 'block' } }}
                  image= {EPS}
                  alt="Imagem do FloripaSat-1"
                />
              </Card>
            </CardActionArea>
          </Grid>

          <Grid item xs={12} md={6} mb={5} mt={5} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    TT&C
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    “Telemetry, Tracking and Command” (TT&C)
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                  The module is responsible for satellite communication with the terrestrial segment.
                   It is divided into two sub-modules: “Beacon” and “Main Radio”. “Beacon” transmits periodic signals
                   containing satellite identification (ID) and basic telemetry information. “Main Radio” is responsible for
                    receiving remote controls from a control station located on Earth (in this case at the UFSC), and send responses
                     via telemetry. Received remotes are forwarded to OBDH, which performs decoding and the requested processing.
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ margin:2, width: 250, display: { xs: 'none', sm: 'block' } }}
                  image= {TTC}
                  alt="Imagem do FloripaSat-1"
                />
              </Card>
            </CardActionArea>
          </Grid>

          <Grid item xs={12} md={6} mb={5} mt={5} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    OBDH
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    “On-Board Data Handling” (OBDH)
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                  The module is responsible for synchronizing actions and data flow between satellite modules (eg, EPS, Payloads, …) and the ground segment.
                    OBDH packs the generated data, and stores it in nonvolatile memory for sending to the ground station as soon as possible (when the satellite is passing over UFSC, or over a partner’s ground station). The remote commands sent by the ground segment are received by TT&C and sent to the OBDH which decodes and performs the necessary actions, sending the actions to the other modules if necessary. This allows communication between the entire satellite and the earth.
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ margin:2, width: 250, display: { xs: 'none', sm: 'block' } }}
                  image= {OBDH}
                  alt="Imagem do GOLDS-UFSC"
                />
              </Card>
            </CardActionArea>
          </Grid>

        </Box>
      </Box>
    </Box>
  );
};


export default Dashboard;
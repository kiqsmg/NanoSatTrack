import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
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
import FloripaSat01 from "../../assets/FloripaSat-1.jpg";
import GoldsUfsc from "../../assets/golds-ufsc.jpg";
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
      <FlexBetween>
        <Header title="Welcome to NanosatTracker"/>

        <Box>
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
            Know more about FloripaSat-1
          </Button>
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

          <img src="ufscImage.png" alt="" />
          
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>

            <h1>Mission Modules and subsystems</h1>
          <Grid item xs={12} md={6} mb={10} mt={5} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    FloripaSat-1
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    1U-cubesat
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                  FloripaSat-1 is a platform with five modules including core components for mission control and payloads,
                    featuring an amateur radio repeater for global emergency and rescue communications.
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Continue reading...
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  image= {FloripaSat01}
                  alt="Imagem do FloripaSat-1"
                />
              </Card>
            </CardActionArea>
          </Grid>

          <Grid item xs={12} md={6} mb={10} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    GOLDS-UFSC
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    2U-cubesat
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    GOLDS-UFSC is a service module for INPE’s EDC payload, and also a platform for the test of core spacecraft
                     technologies in a microgravity, high-radiation and low Earth orbit environment.
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Continue reading...
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  image= {GoldsUfsc}
                  alt="Imagem do GOLDS-UFSC"
                />
              </Card>
            </CardActionArea>
          </Grid>


          <Grid item xs={12} md={6} mb={10} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    Catarina-A1
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Post date
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Post description
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Continue reading...
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  image= {GoldsUfsc}
                  alt="Imagem do Catarina-A1"
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
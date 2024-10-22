import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  LanOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Tooltip,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';
import cubesatBackground from "../../assets/cubesat_background.webp";
import FloripaSat01 from "../../assets/floripasat-1-exploded.png";
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
          <a href="https://spacelab.ufsc.br/en/home/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <LanOutlined sx={{ mr: "10px" }} />
              Want to know more?
            </Button>
          </a>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        gap="20px"
      >
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.100',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${cubesatBackground})`,
            height: "300px"
          }}
        >
          {/* Increase the priority of the hero background image */}
          {<img style={{ display: 'none' }} src= {cubesatBackground} alt="Cubesat orbiting the earth" />}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.3)',
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  Spacelab- NanosatTracker
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Developing new systems to bring data from space to earth
                </Typography>
                <Link variant="subtitle1" href="https://github.com/spacelab-ufsc">
                  GitHub
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Box>
          <h1>Overview</h1>
          <p>SpaceLab brings together several research groups from the Federal University of Santa Catarina (UFSC), Brazil.
            The different groups conduct research and development activities in space systems in general,
            aiming to make space more accessible not only to the scientific community but also to the industry.
            Featured missions include FloripaSat-1, GOLDS-UFSC, GOMX-5, and cubesats from the Catarina Constelation.
            This organization combines repositories for different projects, files and documents.
          </p>          
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Grid item xs={12} md={6} mb={10} mt={10} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'center' }}}>
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
                  <Tooltip title={<Typography sx={{ fontSize: '1rem' }}>
                    The FloripaSat-1 is a technology demonstration mission entirely developed by students from the SpaceLab at the Federal University of Santa Catarina (UFSC), Brazil. It is a cube-shaped satellite composed of 5 modules. There are main modules for mission control and the payloads. The main modules developed at UFSC are the On-Board Data Handling (OBDH), Telemetry, Tracking, and Control (TT&C), Electric Power System (EPS), and Passive Attitude Control System (ACS). The payload is an amateur radio repeater, which can be used worldwide in emergency and rescue situations, for example.
                    </Typography>}>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                  </Tooltip>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 150, border:20, height: 180, display: { xs: 'block', sm: 'block' }, order: { xs: 2, sm: 0 }, marginBottom: { xs: 4, sm: 0}}}
                  image= {FloripaSat01}
                  alt="Imagem do FloripaSat-1"
                />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} md={6} mb={10} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'center' } }}>
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
                  <Tooltip title={<Typography sx={{ fontSize: '1rem' }}>
                  GOLDS-UFSC is a space technology demonstration mission created by the Federal University of Santa Catarina. The main goal is to provide the service module for the Environmental Data Collector (EDC) payload from INPE-RN. The service module was developed at UFSC and it has three main components: the Electric Power System (EPS), the On-Board Data Handling (OBDH) and Telemetry, Tracking and Command (TT&C). Besides performing the EDC main functionalities, the mission will contribute to validating key technologies that will enable faster and cheaper development of future satellites reusing the same core structure. As an educational mission, it also serves to train engineering students in space mission conception, design, implementation and operation in all areas involved.                    </Typography>}>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                  </Tooltip>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 180, display: { xs: 'block', sm: 'block' }, order: { xs: 2, sm: 0 }, marginBottom: { xs: 4, sm: 0} }}
                  image= {GoldsUfsc}
                  alt="Imagem do GOLDS-UFSC"
                />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} md={6} mb={10} {...gridProps}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'center' } }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    Catarina-A1
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    2U-cubesat
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    The Catarina Constellation encompasses a set of satellites with the goal to provide services, mainly, to the civil defence, contributing to the country’s sustainable socioeconomic development agenda.
                  </Typography>
                  <Tooltip title={<Typography sx={{ fontSize: '1rem' }}>
                  The Catarina-A1 is a 2U CubeSat , and it is a follow up of FloripaSat-1 mission . Both FloripaSat-1 and GOLDS-UFSC are developed by SpaceLab/UFSC . GOLDS-UFSC main payload is the EDC board Environmental Data Collection, developed by INPE. The mission is part of the ``GOLDS'' constellation (``Global Open Collecting Data System''), a collaborative CubeSat constellation for environmental data collection planned as part of the Brazilian Space Program. The project started just after the launch of FloripaSat-1 (first half of 2020) and is planned to be launched in 2023. Most of the embedded electronics is partially or totally based on the FloripaSat-1 satellite, with the same and/or improved versions of the modules. In other words, this project has, at some level, a flight heritage.
                    </Typography>}>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                  </Tooltip>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 180, display: { xs: 'block', sm: 'block' }, order: { xs: 2, sm: 0 }, marginBottom: { xs: 4, sm: 0} }}
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
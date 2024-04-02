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
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';
import cubesatBackground from "../../assets/cubesat_background.webp";
import FloripaSat01 from "../../assets/FloripaSat-1.jpg";
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
            <LanOutlined sx={{ mr: "10px" }} />
            Want to know more?
          </Button>
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
                <Link variant="subtitle1" href="#">
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

          <img src="ufscImage.png" alt="" />
          
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
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
                  image= {FloripaSat01}
                  alt="Imagem do FloripaSat-1"
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
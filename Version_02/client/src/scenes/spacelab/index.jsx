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
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';
import cubesatBackground from "../../assets/cubesat_background.webp";


const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="NanosatTracker" subtitle="Welcome to NanosatTracker" />

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
                  Developing new systems to bring data to earth
                </Typography>
                <Link variant="subtitle1" href="#">
                  GitHub
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};


export default Dashboard;
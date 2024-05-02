import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetBatteryQuery } from "state/api";

const Battery = ({
  _id,
  battery_cell_1_voltage,
  battery_cell_2_voltage,
  battery_current,
  battery_temperature,
  battery_charge,
  energy_level,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {_id}
        </Typography>
        <Typography variant="h5" component="div">
          {"FloripaSat-1"}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Battery 01 voltage:{Number(battery_cell_1_voltage).toFixed(3)}
        </Typography>

        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Battery 02 voltage:{Number(battery_cell_2_voltage).toFixed(3)}
        </Typography>

      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>
            Battery Current: {Number(battery_current).toFixed(3)}
          </Typography>
          <Typography>
            Battery Temperature: {Number(battery_temperature).toFixed(3)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Batteries = () => {
  const { data, isLoading} = useGetBatteryQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BATTERY" subtitle="See your battery stats here." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              battery_cell_1_voltage,
              battery_cell_2_voltage,
              battery_current,
              battery_temperature,
              battery_charge,
              energy_level,
            }) => (
              <Battery
                key={_id}
                _id={_id}
                battery_cell_1_voltage={battery_cell_1_voltage}
                battery_cell_2_voltage={battery_cell_2_voltage}
                battery_current={battery_current}
                battery_temperature={battery_temperature}
                battery_charge={battery_charge}
                energy_level={energy_level}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Batteries;
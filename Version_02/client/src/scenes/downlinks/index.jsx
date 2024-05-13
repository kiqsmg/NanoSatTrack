import React from 'react';
import {Box, useTheme} from "@mui/material"
import { useGetDownlinkQuery } from "../../state/api"
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";

function Downlink() {
  const theme = useTheme();
  const { data, isLoading } = useGetDownlinkQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 0.5
    },
    {
      field: "year",
      headerName: "YEAR",
      flex: 0.5
    },
    {
      field: "month",
      headerName: "MONTH",
      flex: 0.5
    },
    {
      field: "day",
      headerName: "DAY",
      flex: 0.5
    },
    {
      field: "hour",
      headerName: "HOUR",
      flex: 0.5
    },
    {
      field: "minute",
      headerName: "MINUTE",
      flex: 0.5
    },
    {
      field: "second",
      headerName: "SECOND",
      flex: 0.5
    },
    {
      field: "battery_cell_1_voltage",
      headerName: "BATTERY CELL 1 VOL.",
      flex: 0.5
    },
    {
      field: "battery_cell_2_voltage",
      headerName: "BATTERY CELL 2 VOL.",
      flex: 0.5
    },
    {
      field: "battery_temperature",
      headerName: "BATTERY TEMP.",
      flex: 1
    },
    {
      field: "battery_current",
      headerName: "BATTERY CURRENT",
      flex: 0.5
    },
    {
      field: "battery_charge",
      headerName: "BATTERY CHARGE",
      flex: 0.5
    },
    {
      field: "sp_01_current",
      headerName: "Solar panel 1 current",
      flex: 0.5
    },
    {
      field: "sp_02_current",
      headerName: "Solar panel 2 current",
      flex: 0.5
    },
    {
      field: "sp_03_current",
      headerName: "Solar panel 3 current",
      flex: 0.5
    },
    {
      field: "sp_04_current",
      headerName: "Solar panel 4 current",
      flex: 0.5
    },
    {
      field: "sp_05_current",
      headerName: "Solar panel 5 current",
      flex: 0.5
    },
    {
      field: "sp_06_current",
      headerName: "Solar panel 6 current",
      flex: 0.5
    },
    {
      field: "sp_01_02_voltage",
      headerName: "Solar panel 1 & 2 voltage",
      flex: 0.5
    },
    {
      field: "sp_03_04_voltage",
      headerName: "Solar panel 3 & 4 voltage",
      flex: 0.5
    },
    {
      field: "sp_05_06_voltage",
      headerName: "Solar panel 5 & 6 voltage",
      flex: 0.5
    },
    {
      field: "energy_level",
      headerName: "ENERGY LEVEL",
      flex: 0.5
    },
    {
      field: "eps_temperature",
      headerName: "EPS TEMPERATURE",
      flex: 0.5
    },
    {
      field: "satNOGS",
      headerName: "satNOGS",
      flex: 0.5
    },
    {
      field: "callsign",
      headerName: "CALLSIGN",
      flex: 0.5
    },
    {
      field: "grid_locator",
      headerName: "GRID LOCATOR",
      flex: 0.5
    },
  ]
  return (
    <>
    <Box m="1.5rem 2.5rem">
        <Header title="DOWNLINKS" subtitle="List Of all Downlinks" />
    <Box mt="40px" height="75vh"
        sx={{ "& .MuiDataGrid-root" : { 
            border: "none",
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
        },
        }}>
        <DataGrid loading = {isLoading || !data}
        getRowId={(row) => row._id} 
        rows={data || []}
        columns={columns}
        />
    </Box>
   </Box>
    </>
  )
}

export default Downlink
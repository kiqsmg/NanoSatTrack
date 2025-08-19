import React from 'react';
import {Box, useTheme} from "@mui/material"
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import { useGetDownlinkQuery } from "../../state/api"


function Downlink() {
  const theme = useTheme();
  const { data, isLoading } = useGetDownlinkQuery();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 2
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 1.5
    },
    {
      field: "year",
      headerName: "YEAR",
      flex: 0.5
    },
    {
      field: "month",
      headerName: "MON",
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
      headerName: "MIN",
      flex: 0.5
    },
    {
      field: "second",
      headerName: "SEC",
      flex: 0.5
    },
    {
      field: "battery_cell_1_voltage",
      headerName: "BAT1[V]",
      flex: 1.2
    },
    {
      field: "battery_cell_2_voltage",
      headerName: "BAT2[V]",
      flex: 1.2
    },
    {
      field: "battery_temperature",
      headerName: "BAT[°C].",
      flex: 1.2
    },
    {
      field: "battery_current",
      headerName: "BAT[A]",
      flex: 1.2
    },
    {
      field: "battery_charge",
      headerName: "CHARGE",
      flex: 1
    },
    {
      field: "sp_01_current",
      headerName: "SP 1[A]",
      flex: 1
    },
    {
      field: "sp_02_current",
      headerName: "SP 2[A]",
      flex: 1
    },
    {
      field: "sp_03_current",
      headerName: "SP 3[A]",
      flex: 1
    },
    {
      field: "sp_04_current",
      headerName: "SP 4[A]",
      flex: 1
    },
    {
      field: "sp_05_current",
      headerName: "SP 5[A]",
      flex: 1
    },
    {
      field: "sp_06_current",
      headerName: "SP 6[A]",
      flex: 1
    },
    {
      field: "sp_01_02_voltage",
      headerName: "SP 1-2[V]",
      flex: 1
    },
    {
      field: "sp_03_04_voltage",
      headerName: "SP 3-4[V]",
      flex: 1
    },
    {
      field: "sp_05_06_voltage",
      headerName: "SP 5-6[V]",
      flex: 1
    },
    {
      field: "energy_level",
      headerName: "ENERGY LEVEL",
      flex: 1
    },
    {
      field: "eps_temperature",
      headerName: "EPS[°C]",
      flex: 1
    },
    {
      field: "satnogs",
      headerName: "satNOGS",
      flex: 1
    },
    {
      field: "callsign",
      headerName: "CALLSIGN",
      flex: 1
    },
    {
      field: "grid_locator",
      headerName: "LOCATOR",
      flex: 1
    },
  ]
  return (
    <>
    <Box m="1.5rem 0.5rem">
        <Header title="DOWNLINKS" subtitle="List Of all Downlinks" />
    <Box mt="40px" height="75vh" width="100%"
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
        getRowId={(row) => row.id} 
        rows={data || []}
        columns={columns}
        />
    </Box>
   </Box>
    </>
  );
};

export default Downlink
import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetDownlinkQuery } from "../../state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Solarpanel = () => {
  const [startDate, setStartDate] = useState(new Date("2019-12-01"));
  const [endDate, setEndDate] = useState(new Date("2020-03-01"));
  const { data } = useGetDownlinkQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];


    const sp_01_currentLine = {
      id: "Panel 1",
      color: theme.palette.secondary.main,
      data: [],
    };
    const sp_02_currentLine = {
      id: "Panel 2",
      color: theme.palette.secondary[100],
      data: [],
    };
    const sp_03_currentLine = {
      id: "Panel 3",
      color: theme.palette.secondary[300],
      data: [],
    };
    const sp_04_currentLine = {
      id: "Panel 4",
      color: theme.palette.secondary[500],
      data: [],
    };
    const sp_05_currentLine = {
      id: "Panel 5",
      color: theme.palette.secondary[600],
      data: [],
    };
    const sp_06_currentLine = {
      id: "Panel 6",
      color: theme.palette.secondary[800],
      data: [],
    };

    Object.values(data).forEach(({ year, month, day, sp_01_current, sp_02_current, sp_03_current, sp_04_current, sp_05_current, sp_06_current }) => {
      //Date formatting
      const dateAllTogether = year.toString() + "-" + month.toString() + "-" + day.toString()
      const dateFormatted = new Date(dateAllTogether);


      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = dateAllTogether.substring(dateAllTogether.indexOf("-") + 1);

        sp_01_currentLine.data = [
          ...sp_01_currentLine.data,
          { x: splitDate, y: sp_01_current },
        ];
        sp_02_currentLine.data = [
          ...sp_02_currentLine.data,
          { x: splitDate, y: sp_02_current },
        ];
        sp_03_currentLine.data = [
          ...sp_03_currentLine.data,
          { x: splitDate, y: sp_03_current },
        ];
        sp_04_currentLine.data = [
          ...sp_04_currentLine.data,
          { x: splitDate, y: sp_04_current },
        ];
        sp_05_currentLine.data = [
          ...sp_05_currentLine.data,
          { x: splitDate, y: sp_05_current },
        ];
        sp_06_currentLine.data = [
          ...sp_06_currentLine.data,
          { x: splitDate, y: sp_06_current },
        ];
        
      }
    });

    const formattedData = [sp_01_currentLine, sp_02_currentLine, sp_03_currentLine, sp_04_currentLine, sp_05_currentLine, sp_06_currentLine];
    return [formattedData];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const [formattedData2] = useMemo(() => {
    if (!data) return [];


    const sp_01_02_voltageLine = {
      id: "Panel 1-2",
      color: theme.palette.secondary.main,
      data: [],
    };
    const sp_03_04_voltageLine = {
      id: "Panel 3-4",
      color: theme.palette.secondary[600],
      data: [],
    };
    const sp_05_06_voltageLine = {
      id: "Panel 5-6",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(data).forEach(({ year, month, day, sp_01_02_voltage, sp_03_04_voltage, sp_05_06_voltage }) => {
      //Date formatting
      const dateAllTogether = year.toString() + "-" + month.toString() + "-" + day.toString()
      const dateFormatted = new Date(dateAllTogether);


      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = dateAllTogether.substring(dateAllTogether.indexOf("-") + 1);

        sp_01_02_voltageLine.data = [
          ...sp_01_02_voltageLine.data,
          { x: splitDate, y: sp_01_02_voltage },
        ];
        sp_03_04_voltageLine.data = [
          ...sp_03_04_voltageLine.data,
          { x: splitDate, y: sp_03_04_voltage },
        ];
        sp_05_06_voltageLine.data = [
          ...sp_05_06_voltageLine.data,
          { x: splitDate, y: sp_05_06_voltage },
        ];
        
      }
    });

    const formattedData = [sp_01_02_voltageLine, sp_03_04_voltageLine, sp_05_06_voltageLine ];
    return [formattedData];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SOLAR PANELS" subtitle="Chart of each solar panel current" />
      <Box height="55vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(dateFormatted) => setStartDate(dateFormatted)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(dateFormatted) => setEndDate(dateFormatted)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month-Day",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Current [A]",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />

          
        ) : (
          
          <>Loading...</>
        )}
      </Box>

      <Box height="55vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(dateFormatted) => setStartDate(dateFormatted)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(dateFormatted) => setEndDate(dateFormatted)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        {data ? (
          <ResponsiveLine
            data={formattedData2}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month-Day",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Solar Panel Voltage [V]",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />

          
        ) : (
          
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Solarpanel;
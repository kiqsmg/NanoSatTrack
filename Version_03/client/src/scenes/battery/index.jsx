import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetDownlinkQuery } from "../../state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Batteries = () => {
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));
  const { data } = useGetDownlinkQuery();
  const theme = useTheme();

  const [formattedData1] = useMemo(() => {
    if (!data) return [];

    const battery_cell_1_voltageLine = {
      id: "Cell1 vol",
      color: theme.palette.secondary.main,
      data: [],
    };
    const battery_cell_2_voltageLine = {
      id: "Cell2 vol",
      color: theme.palette.secondary[100],
      data: [],
    };

    Object.values(data).forEach(({ year, month, day, battery_cell_1_voltage, battery_cell_2_voltage }) => {
      //Date formatting
      const dateAllTogether = year.toString() + "-" + month.toString() + "-" + day.toString()
      const dateFormatted = new Date(dateAllTogether);

      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = dateAllTogether.substring(dateAllTogether.indexOf("-") + 1);

        battery_cell_1_voltageLine.data = [
          ...battery_cell_1_voltageLine.data,
          { x: splitDate, y: battery_cell_1_voltage },
        ];
        battery_cell_2_voltageLine.data = [
          ...battery_cell_2_voltageLine.data,
          { x: splitDate, y: battery_cell_2_voltage },
        ];
      }
    });
    const formattedData1 = [battery_cell_1_voltageLine, battery_cell_2_voltageLine ];
    return [formattedData1];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const [formattedData2] = useMemo(() => {
    if (!data) return [];

    const battery_temperatureLine = {
      id: "Bat.[°C]",
      color: theme.palette.secondary.light,
      data: [],
    };
    const eps_temperatureLine = {
      id: "EPS.[°C]",
      color: theme.palette.secondary.dark,
      data: [],
    };

    Object.values(data).forEach(({ year, month, day, battery_temperature, eps_temperature }) => {
      //Date formatting
      const dateAllTogether = year.toString() + "-" + month.toString() + "-" + day.toString()
      const dateFormatted = new Date(dateAllTogether);


      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = dateAllTogether.substring(dateAllTogether.indexOf("-") + 1);

        battery_temperatureLine.data = [
          ...battery_temperatureLine.data,
          { x: splitDate, y: battery_temperature },
        ];
        eps_temperatureLine.data = [
          ...eps_temperatureLine.data,
          { x: splitDate, y: eps_temperature },
        ];        
      }
    });

    const formattedData2 = [battery_temperatureLine, eps_temperatureLine ];
    return [formattedData2];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const [formattedData3] = useMemo(() => {
    if (!data) return [];

    const battery_currentLine = {
      id: "Bat.[A]",
      color: theme.palette.secondary[100],
      data: [],
    };

    Object.values(data).forEach(({ year, month, day, battery_current }) => {
      //Date formatting
      const dateAllTogether = year.toString() + "-" + month.toString() + "-" + day.toString()
      const dateFormatted = new Date(dateAllTogether);

      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = dateAllTogether.substring(dateAllTogether.indexOf("-") + 1);

        battery_currentLine.data = [
          ...battery_currentLine.data,
          { x: splitDate, y: battery_current },
        ];        
      }
    });

    const formattedData3 = [ battery_currentLine ];
    return [formattedData3];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const [formattedData4] = useMemo(() => {
    if (!data) return [];

    const battery_chargeLine = {
      id: "Charge",
      color: theme.palette.secondary[100],
      data: [],
    };

    Object.values(data).forEach(({ year, month, day, battery_charge }) => {
      //Date formatting
      const dateAllTogether = year.toString() + "-" + month.toString() + "-" + day.toString()
      const dateFormatted = new Date(dateAllTogether);

      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = dateAllTogether.substring(dateAllTogether.indexOf("-") + 1);

        battery_chargeLine.data = [
          ...battery_chargeLine.data,
          { x: splitDate, y: battery_charge },
        ];        
      }
    });

    const formattedData4 = [ battery_chargeLine ];
    return [formattedData4];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Batteries" subtitle="Chart of each battery voltage, current, temperature and charge..." />
      <Box height="40vh">
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
            data={formattedData1}
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
              legend: "Voltage [V]",
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
      <Box height="40vh">
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
              legend: "Battery Temperature [°C]",
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
      <Box height="40vh">
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
            data={formattedData3}
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
              legend: "Battery Current [A]",
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
      <Box height="40vh">
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
            data={formattedData4}
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
              legend: "Battery Charge",
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

export default Batteries;
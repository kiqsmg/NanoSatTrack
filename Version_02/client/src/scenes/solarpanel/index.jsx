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

    const { dailyData } = data;
    const sp_01_currentLine = {
      id: "sp_01_current",
      color: theme.palette.secondary.main,
      data: [],
    };
    const sp_02_currentLine = {
      id: "sp_02_current",
      color: theme.palette.secondary[600],
      data: [],
    };
    const sp_03_currentLine = {
      id: "sp_03_current",
      color: theme.palette.secondary[600],
      data: [],
    };
    const sp_04_currentLine = {
      id: "sp_04_current",
      color: theme.palette.secondary[600],
      data: [],
    };
    const sp_05_currentLine = {
      id: "sp_05_current",
      color: theme.palette.secondary[600],
      data: [],
    };
    const sp_06_currentLine = {
      id: "sp_06_current",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        sp_01_currentLine.data = [
          ...sp_01_currentLine.data,
          { x: splitDate, y: totalSales },
        ];
        sp_02_currentLine.data = [
          ...sp_02_currentLine.data,
          { x: splitDate, y: totalSales },
        ];
        sp_03_currentLine.data = [
          ...sp_03_currentLine.data,
          { x: splitDate, y: totalSales },
        ];
        sp_04_currentLine.data = [
          ...sp_04_currentLine.data,
          { x: splitDate, y: totalSales },
        ];
        sp_05_currentLine.data = [
          ...sp_05_currentLine.data,
          { x: splitDate, y: totalSales },
        ];
        sp_06_currentLine.data = [
          ...sp_06_currentLine.data,
          { x: splitDate, y: totalSales },
        ];
        
      }
    });

    const formattedData = [sp_01_currentLine, sp_02_currentLine, sp_03_currentLine, sp_04_currentLine, sp_05_currentLine, sp_06_currentLine];
    return [formattedData];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Chart of daily sales" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
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
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
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
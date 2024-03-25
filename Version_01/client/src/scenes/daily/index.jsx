import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

 
};

export default Daily;
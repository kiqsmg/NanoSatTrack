import React from 'react';
import { Box, useTheme } from "@mui/material";
import { useGetLocationQuery } from "../../state/api";
import Header from "../../components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../../state/geoData";

const Location = () =>  {
    const theme = useTheme(useGetLocationQuery());
    const { data } = useGetLocationQuery();
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="LOCATIONS" subtitle="Find where groundstations that have connected to our satellite are located." />
            <Box mt="40px"
              height="75vh"
              border={`1px solid ${theme.palette.secondary[200]}`}
              borderRadius="4px"
              >
                  {data ?(
                      <ResponsiveChoropleth
                      data={data}
                      theme={{
                          axis: {
                              domain: {
                                  line: {
                                      stroke: theme.palette.secondary[200]
                                  }
                              },
                              legend: {
                                  text: {
                                      fill: theme.palette.secondary[200]
                                  }
                              },
                              ticks: {
                                  line: {
                                      stroke: theme.palette.secondary[200],
                                      strokeWidth: 1,
                                  },
                                  text: {
                                      fill: theme.palette.secondary[200]
                                  }
                              }
                          },
                          legends: {
                              text: {
                                  fill: theme.palette.secondary[200]
                              }
                          },
                          tooltip: {
                              container: {
                                  color: theme.palette.primary.main
                              }
                          },
                      }}
                      features={geoData.features} //understand what is going on here
                      margin={{ top: 0, right: 0, bottom: 0, left: -50}}
                      domain={[ 0, 10 ]}
                      unknownColor="#666666"
                      label="properties.name"
                      valueFormat=".2s"
                      projectionScale={190}
                      projectionTranslation={[ 0.45, 0.6 ]}
                      projectionRotation={[ 0, 0, 0 ]}
                      borderWidth={1.3}
                      borderColor="#ffffff"
                      legends={[
                          {
                              anchor: 'bottom-right',
                              direction: 'column',
                              justify: false,
                              translateX: 0,
                              translateY: -125,
                              itemsSpacing: 0,
                              itemWidth: 94,
                              itemHeight: 18,
                              itemDirection: 'left-to-right',
                              itemTextColor: theme.palette.secondary[200],
                              itemOpacity: 0.85,
                              symbolSize: 18,
                              effects: [
                                  {
                                      on: 'hover',
                                      style: {
                                          itemTextColor: theme.palette.background.alt,
                                          itemOpacity: 1
                                      }
                                  }
                              ]
                          }
                      ]}
                  />
                  ) : <>Loading...</>}
            </Box>
        </Box>
  );
};

export default Location;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  //reducerPath: "adminApi",
  tagTypes: [
    "Downlink",
    "Location",
  ],
  endpoints: (build) => ({
    getDownlink: build.query({
      query: () => "floripasat1/downlink",
      providesTags: ["Downlink"],
    }),
    getLocation: build.query({ 
      query: () => "floripasat1/location",
      providesTags: ["Location"],
    }),
  }),
});

export const {
  useGetDownlinkQuery,
  useGetLocationQuery,
} = api;
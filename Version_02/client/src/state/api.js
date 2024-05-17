import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  //reducerPath: "adminApi",
  tagTypes: [
    "Dashboard",
    "Satellite",
    "Battery",
    "Downlink",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getSatellite: build.query({
      query: () => "general/satellite",
      providesTags: ["Satellite"],
    }),
    getBattery: build.query({
      query: () => "floripasat1/battery",
      providesTags: ["Battery"],
    }),
    getDownlink: build.query({
      query: () => "floripasat1/downlink",
      providesTags: ["Downlink"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetSatelliteQuery,
  useGetBatteryQuery,
  useGetDownlinkQuery,
} = api;
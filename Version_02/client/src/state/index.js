import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  satellite_Id: "63701d24f03239c72c00018e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
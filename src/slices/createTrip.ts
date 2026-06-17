import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createTrip: false,
};

const createTripSlice = createSlice({
  name: "createTrip",
  initialState,
  reducers: {
    open: (state) => {
      state.createTrip = true;
    },
    close: (state) => {
      state.createTrip = false;
    },
  },
});

export const { open, close } = createTripSlice.actions;
export default createTripSlice.reducer;

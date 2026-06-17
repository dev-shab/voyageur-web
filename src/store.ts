import { configureStore } from "@reduxjs/toolkit";
import createTripReducer from "@/slices/createTrip";

export const store = configureStore({
  reducer: {
    createTrip: createTripReducer,
  },
});

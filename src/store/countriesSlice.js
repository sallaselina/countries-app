import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  isLoading: true,
  search: "",
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getCountries(state, action) {
      state.countries = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    search(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers() {},
});

export const { getCountries, isLoading, search } = countriesSlice.actions;

//this is the connection to store.js
export default countriesSlice.reducer;

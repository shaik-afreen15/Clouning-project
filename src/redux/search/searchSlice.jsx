import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "df2bf13f7d3e63d7e60557693d7845da";

/* ASYNC SEARCH */
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query) => {
    if (!query || query.trim().length < 2) return [];

    const res = await axios.get(
      "https://api.themoviedb.org/3/search/multi",
      {
        params: {
          api_key: API_KEY,
          query: query,
        },
      }
    );

    return res.data.results;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    status: "idle",
    filter: "all", // all | movie | tv
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearResults(state) {
      state.results = [];
      state.status = "idle";
    },
    clearQuery(state) {
      state.query = "";
      state.results = [];
      state.status = "idle";
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "success";
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  setQuery,
  clearResults,
  clearQuery,
  setFilter,
} = searchSlice.actions;

export default searchSlice.reducer;

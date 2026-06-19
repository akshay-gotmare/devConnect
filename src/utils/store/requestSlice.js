import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      return state.filter((req) => req._id !== action.payload);
    },
    removeAllRequests: (state, action) => null,
  },
});

export const { addRequests, removeRequest, removeAllRequests } =
  requestSlice.actions;
export default requestSlice.reducer;

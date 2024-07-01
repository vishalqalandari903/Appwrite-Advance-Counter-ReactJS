import { createSlice, nanoid } from "@reduxjs/toolkit";
import { login } from "../auth";

// const initialState = JSON.parse(localStorage.getItem("count")) || 0;
const initialState = {
  counters: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCounters: (state, action) => {
      state.counters = action.payload;
    },
    increamentCount: (state, action) => {
      state.counters.find(
        (counter) => action.payload.id === counter.$id
      ).value += 1;
    },
    decreamentCount: (state, action) => {
      state.counters.find(
        (counter) => action.payload.id === counter.$id
      ).value -= 1;
    },
    resetCount: (state, action) => {
      let counter = state.counters.find(
        (counter) => action.payload.id === counter.$id
      );
      counter.value = counter.resetValue;
    },
    deleteAllCounters: (state) => {
      state.counters = [];
      return state;
    },
    createCounter: (state, action) => {
      state.counters.push(action.payload);
    },
    deleteCounter: (state, action) => {
      state.counters = state.counters.filter(
        (counter) => counter.$id !== action.payload.id
      );
    },
    duplicateCounter: (state, action) => {
      let counter = {
        id: nanoid(),
        count: state.counters.find((counter) => counter.id == action.payload.id)
          .count,
      };
      state.counters.splice(
        state.counters.findIndex((counter) => counter.id == action.payload.id) +
          1,
        0,
        counter
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increamentCount,
  decreamentCount,
  resetCount,
  createCounter,
  deleteCounter,
  duplicateCounter,
  setCounters,
} = counterSlice.actions;

export default counterSlice.reducer;

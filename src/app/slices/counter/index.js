import { createSlice, nanoid } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem("count")) || 0;
const initialState = {
  counters: JSON.parse(localStorage.getItem("counters")) || [
    {
      id: nanoid(),
      name: "Counter",
      count: 0,
    },
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increamentCount: (state, action) => {
      state.counters.find(
        (counter) => counter.id == action.payload.id
      ).count += 1;
      return state;
    },
    decreamentCount: (state, action) => {
      state.counters.find(
        (counter) => counter.id == action.payload.id
      ).count -= 1;
      return state;
    },
    resetCount: (state, action) => {
      state.counters.find(
        (counter) => counter.id == action.payload.id
      ).count = 0;
      return state;
    },
    deleteAllCounters: (state) => {
      state.counters = [];
      return state;
    },
    addCounter: (state, action) => {
      let counter = {
        id: nanoid(),
        name: action.payload.name,
        count: 0,
      };
      state.counters.push(counter);
    },
    deleteCounter: (state, action) => {
      state.counters = state.counters.filter(
        (counter) => counter.id != action.payload.id
      );
      return state;
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
    changeCounterName: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  increamentCount,
  decreamentCount,
  resetCount,
  addCounter,
  deleteCounter,
  duplicateCounter,
} = counterSlice.actions;

export default counterSlice.reducer;

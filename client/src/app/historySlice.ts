import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { History } from "../typings";

export interface HistoryState {
  histories: History[];
  currentHistoryIndex: number;
}

const initialState: HistoryState = {
  histories: [
    {
        internal: [
            
        ]
    }
  ],
  currentHistoryIndex: 0,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<History>) => {
      state.histories.push(action.payload);
      state.currentHistoryIndex = state.histories.length - 1;
    },
    setCurrentHistoryIndex: (state, action: PayloadAction<number>) => {
      state.currentHistoryIndex = action.payload;
    },
    removeHistory: (state, action: PayloadAction<number>) => {
      state.histories.splice(action.payload, 1);
    },
    addToCurrentHistory: (state, action: PayloadAction<string[]>) => {
      state.histories[state.currentHistoryIndex].internal.push(action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const { addHistory, setCurrentHistoryIndex, removeHistory, addToCurrentHistory } =
  historySlice.actions;

export default historySlice.reducer;

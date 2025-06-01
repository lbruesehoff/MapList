import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "./store-interfaces";

const initialState: GlobalState = {
  theme: "default", // Default theme
  folderList: [], // Initialize with an empty folder list
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload ? "dark" : "default";
    },
    addFolder: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      state.folderList.push({ id, name });
    },
  },
});

export const { setTheme, addFolder } = globalSlice.actions;
export default globalSlice.reducer;

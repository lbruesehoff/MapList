import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "./store-interfaces";
import { set } from "react-hook-form";

const initialState: GlobalState = {
  theme: "default", // Default theme
  folderList: [],
  folderOpen: false, // Initialize with an empty folder list
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
    setFolderOpen: (state, action: PayloadAction<boolean>) => {
      state.folderOpen = action.payload;
    },
  },
});

export const { setTheme, addFolder, setFolderOpen } = globalSlice.actions;
export default globalSlice.reducer;

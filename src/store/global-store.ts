import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FolderType,
  GlobalState,
  LocationMarker,
  LocationType,
} from "./store-interfaces";

const initialState: GlobalState = {
  theme: "default",
  selectedFolder: { id: "", name: "" },
  folderList: [],
  folderOpen: false,
  locationList: [],
  locationMarkers: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload ? "dark" : "default";
    },
    setSelectedFolder: (state, action: PayloadAction<FolderType>) => {
      const selectedFolder = action.payload;
      state.selectedFolder = selectedFolder;
    },
    addFolder: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      state.folderList.push({ id, name });
    },
    setFolderOpen: (state, action: PayloadAction<boolean>) => {
      state.folderOpen = action.payload;
    },
    setLocationList: (state, action: PayloadAction<LocationType>) => {
      const newLocation: LocationType = {
        id: action.payload.id,
        folderId: action.payload.folderId,
        name: action.payload.name,
        address: action.payload.address,
      };
      if (!state.locationList) {
        state.locationList = [];
      }
      state.locationList.push(newLocation);
    },
    addMarker: (state, action: PayloadAction<LocationMarker>) => {
      const newMarker: LocationMarker = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
      state.locationMarkers.push(newMarker);
    },
  },
});

export const {
  setTheme,
  setSelectedFolder,
  addFolder,
  setFolderOpen,
  setLocationList,
  addMarker,
} = globalSlice.actions;
export default globalSlice.reducer;

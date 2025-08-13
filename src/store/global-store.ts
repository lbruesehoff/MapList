import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FolderType,
  GlobalState,
  LocationMarker,
  LocationType,
  UserType,
} from "./store-interfaces";

const initialState: GlobalState = {
  user: null,
  theme: "default",
  selectedFolder: { id: "", name: "", locations: [] },
  folders: [],
  folderOpen: false,
  locationMarkers: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setSelectedFolder: (state, action: PayloadAction<FolderType>) => {
      const selectedFolder = action.payload;
      state.selectedFolder = selectedFolder;
    },
    addFolder: (state, action: PayloadAction<FolderType>) => {
      const { id, name, locations } = action.payload;
      // Only add the folder if it doesn't already exist (by id)
      if (!state.folders.some((folder) => folder.id === id)) {
        state.folders.push({ id, name, locations });
      }
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      const folderId = action.payload;
      state.folders = state.folders.filter((folder) => folder.id !== folderId);
      // If the deleted folder was the selected folder, reset selectedFolder
      if (state.selectedFolder.id === folderId) {
        state.selectedFolder = { id: "", name: "", locations: [] };
      }
    },
    // This action is used to toggle the folder open state
    setFolderOpen: (state, action: PayloadAction<boolean>) => {
      state.folderOpen = action.payload;
    },
    setLocationList: (state, action: PayloadAction<LocationType>) => {
      const newLocation: LocationType = {
        id: action.payload.id,
        folderId: action.payload.folderId,
        name: action.payload.name,
        address: action.payload.address,
        geoLocation: {
          id: action.payload.id,
          lat: action.payload.geoLocation.lat,
          lng: action.payload.geoLocation.lng,
        },
      };

      // Find the folder by folderId and add the location to its locations array
      const folder = state.folders.find(
        (folder) => folder.id === newLocation.folderId
      );
      if (folder) {
        if (!folder.locations) {
          folder.locations = [];
        }
        // Only add the location if it doesn't already exist (by id)
        if (
          !folder.locations.some((location) => location.id === newLocation.id)
        ) {
          folder.locations.push(newLocation);
        }
        state.selectedFolder = folder; // Update selectedFolder to the folder containing the new location
      }
    },
    addMarker: (state, action: PayloadAction<LocationMarker>) => {
      const newMarker: LocationMarker = {
        id: action.payload.id,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
      state.locationMarkers.push(newMarker);
    },
    deleteLocation: (state, action: PayloadAction<LocationType>) => {
      const locationToDelete = action.payload;
      // Remove the location from the selected folder's locations
      const folder = state.folders.find(
        (folder) => folder.id === locationToDelete.folderId
      );
      if (folder && folder.locations) {
        folder.locations = folder.locations.filter(
          (location) => location.id !== locationToDelete.id
        );
      }
      // Optionally, remove the marker if it exists in the markers list
      state.locationMarkers = state.locationMarkers.filter(
        (marker) => marker.id !== locationToDelete.geoLocation.id
      );

      // If the deleted location was in the selected folder, update the selectedFolder
      if (state.selectedFolder.locations) {
        state.selectedFolder.locations = state.selectedFolder.locations.filter(
          (location) => location.id !== locationToDelete.id
        );
      }
    },
  },
});

export const {
  setUser,
  setTheme,
  setSelectedFolder,
  addFolder,
  deleteFolder,
  setFolderOpen,
  setLocationList,
  addMarker,
  deleteLocation,
} = globalSlice.actions;
export default globalSlice.reducer;

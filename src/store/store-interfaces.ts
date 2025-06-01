export interface GlobalState {
  theme: string; // Theme can be 'default', 'dark', etc.
  folderList: FolderType[]; // List of folders
}

export interface FolderType {
  id: string; // Unique identifier for the folder
  name: string; // Name of the folder
}

export interface GlobalState {
  theme: string; // Theme can be 'default', 'dark', etc.
  folderList: FolderType[]; // List of folders
  folderOpen: boolean; // Indicates if the folder is open
}

export interface FolderType {
  id: string; // Unique identifier for the folder
  name: string; // Name of the folder
}

import React, { ReactNode, useEffect, useState } from "react";
import "./Folder.scss";
import LocationList from "../Location-List/Location-List";
import { useDispatch, useSelector } from "react-redux";
import { setFolderOpen } from "../../store/global-store";
import { FolderType } from "../../store/store-interfaces";

interface FolderProps {
  name?: string;
  id?: string;
  children?: ReactNode;
  onDelete?: () => void;
  isLeaving?: boolean;
}

const Folder: React.FC<FolderProps> = ({ name, id, children, onDelete }) => {
  const dispatch = useDispatch();
  const openFolder = useSelector((state: any) => state.global.folderOpen);
  const folders = useSelector((state: any) => state.global.folders);
  const selectedFolder = useSelector(
    (state: any) => state.global.selectedFolder
  );

  const toggleFolderOpen = () => {
    dispatch(setFolderOpen(true));
  };

  /**
   * Remove the folder and dispatch the deleteFolder action on the parent component.
   * This function is called when the delete button is clicked.
   *
   * @param e
   */
  const removeFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <div>
      {!openFolder ? (
        <div className="folder-component-container">
          <ul
            className="list bg-primary bg-base-100 rounded-box shadow-md"
            onClick={toggleFolderOpen}
          >
            <li className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                />
              </div>
              <div>
                <div className="text-primary-content">{name}</div>
                <div className="text-primary-content text-xs uppercase font-semibold opacity-60">
                  Folder
                </div>
              </div>

              <button
                className="btn btn-square btn-ghost"
                onClick={removeFolder}
              >
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="location-list-container">
          {selectedFolder?.id === id && (
            <LocationList
              locations={
                folders
                  .filter((folder: any) => folder.id === selectedFolder.id)
                  .map((folder: FolderType) => folder.locations)[0]
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Folder;

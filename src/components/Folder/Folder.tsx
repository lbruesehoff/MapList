import React, { ReactNode, useState } from "react";
import "./Folder.scss";
import LocationList from "../Location-List/Location-List";
import { useDispatch, useSelector } from "react-redux";
import { setFolderOpen } from "../../store/global-store";

interface FolderProps {
  name?: string;
  children?: ReactNode;
}

const Folder: React.FC<FolderProps> = ({ name, children }) => {
  const dispatch = useDispatch();
  const openFolder = useSelector((state: any) => state.global.folderOpen);

  const toggleFolderOpen = () => {
    dispatch(setFolderOpen(true));
  };
  return (
    <div>
      {!openFolder ? (
        <div className="folder-component-container">
          <ul
            className="list bg-base-100 rounded-box shadow-md"
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
                <div>{name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Folder
                </div>
              </div>

              <button className="btn btn-square btn-ghost">
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
          <LocationList
            locations={[
              { id: 1, name: "Central Park", address: "New York, NY 10022" },
              {
                id: 2,
                name: "Golden Gate Bridge",
                address: "San Francisco, CA 94129",
              },
              {
                id: 3,
                name: "Space Needle",
                address: "400 Broad St, Seattle, WA 98109",
              },
            ]}
          ></LocationList>
        </div>
      )}
    </div>
  );
};

export default Folder;

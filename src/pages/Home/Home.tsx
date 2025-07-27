import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Folder from "../../components/Folder/Folder";
import Map from "../../components/Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { set, useForm } from "react-hook-form";
import {
  addFolder,
  setFolderOpen,
  setLocationList,
  setSelectedFolder, // Make sure this action exists in your global-store
  deleteFolder,
} from "../../store/global-store";
import PortalModal from "../../components/LocationFormDialog/LocationFormDialog";
import "./Home.scss";
import { useWindowSize } from "../../hooks/useWindowSize";

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const folderId = uuidv4();
  const locationId = uuidv4();
  const geoLocationId = uuidv4();
  const dispatch = useDispatch();
  const mobileViewWidth = 768; // Define your mobile view width
  const folders = useSelector((state: any) => state.global.folders);
  const folderOpen = useSelector((state: any) => state.global.folderOpen);
  const selectedFolder = useSelector(
    (state: any) => state.global.selectedFolder
  );
  const [locationFormOpen, setLocationFormOpen] = useState(false);
  const [leavingFolderId, setLeavingFolderId] = useState<string | null>(null);
  const [listView, setListView] = useState(true);
  const { screenWidth, screenHeight } = useWindowSize();

  useEffect(() => {
    setListView(true); // Reset to list view on screen size change
  }, [screenWidth]);
  /**
   * Determine what dialog opens based on the folder parameter.
   * @param folder
   */
  const openModal = (folder: any) => {
    if (!folder) {
      const folderCreateModal = document.getElementById(
        "my_modal_1"
      ) as HTMLDialogElement | null;
      if (folderCreateModal) folderCreateModal.showModal();
    } else {
      setLocationFormOpen(true);
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(
      "my_modal_1"
    ) as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  const closeLocationModal = () => {
    setLocationFormOpen(false);
  };

  const onSubmit = () => {
    if (!folderOpen) {
      dispatch(
        addFolder({
          id: folderId,
          name: getValues("folderName"),
          locations: [],
        })
      );
      closeModal();
    } else {
      dispatch(
        setLocationList({
          id: locationId,
          folderId: selectedFolder.id,
          name: getValues("locationList"),
          address: "123 Main St, Anytown, USA", // Placeholder address}));
          geoLocation: {
            id: geoLocationId, // Unique identifier for the location marker
            lat: 0, // Placeholder latitude
            lng: 0, // Placeholder longitude
          },
        })
      );
    }
    reset();
  };

  /**
   * Deletde a folder and update the state.
   * This function is called when the delete button is clicked on a folder.
   * It sets a leavingFolderId state to trigger a CSS transition,
   * then dispatches the deleteFolder action after a delay to allow the transition to complete.
   * This is to ensure a smooth user experience when removing folders from the UI.
   * @param folderId
   */
  const handleDeleteFolder = (folderId: string) => {
    setLeavingFolderId(folderId);
    setTimeout(() => {
      dispatch(deleteFolder(folderId));
      setLeavingFolderId(null);
    }, 500); // Match your CSS transition duration
  };

  return (
    <div className="list-container">
      <div className="folder-container">
        <div className="buttons">
          <div className="add-folder">
            <button
              className="btn btn-active btn-primary add-folder-button"
              onClick={() => openModal(folderOpen)}
            >
              add
            </button>
          </div>
          {folderOpen && (
            <ul className="menu menu-horizontal bg-base-200 views">
              <li onClick={() => setListView(false)}>
                <a className={!listView ? "menu-active" : ""}>Map View</a>
              </li>
              <li onClick={() => setListView(true)}>
                <a className={listView ? "menu-active" : ""}>List View</a>
              </li>
            </ul>
          )}
          {folderOpen && (
            <div className="folder-back">
              <button
                className="btn btn-active btn-primary "
                onClick={() => dispatch(setFolderOpen(false))}
              >
                back
              </button>
            </div>
          )}
        </div>

        {/* DIALOG TO CREATE FOLDER*/}
        <dialog
          id="my_modal_1"
          className="modal"
          onClick={(e) => {
            // Close modal if click is outside modal-box
            if (e.target === e.currentTarget) {
              (e.currentTarget as HTMLDialogElement).close();
            }
          }}
        >
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                type="button"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">New Map List</h3>

            <fieldset className="fieldset">
              <form onSubmit={handleSubmit(onSubmit)} className="folder-form">
                <legend className="fieldset-legend">
                  Etch its name in the black grimoire
                </legend>
                <div className="dialog-submit">
                  <input
                    {...register("folderName", {
                      required: true,
                    })}
                    type="text"
                    className={
                      errors.folderName ? "input input-error" : "input "
                    }
                    placeholder="An adventure most unladylike"
                    autoComplete="off"
                  />
                  <button className="btn btn-ghost" type="submit">
                    Add
                  </button>
                </div>
              </form>
              <p className="label desc">
                Mischief in mind and decorum left at home.
              </p>
            </fieldset>
          </div>
        </dialog>
        {/* DIALOG TO ADD TO FOLDER*/}
        {locationFormOpen && (
          <PortalModal
            onClose={closeLocationModal}
            children={undefined}
          ></PortalModal>
        )}
        {/* LISTS OF LOCATIONS */}
        {listView && (
          <div>
            {folders.length > 0 ? (
              folders.map((folder: { id: string; name: string }) => (
                <div
                  key={folder.id}
                  className={`folder${
                    leavingFolderId === folder.id ? " folder-leave" : ""
                  }`}
                  onClick={() => dispatch(setSelectedFolder(folder))}
                >
                  <Folder
                    name={folder.name}
                    onDelete={() => handleDeleteFolder(folder.id)}
                    isLeaving={leavingFolderId === folder.id}
                  />
                </div>
              ))
            ) : (
              <div
                role="alert"
                className="alert alert-info alert-soft no-folders"
              >
                <span>Why do you have no folders..?</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={folderOpen ? "map-container" : "map-container-folder"}>
        {(!listView || screenWidth > mobileViewWidth) && <Map />}
      </div>
    </div>
  );
};

export default Home;

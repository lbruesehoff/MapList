import React, { useEffect, useRef, useState } from "react";
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
} from "../../store/global-store";
import PortalModal from "../../components/LocationFormDialog/LocationFormDialog";
import "./Home.scss";

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
  const dispatch = useDispatch();
  const folders = useSelector((state: any) => state.global.folders);
  const folderOpen = useSelector((state: any) => state.global.folderOpen);
  const selectedFolder = useSelector(
    (state: any) => state.global.selectedFolder
  );
  const [locationFormOpen, setLocationFormOpen] = useState(false);

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
        })
      );
    }
    reset();
  };

  return (
    <div className="list-container">
      <div className="folder-container">
        <div className="buttons">
          <div className="add-folder">
            <button
              className="btn btn-circle add-folder-button"
              onClick={() => openModal(folderOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white fill-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {folderOpen && (
            <div className="folder-back">
              <button
                className="btn btn-circle add-folder-button"
                onClick={() => dispatch(setFolderOpen(false))}
              >
                <svg
                  className="w-6 h-6 red dark:text-blue fill-secondary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M5 12l4-4m-4 4 4 4"
                  />
                </svg>
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
              <p className="label">
                A moonlit escapade with mischief in mind and decorum left at
                home.
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

        {folders.length > 0 ? (
          folders.map((folder: { id: string; name: string }) => (
            <div
              className="folder"
              onClick={() =>
                dispatch(
                  setSelectedFolder({ id: folder.id, name: folder.name })
                )
              }
            >
              <Folder key={folder.id} name={folder.name}></Folder>
            </div>
          ))
        ) : (
          <div role="alert" className="alert alert-info alert-soft">
            <span>
              No sigil, no name, no spark — will you craft one, or let the
              silence claim your purpose?
            </span>
          </div>
        )}
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
};

export default Home;

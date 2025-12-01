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
  editFolderName,
} from "../../store/global-store";
import PortalModal from "../../components/LocationFormDialog/LocationFormDialog";
import { useWindowSize } from "../../hooks/useWindowSize";
import {
  createFolder,
  deleteFolderFirestore,
  editFolderNameFirestore,
  getAllLocations,
  getFolders,
} from "../../google/Fire-Store/database-calls";
import { getAuth } from "@firebase/auth";
import "./Home.scss";

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
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
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [leavingFolderId, setLeavingFolderId] = useState<string | null>(null);
  const [listView, setListView] = useState(true);
  const { screenWidth, screenHeight } = useWindowSize();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setListView(true); // Reset to list view on screen size change
  }, [screenWidth]);

  // Fetch all locations and folders
  useEffect(() => {
    const fetchData = async () => {
      const folders = await getFolders(user?.uid || "");
      folders.forEach((folder) => {
        dispatch(addFolder(folder));
      });
      const locations = await getAllLocations(user?.uid || "");
      locations.forEach((location) => {
        dispatch(setLocationList(location));
      });
    };
    fetchData();
  }, []);

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

  const backButton = () => {
    dispatch(setFolderOpen(false));
    setListView(true);
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
      const folderData = {
        id: folderId,
        name: getValues("folderName"),
        locations: [],
      };
      dispatch(addFolder(folderData)); // Add to Redux store
      createFolder(user?.uid || "", folderData); // Add to Firestore
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
   * Open the edit folder name dialog and set the selected folder id.
   * @param folderId
   */
  const handleEditFolderName = (folderId: string) => {
    const dialog = document.getElementById(
      "edit_folder_dialog"
    ) as HTMLDialogElement | null;
    if (dialog) {
      setValue("editFolderName", "");
      setSelectedFolderId(folderId);
      dialog.showModal();
    }
  };

  /**
   * Submits the edited folder name and updates the redux store and Firestore.
   * @param event
   * @param id folder id
   */
  const submitEditFolderName = (
    event: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    const dialog = document.getElementById(
      "edit_folder_dialog"
    ) as HTMLDialogElement;
    event.preventDefault();

    const newName = getValues("editFolderName");
    if (newName) {
      dispatch(editFolderName({ id, name: newName }));
      editFolderNameFirestore(user?.uid || "", id, newName);
      dialog.close();
    }
  };

  /**
   * Delete a folder and update the state.
   * This function is called when the delete button is clicked on a folder.
   * It sets a leavingFolderId state to trigger a CSS transition,
   * then dispatches the deleteFolder action after a delay to allow the transition to complete.
   * This is to ensure a smooth user experience when removing folders from the UI.
   * @param folderId
   */
  const handleDeleteFolder = (folderId: string) => {
    setLeavingFolderId(folderId);
    setTimeout(() => {
      deleteFolderFirestore(user?.uid || "", folderId);
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
                onClick={backButton}
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
          <div className="modal-box folder-modal">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                type="button"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg new-folder-text">New Folder</h3>

            {/* <fieldset className="fieldset"> */}
            <form onSubmit={handleSubmit(onSubmit)} className="folder-form">
              {/* <legend className="fieldset-legend">Name</legend> */}
              <div className="dialog-submit">
                <input
                  {...register("folderName", {
                    required: true,
                  })}
                  type="text"
                  className={errors.folderName ? "input input-error" : "input "}
                  placeholder="Folder Name"
                  autoComplete="off"
                />
                <button
                  className="btn btn-primary folder-submit-button"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
            {/* <p className="label desc">
                Mischief in mind and decorum left at home.
              </p> */}
            {/* </fieldset> */}
          </div>
        </dialog>
        {/* DIALOG TO EDIT FOLDER NAME */}
        <dialog
          id="edit_folder_dialog"
          className="modal"
          onClick={(e) => {
            // Close modal if click is outside modal-box
            if (e.target === e.currentTarget) {
              (e.currentTarget as HTMLDialogElement).close();
            }
          }}
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Folder Name</h3>
            <form
              onSubmit={(e) => submitEditFolderName(e, selectedFolderId)}
              className="folder-form"
            >
              {/* <legend className="fieldset-legend">Name</legend> */}
              <div className="dialog-submit">
                <input
                  {...register("editFolderName")}
                  type="text"
                  className={
                    errors.editFolderName ? "input input-error" : "input "
                  }
                  placeholder="Edit Folder Name"
                  autoComplete="off"
                />
                <button
                  className="btn btn-primary folder-submit-button"
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* DIALOG TO ADD TO FOLDER*/}
        {locationFormOpen && (
          <PortalModal onClose={closeLocationModal}></PortalModal>
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
                    id={folder.id}
                    onDelete={() => handleDeleteFolder(folder.id)}
                    onEdit={() => handleEditFolderName(folder.id)}
                    isLeaving={leavingFolderId === folder.id}
                  />
                </div>
              ))
            ) : (
              <div role="alert" className="alert alert-info no-folders">
                <span>
                  Begin by creating a folder for your adventure. The Old Ones
                  demand structure before madness...
                </span>
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

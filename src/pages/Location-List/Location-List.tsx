import React from "react";
import "./Location-List.scss";
import Folder from "../../components/Folder/Folder";
import Map from "../../components/Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addFolder } from "../../store/global-store";

const LocationList: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const folderList = useSelector((state: any) => state.global.folderList);

  const onSubmit = () => {
    dispatch(
      addFolder({ id: Date.now().toString(), name: getValues("folderName") })
    );
  };
  return (
    <div className="list-container">
      <div className="folder-container">
        <div className="add-folder">
          <button
            className="btn btn-circle add-folder-button"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_3"
              ) as HTMLDialogElement | null;
              if (modal) modal.showModal();
            }}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        {/* DIALOG */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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
        {folderList.length > 0 ? (
          folderList.map((folder: { id: string; name: string }) => (
            <div className="folder">
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

export default LocationList;

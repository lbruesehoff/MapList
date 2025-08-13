// PortalModal.tsx
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { use, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import "./LocationFormDialog.scss";
import { useDispatch, useSelector } from "react-redux";
import { addMarker, setLocationList } from "../../store/global-store";
import { addLocation } from "../../google/Fire-Store/database-calls";

interface PortalModalProps {
  onClose: () => void;
}

const PortalModal: React.FC<PortalModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const places = useMapsLibrary("places");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>();

  const selectedFolder = useSelector(
    (state: any) => state.global.selectedFolder
  );

  useEffect(() => {
    if (
      !places ||
      !inputRef.current ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    )
      return;
    const options = { fields: ["geometry", "name", "formatted_address"] };
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    setPlaceAutocomplete(autocomplete);
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;
    const listener = placeAutocomplete.addListener("place_changed", () => {
      setSelectedPlace(placeAutocomplete.getPlace());
    });
    return () => listener.remove();
  }, [placeAutocomplete]);

  const Location = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("location", location);
  };

  const onSubmit = () => {
    const locationData = {
      id: Date.now().toString(),
      folderId: selectedFolder.id,
      name: selectedPlace?.name || "Unnamed Location",
      address: selectedPlace?.formatted_address || "No Address",
      geoLocation: getValues("location"),
    };
    dispatch(addMarker(getValues("location")));
    dispatch(setLocationList(locationData));
    addLocation(selectedFolder.id, locationData);
    onClose();
  };

  useEffect(() => {
    if (selectedPlace?.geometry?.location) {
      const lat = selectedPlace.geometry.location.lat();
      const lng = selectedPlace.geometry.location.lng();
      setLocation({ lat, lng });
      setValue("location", { lat, lng });
    } else {
      setLocation(null);
      setValue("location", null);
    }
  }, [selectedPlace]);

  return ReactDOM.createPortal(
    <div
      className="location-container fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="location-modal bg-base-100 rounded-box p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="location-form-title font-bold text-lg">New Location</h3>
        <fieldset className="fieldset">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <legend className="fieldset-legend">
              Etch its name in the black grimoire
            </legend> */}
            <div className="dialog-submit">
              <input
                {...register("location", {
                  required: true,
                })}
                onChange={Location}
                ref={inputRef}
                type="text"
                className={errors.location ? "input input-error" : "input"}
                placeholder="Search for a place"
              />
              {selectedPlace && (
                <div className="mt-2 selected-place-info">
                  <strong>Selected:</strong> {selectedPlace.name} <br />
                  {selectedPlace.formatted_address}
                </div>
              )}
              <button
                className="btn btn-primary location-add-button"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>,

    document.body
  );
};

export default PortalModal;

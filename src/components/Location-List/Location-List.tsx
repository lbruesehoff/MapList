import React, { useEffect, useState } from "react";
import "./Location-List.scss";
import { LocationType } from "../../store/store-interfaces";
import { useDispatch, useSelector } from "react-redux";
import { deleteLocation, setLocationList } from "../../store/global-store";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { deleteLocationFirestore } from "../../google/Fire-Store/database-calls";
import { getAuth } from "firebase/auth";

interface Location {
  id: number;
  name: string;
  address: string;
}

interface LocationListProps {
  locations: LocationType[];
  onSelect?: (location: Location) => void;
}

const LocationList: React.FC<LocationListProps> = ({ locations, onSelect }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const selectedFolder = useSelector(
    (state: any) => state.global.selectedFolder
  );

  const [removingId, setRemovingId] = useState<string | null>(null); // State to track which location is being removed

  const deleteLocationMarker = (location: LocationType) => {
    setRemovingId(location.id);
    setTimeout(() => {
      dispatch(deleteLocation(location));
      deleteLocationFirestore(user?.uid || "", location.folderId, location.id);
      setRemovingId(null);
    }, 400); // Match animation duration
  };

  return (
    <div>
      <h2 className="text-secondary folder-name">{selectedFolder?.name}</h2>
      <ul>
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <ul
              className={`list bg-primary bg-base-100 rounded-box shadow-md location-container${
                removingId === location.id ? " slide-out-left" : ""
              }`}
              key={location.id}
            >
              {/* <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Most played songs this week
          </li> */}

              <li className="list-row location-content">
                <div className="text-primary-content text-4xl font-thin opacity-30 tabular-nums">
                  {index + 1}
                </div>
                <div className="list-col-grow">
                  <div className="text-primary-content">{location.name}</div>
                  <div className="text-primary-content text-xs uppercase font-semibold opacity-60">
                    {location.address}
                  </div>
                </div>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => deleteLocationMarker(location)}
                >
                  <TrashIcon size={32} className="delete-location-icon" />
                </button>
              </li>
            </ul>
          ))
        ) : (
          <div role="alert" className="alert alert-info no-locations">
            <span className="text-primary-content">
              Now, populate the folder with locations. The Old Ones require
              offerings one pin at a time...
            </span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default LocationList;

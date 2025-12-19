import React, { useState } from "react";
import "./settings.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const navigate = useNavigate();
  const name = useSelector((state: any) => state.global.user.name);
  const email = useSelector((state: any) => state.global.user.email);
  const [selectedMenu, setSelectedMenu] = useState<string>("Profile");

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="settings-container">
      <div className="settings-header-container">
        <h1 className="settings-header">Settings</h1>
        <div className="settings-subheader">
          <h2>Manage your preferences</h2>
        </div>
        <hr className="settings-separator" />
      </div>
      <div className="settings-content-container">
        <div className="settings-menu">
          <ul className="menu bg-base-200 rounded-box w-56">
            <li>
              <a onClick={() => setSelectedMenu("Profile")}>Profile</a>
            </li>
            <li>
              <a onClick={() => setSelectedMenu("Account")}>Account</a>
            </li>
          </ul>
        </div>
        <div className="settings-content">
          <h1 className="settings-content-header">{selectedMenu}</h1>
          {selectedMenu === "Profile" ? (
            <div className="settings-content-name">
              <span className="bold">Name:</span> {name}
            </div>
          ) : (
            <div className="settings-content-account">
              <div className="settings-email">
                <span className="bold">Email:</span> {email}
              </div>
              <div className="settings-reset-password">
                <a onClick={() => navigateTo("/forgot-password")}>
                  Reset Password
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

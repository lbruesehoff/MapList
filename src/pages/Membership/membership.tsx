import React from "react";
import "./membership.scss";
import { useDispatch, useSelector } from "react-redux";
import { set } from "react-hook-form";
import { setMembershipLevel } from "../../store/global-store";
import { MembershipLevels } from "../../store/store-interfaces";
import { createSelector } from "@reduxjs/toolkit";
import { updateUserMembership } from "../../google/Fire-Store/database-calls";
const Membership: React.FC = () => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: any) => state.global.user);

  const freeMembership = () => {
    console.log("Free Membership selected");
  };

  const upgradeMembership = () => {
    dispatch(setMembershipLevel(MembershipLevels.Pro));
    updateUserMembership(MembershipLevels.Free);
  };
  return (
    <div className="memberships-container">
      {reduxUser.membership === MembershipLevels.Pro && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>You're already a Pro!</span>
        </div>
      )}
      <div className="badge badge-xs badge-warning">
        Get the most out of your membership
      </div>

      <div className="membership-page-title">Membership Plans</div>
      <div className="membership-description">
        Choose the plan that's
        <span className="text-secondary membership-highlight">
          {" "}
          right for you.
        </span>
      </div>
      <div className="membership-plans">
        <div className="card w-96 bg-base-100 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs"></span>

            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Free</h2>
              <span className="text-xl">$0/mo</span>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>2 Folders</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>5 Locations per folder</span>
              </li>

              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>3 themes</span>
              </li>
              <li className="opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-base-content/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="line-through">Download Maps</span>
              </li>
              <li className="opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-base-content/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="line-through">Save Folders and Locations</span>
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={freeMembership}
                className="btn btn-neutral btn-block"
                disabled={true}
              >
                {reduxUser.membership === MembershipLevels.Pro
                  ? "You're a Pro!"
                  : "Current Plan"}
              </button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">Most Popular</span>
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Pro</h2>
              <span className="text-xl">$5/mo</span>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Unlimited Folders</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Unlimited Locations</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>10+ themes to choose from</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Download Maps</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Save Folders and Locations</span>
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={upgradeMembership}
                className="btn btn-primary btn-block"
                disabled={reduxUser.membership === MembershipLevels.Pro}
              >
                {reduxUser.membership === MembershipLevels.Pro
                  ? "You're a Pro!"
                  : "Upgrade Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;

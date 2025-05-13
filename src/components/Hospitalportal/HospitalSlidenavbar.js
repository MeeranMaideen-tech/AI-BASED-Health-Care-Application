// src/components/hospitalportal/HospitalSlidenavbar.js

import React from "react";
import { Link } from "react-router-dom";

const HospitalSlidenavbar = () => {
  return (
    <div className="w-64 bg-[#07a794] text-white p-6 space-y-6">
      <h2 className="text-lg font-semibold">Menu</h2>
      <ul className="space-y-3">
        <li>
          <Link
            to="addpatient"
            className="block hover:bg-white hover:text-[#07a794] p-2 rounded-lg"
          >
            Add Patient
          </Link>
        </li>
        <li>
          <Link
            to="managerecords"
            className="block hover:bg-white hover:text-[#07a794] p-2 rounded-lg"
          >
            Manage Records
          </Link>
        </li>
        <li>
          <Link
            to="dischargedlist"
            className="block hover:bg-white hover:text-[#07a794] p-2 rounded-lg"
          >
            Discharged List
          </Link>
        </li>
        <li>
          <Link
            to="settings"
            className="block hover:bg-white hover:text-[#07a794] p-2 rounded-lg"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HospitalSlidenavbar;

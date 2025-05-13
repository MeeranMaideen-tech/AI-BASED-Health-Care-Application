// src/components/hospitalportal/Hospitalportal.js

import React from "react";
import HospitalTopmenu from "./HospitalTopmenu";
import HospitalSlidenavbar from "./HospitalSlidenavbar";
import HospitalContentDisplay from "./HospitalContentDisplay";

const HospitalPortal = () => {
  return (
    <div className="flex flex-col h-screen">
      <HospitalTopmenu />
      <div className="flex flex-1">
        <HospitalSlidenavbar />
        <HospitalContentDisplay />
      </div>
    </div>
  );
};

export default HospitalPortal;

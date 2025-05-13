import React from "react";
import About from "./About";
import Inpatient from "./Inpatient";
import Outpatient from "./Outpatient";
import HospitalPatients  from "./HospitalInpatients";
import Newinfection from "./Newinfection";
import Outbreakzones from "../common/OutbreakZones";
import PatientDetails from "./PatientDetails"; // Import PatientDetails component
import "./doctorportalcss/ContentDisplay.css";

const ContentDisplay = ({ content, setContent }) => {
  if (typeof content === "object" && content.page === "PatientDetails") {
    return <PatientDetails patient={content.patient} setContent={setContent} />;
  }

  return (
    <div className="content-display">
      {content === "About" && <About />}
      {content === "Inpatient" && <Inpatient setContent={setContent} />}
      {content === "Outpatient" && <Outpatient />}
      {content === "Newinfection" && <Newinfection />}
      {content === "HospitalPatients" && <HospitalPatients />}

      {content === "Outbreakzones" && <Outbreakzones />}
    </div>
  );
};

export default ContentDisplay;

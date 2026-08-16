import { useState } from "react";
import "../styles/form.css";

function Education({ cv, setCV, setSubmitBtn }) {
  const ALERT_SVG = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title/>
    <g id="Complete">
    <g id="alert-circle">
    <g>
    <line fill="none" stroke="#FF0033" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"/>
    <line fill="none" stroke="#FF0033" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"/>
    <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="#FF0033" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    </g>
    </g>
    </g>
    </svg>

  const ADD_BTN = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title/>
    <g id="Complete">
    <g id="add-square">
    <g>
    <rect data-name="--Rectangle" fill="none" height="20" id="_--Rectangle" rx="2" ry="2" stroke="#546583" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="20" x="2" y="2"/>
    <line fill="none" stroke="#546583" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="15.5" x2="8.5" y1="12" y2="12"/>
    <line fill="none" stroke="#546583" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="15.5" y2="8.5"/>
    </g>
    </g>
    </g>
    </svg>
  const ARROW = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title/>
    <g id="Complete">
    <g id="F-Chevron">
    <polyline fill="none" id="Left" points="15.5 5 8.5 12 15.5 19" stroke="#546583" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    </g>
    </g>
    </svg>

  const schools = cv.education;
  const [schoolsDropdown, setIsOpen] = useState([]);
  const [schoolsSaved, setIsSaved] = useState([]);
  const [deleteBtn, setDeleteBtn] = useState(true);
  const [warnings, setWarnings] = useState({});

  function addSchool() {
    const school = {
      id: crypto.randomUUID(),
      name: "",
      qualification: "",
      start: "",
      end: "",
      location: "",
    };

    const isOpen = {
      id: school.id,
      isOpen: true,
    }
    setIsOpen([...schoolsDropdown, isOpen]);

    const updatedSchools = [...cv.education, school];
    setCV({ ...cv, education: updatedSchools });

    setDeleteBtn(true);
  }

  function removeSchool(index) {
    const schoolId = schools[index].id;

    const updatedSchools = [...cv.education];
    updatedSchools.splice(index, 1);
    setCV({ ...cv, education: updatedSchools });

    setIsOpen(schoolsDropdown.filter((school) => school.id !== schoolId));
    setIsSaved(schoolsSaved.filter((school) => school.id !== schoolId));

    setDeleteBtn(true);
  }

  function cancelSchool(index, id) {
    const isSaved = schoolsSaved.find((school) => school.id === id);

    if (isSaved) {
      flipDropDownMenu(id);
    } else {
      removeSchool(index);
    }
  }

  const updateSchool = (index, field, value) => {
    const updatedEducation = schools.map((school, i) =>
      i === index ? { ...school, [field]: value } : school
    );
    setCV({ ...cv, education: updatedEducation });
  };

  function isOpen(id) {
    return schoolsDropdown.find((job) => job.id === id)?.isOpen ?? false;
  }

  function flipDropDownMenu(id) {
    const updatedJobs = schoolsDropdown.map((school) =>
      school.id === id
        ? { ...school, isOpen: !school.isOpen }
        : school
    );
    setIsOpen(updatedJobs);

    const isSaved = schoolsSaved.find((school) => school.id === id);

    if (isSaved) setDeleteBtn(false);
  }

  function isDateValid(date) {
    const dateRegExp = /^\d{4}-(0[1-9]|1[0-2])$/;
    return dateRegExp.test(date);
  }

  function setFieldWarning(id, field, value) {
    setWarnings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  }

  function isInputValid(id, field, value) {
    if (field === "start") {
      setFieldWarning(id, "startInvalid", !!value && !isDateValid(value));
      setFieldWarning(id, "start", !value);
    } else if (field === "end") {
      setFieldWarning(id, "endInvalid", !!value && !isDateValid(value));
    } else if (field === "name") {
      setFieldWarning(id, "name", !value);
    } else if (field === "qualification") {
      setFieldWarning(id, "qualification", !value);
    } else if (field === "location") {
      setFieldWarning(id, "location", !value);
    }
  }

  function isValid(id) {
    const school = cv.education.find((school) => school.id === id);

    const schoolWarnings = {
      name: !school.name,
      qualification: !school.qualification,
      start: !school.start,
      startInvalid: !!school.start && !isDateValid(school.start),
      endInvalid: !!school.end && !isDateValid(school.end),
      location: !school.location,
    };

    const isInvalid = Object.values(schoolWarnings).some(Boolean);

    if (isInvalid) {
      setWarnings((prev) => ({ ...prev, [id]: schoolWarnings }));
      return false;
    }

    setWarnings((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    return true;
  }

  function saveSchool(id) {
    if (!isValid(id)) return;

    const isSaved = { id };
    setIsSaved([...schoolsSaved, isSaved]);
    flipDropDownMenu(id);
    setDeleteBtn(false);
  }

  function invalidClass(...flags) {
    return flags.some(Boolean) ? "invalid" : "";
  }

  // A school counts as "active" if it"s an unsaved school currently being filled in,
  // or a saved school whose dropdown is currently expanded. Only one of these
  // should ever block the rest of the UI at a time.
  const unsavedSchool = schools.find((school) => !schoolsSaved.some((saved) => saved.id === school.id));
  const openSavedSchool = schoolsSaved.find((saved) => {
    const entry = schoolsDropdown.find((school) => school.id === saved.id);
    return entry?.isOpen;
  });
  const activeSchoolId = unsavedSchool ? unsavedSchool.id : openSavedSchool ? openSavedSchool.id : null;

  setSubmitBtn(activeSchoolId);

  const schoolList = schools.map((school, index) =>
    <div className="school-form-container" key={school.id}>
      <div className="school-name-container">
        <div className="school-name">
          {school.name || `School ${index + 1}`}
        </div>
        <div className={`dropdown-btn-container ${isOpen(school.id) ? "active" : ""}`}>
          <button
            type="button"
            onClick={() => flipDropDownMenu(school.id)}
            disabled={
              (activeSchoolId !== null && activeSchoolId !== school.id) ||
              (unsavedSchool?.id === school.id)
            }
          >
          {ARROW}
          </button>
        </div>
      </div>
      <div className={isOpen(school.id) ? "dropdown-container-active" : "hidden"}>
        <div className="form-row">
          <label htmlFor={`school-${index}`}>School <span className="required">*</span></label>
          <input
            type="text"
            id={`school-${index}`}
            name="school"
            placeholder="The Odin Project"
            maxLength="64"
            value={school.name}
            onChange={(e) => {
              updateSchool(index, "name", e.target.value);
              isInputValid(school.id, "name", e.target.value);
            }}
            className={invalidClass(warnings[school.id]?.name)}
          />
          {warnings[school.id]?.name && (
            <div className="required-warning">{ALERT_SVG} School name is required.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`role-${index}`}>Qualification <span className="required">*</span></label>
          <input
            type="text"
            id={`qualification-${index}`}
            name="role"
            placeholder="BSc Computer Science"
            maxLength="64"
            value={school.qualification}
            onChange={(e) => {
              updateSchool(index, "qualification", e.target.value);
              isInputValid(school.id, "qualification", e.target.value);
            }}
            className={invalidClass(warnings[school.id]?.qualification)}
          />
          {warnings[school.id]?.qualification && (
            <div className="required-warning">{ALERT_SVG} Qualification is required.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`schoolStart-${index}`}>Start Date <span className="required">*</span></label>
          <input
            type="month"
            id={`schoolStart-${index}`}
            name="schoolStart"
            placeholder="YYYY-MM"
            value={school.start}
            onChange={(e) => {
              updateSchool(index, "start", e.target.value);
              isInputValid(school.id, "start", e.target.value);
            }}
            className={invalidClass(warnings[school.id]?.start)}
          />
          {warnings[school.id]?.start && (
            <div className="required-warning">{ALERT_SVG} Start date is required.</div>
          )}
          {warnings[school.id]?.startInvalid && (
            <div className="required-warning">{ALERT_SVG} Start date is invalid.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`schoolEnd-${index}`}>End Date</label>
          <input
            type="month"
            id={`schoolEnd-${index}`}
            name="schoolEnd"
            placeholder="YYYY-MM"
            value={school.end}
            onChange={(e) => {
              updateSchool(index, "end", e.target.value);
              isInputValid(school.id, "end", e.target.value);
            }}
            className={invalidClass(warnings[school.id]?.end)}
          />
          {warnings[school.id]?.endInvalid && (
            <div className="required-warning">{ALERT_SVG} End date is invalid.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`schoolLocation-${index}`}>Location <span className="required">*</span></label>
          <input
            type="text"
            id={`schoolLocation-${index}`}
            name="schoolLocation" value={school.location}
            placeholder="London"
            maxLength="64"
            onChange={(e) => {
              updateSchool(index, "location", e.target.value);
              isInputValid(school.id, "location", e.target.value);
            }}
            className={invalidClass(warnings[school.id]?.location)}
          />
          {warnings[school.id]?.location && (
            <div className="required-warning">{ALERT_SVG} Location is required.</div>
          )}
        </div>
        <div className="form-row">
          <button type="button" onClick={() => removeSchool(index)} hidden={deleteBtn}>Delete</button>
          <button type="button" onClick={() => cancelSchool(index, school.id)}>Cancel</button>
          <button type="button" onClick={() => saveSchool(school.id)}>Save</button>
        </div>
      </div>
    </div>
  )

  return (
    <>
    <div className="education-container background-style">
      <div className="form-header">
          <h3>Education</h3>
          <button type="button" title="Add School" onClick={addSchool} disabled={activeSchoolId !== null}>{ADD_BTN}</button>
      </div>
      {schoolList}
    </div>
    </>
  )
}

export default Education
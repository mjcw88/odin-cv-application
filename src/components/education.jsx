import { useState } from "react";
import "../styles/form.css";

function Education({ cv, setCV, setSubmitBtn }) {
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
    return schoolsDropdown.find((school) => school.id === id).isOpen;
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
        <div className="dropdown-btn">
          <button
            type="button"
            onClick={() => flipDropDownMenu(school.id)}
            disabled={
              (activeSchoolId !== null && activeSchoolId !== school.id) ||
              (unsavedSchool?.id === school.id)
            }
          >
          ↓
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
            <div className="required-warning">School name is required.</div>
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
            <div className="required-warning">Qualification is required.</div>
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
            <div className="required-warning">Start date is required.</div>
          )}
          {warnings[school.id]?.startInvalid && (
            <div className="required-warning">Start date is invalid.</div>
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
            <div className="required-warning">End date is invalid.</div>
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
            <div className="required-warning">Location is required.</div>
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
          <button type="button" onClick={addSchool} disabled={activeSchoolId !== null}>Add</button>
      </div>
      {schoolList}
    </div>
    </>
  )
}

export default Education
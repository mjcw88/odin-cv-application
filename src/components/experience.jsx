import { useState } from "react";
import "../styles/form.css";

function Experience({ cv, setCV, setSubmitBtn }) {
  const ALERT_SVG = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  const ADD_BTN = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  const ARROW = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g id="Complete">
    <g id="F-Chevron">
    <polyline fill="none" id="Left" points="15.5 5 8.5 12 15.5 19" stroke="#546583" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    </g>
    </g>
    </svg>

  const jobs = cv.experience;
  const [jobsDropdown, setIsOpen] = useState([]);
  const [jobsSaved, setIsSaved] = useState([]);
  const [deleteBtn, setDeleteBtn] = useState(true);
  const [warnings, setWarnings] = useState({});

  function addJob() {
    const job = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      start: "",
      end: "",
      location: "",
      description: "",
    };

    const isOpen = {
      id: job.id,
      isOpen: true,
    }
    setIsOpen([...jobsDropdown, isOpen]);

    const updatedJobs = [...cv.experience, job];
    setCV({ ...cv, experience: updatedJobs });

    setDeleteBtn(true);
  }

  function removeJob(index) {
    const jobId = jobs[index].id;

    const updatedJobs = [...cv.experience];
    updatedJobs.splice(index, 1);
    setCV({ ...cv, experience: updatedJobs });

    setIsOpen(jobsDropdown.filter((job) => job.id !== jobId));
    setIsSaved(jobsSaved.filter((job) => job.id !== jobId));

    setDeleteBtn(true);
  }

  function cancelJob(index, id) {
    const isSaved = jobsSaved.find((job) => job.id === id);

    if (isSaved) {
      flipDropDownMenu(id);
    } else {
      removeJob(index);
    }
  }

  const updateJob = (index, field, value) => {
    const updatedExperience = jobs.map((job, i) =>
      i === index ? { ...job, [field]: value } : job
    );
    setCV({ ...cv, experience: updatedExperience });
  };

  function isOpen(id) {
    return jobsDropdown.find((job) => job.id === id)?.isOpen ?? false;
  }

  function flipDropDownMenu(id) {
    const updatedJobs = jobsDropdown.map((job) =>
      job.id === id
        ? { ...job, isOpen: !job.isOpen }
        : job
    );
    setIsOpen(updatedJobs);

    const isSaved = jobsSaved.find((job) => job.id === id);

    if (isSaved) setDeleteBtn(false);
  }

  function isDateValid(date) {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
    return dateRegex.test(date);
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
    } else if (field === "company") {
      setFieldWarning(id, "company", !value);
    } else if (field === "role") {
      setFieldWarning(id, "role", !value);
    } else if (field === "location") {
      setFieldWarning(id, "location", !value);
    }
  }

  function isValid(id) {
    const job = cv.experience.find((job) => job.id === id);

    const jobWarnings = {
      company: !job.company,
      role: !job.role,
      start: !job.start,
      startInvalid: !!job.start && !isDateValid(job.start),
      endInvalid: !!job.end && !isDateValid(job.end),
      location: !job.location,
    };

    const isInvalid = Object.values(jobWarnings).some(Boolean);

    if (isInvalid) {
      setWarnings((prev) => ({ ...prev, [id]: jobWarnings }));
      return false;
    }

    setWarnings((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    return true;
  }

  function saveJob(id) {
    if (!isValid(id)) return;

    const isSaved = { id };
    setIsSaved([...jobsSaved, isSaved]);
    flipDropDownMenu(id);
    setDeleteBtn(false);
  }

  function invalidClass(...flags) {
    return flags.some(Boolean) ? "invalid" : "";
  }

  // A job counts as "active" if it"s an unsaved job currently being filled in,
  // or a saved job whose dropdown is currently expanded. Only one of these
  // should ever block the rest of the UI at a time.
  const unsavedJob = jobs.find((job) => !jobsSaved.some((saved) => saved.id === job.id));
  const openSavedJob = jobsSaved.find((saved) => {
    const entry = jobsDropdown.find((job) => job.id === saved.id);
    return entry?.isOpen;
  });
  const activeJobId = unsavedJob ? unsavedJob.id : openSavedJob ? openSavedJob.id : null;
  
  setSubmitBtn(activeJobId);

  const jobsList = jobs.map((job, index) =>
    <div className="job-form-container" key={job.id}>
      <div className="job-name-container">
        <div className="job-name">
          {job.company || `Job ${index + 1}`}
        </div>
        <div className={`dropdown-btn-container ${isOpen(job.id) ? "active" : ""}`}>
          <button
            type="button"
            title="Expand Job"
            aria-label={`Expand ${job.role} at ${job.company} details`}
            aria-expanded={`${isOpen(job.id) ? "true" : "false"}`}
            aria-controls={`job-details-${index}`}
            onClick={() => flipDropDownMenu(job.id)}
            disabled={
              (activeJobId !== null && activeJobId !== job.id) ||
              (unsavedJob?.id === job.id)
            }
          >
          {ARROW}
          </button>
        </div>
      </div>
      <div className={isOpen(job.id) ? "dropdown-container-active" : "hidden"} id={`job-details-${index}`}>
        <div className="form-row">
          <label htmlFor={`company-${index}`}>Company <span className="required">*</span></label>
          <input
            type="text"
            id={`company-${index}`}
            name="company"
            placeholder="The Odin Project"
            maxLength="64"
            value={job.company}
            aria-required="true"
            onChange={(e) => {
              updateJob(index, "company", e.target.value);
              isInputValid(job.id, "company", e.target.value);
            }}
            className={invalidClass(warnings[job.id]?.company)}
          />
          {warnings[job.id]?.company && (
            <div className="required-warning">{ALERT_SVG} Company name is required.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`role-${index}`}>Role <span className="required">*</span></label>
          <input
            type="text"
            id={`role-${index}`}
            name="role"
            placeholder="Web Developer"
            maxLength="64"
            value={job.role}
            aria-required="true"
            className={invalidClass(warnings[job.id]?.role)}
            onChange={(e) => {
              updateJob(index, "role", e.target.value);
              isInputValid(job.id, "role", e.target.value);
            }}
          />
          {warnings[job.id]?.role && (
            <div className="required-warning">{ALERT_SVG} Role is required.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`jobStart-${index}`}>Start Date <span className="required">*</span></label>
          <input
            type="month"
            id={`jobStart-${index}`}
            name="jobStart"
            placeholder="YYYY-MM"
            value={job.start}
            aria-required="true"
            className={invalidClass(warnings[job.id]?.start, warnings[job.id]?.startInvalid)}
            onChange={(e) => {
              updateJob(index, "start", e.target.value);
              isInputValid(job.id, "start", e.target.value);
            }}
          />
          {warnings[job.id]?.start && (
            <div className="required-warning">{ALERT_SVG} Start date is required.</div>
          )}
          {warnings[job.id]?.startInvalid && (
            <div className="required-warning">{ALERT_SVG} Start date is invalid.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`jobEnd-${index}`}>End Date</label>
          <input
            type="month"
            id={`jobEnd-${index}`}
            name="jobEnd"
            placeholder="YYYY-MM"
            value={job.end}
            className={invalidClass(warnings[job.id]?.endInvalid)}
            onChange={(e) => {
              updateJob(index, "end", e.target.value);
              isInputValid(job.id, "end", e.target.value);
            }}
          />
          {warnings[job.id]?.endInvalid && (
            <div className="required-warning">{ALERT_SVG} End date is invalid.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`location-${index}`}>Location <span className="required">*</span></label>
          <input
            type="text"
            id={`location-${index}`}
            name="location"
            placeholder="London"
            maxLength="64"
            value={job.location}
            aria-required="true"
            className={invalidClass(warnings[job.id]?.location)} 
            onChange={(e) => {
              updateJob(index, "location", e.target.value);
              isInputValid(job.id, "location", e.target.value);;
            }}
          />
          {warnings[job.id]?.location && (
            <div className="required-warning">{ALERT_SVG} Location is required.</div>
          )}
        </div>
        <div className="form-row" >
          <label htmlFor={`description-${index}`}>Description</label>
          <textarea
            id={`description-${index}`}
            name="description"
            maxLength="1000"
            value={job.description} 
            onChange={(e) => {
              updateJob(index, "description", e.target.value);
              isInputValid(job.id, "description", e.target.value);
            }}
          />
        </div>
        <div className="form-row">
          <button type="button" title="Delete Job" aria-label={`Delete Job: ${job.role} at ${job.company}`} onClick={() => removeJob(index)} hidden={deleteBtn}>Delete</button>
          <button type="button" title="Cancel Job" aria-label={`Cancel Job: ${job.role} at ${job.company}`} onClick={() => cancelJob(index, job.id)}>Cancel</button>
          <button type="button" title="Save Job" aria-label={`Save Job: ${job.role} at ${job.company}`} onClick={() => saveJob(job.id)}>Save</button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="experience-container background-style">
        <div className="form-header">
            <h3>Experience</h3>
            <button type="button" title="Add Job" aria-label="Add Job" onClick={addJob} disabled={activeJobId !== null}>{ADD_BTN}</button>
        </div>
        {jobsList}
      </div>
    </>
  )
}

export default Experience
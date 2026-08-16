import { useState } from "react";
import '../styles/form.css';

function Experience({ cv, setCV }) {
  const [jobsDropdown, setIsOpen] = useState([]);
  const [jobsSaved, setIsSaved] = useState([]);
  const [deleteBtn, setDeleteBtn] = useState(true);

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

    setIsOpen(jobsDropdown.filter((j) => j.id !== jobId));
    setIsSaved(jobsSaved.filter((j) => j.id !== jobId));

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

  const jobs = cv.experience;

  const updateJob = (index, field, value) => {
    const updatedExperience = jobs.map((job, i) =>
      i === index ? { ...job, [field]: value } : job
    );
    setCV({ ...cv, experience: updatedExperience });
  };

  function isOpen(id) {
    return jobsDropdown.find((job) => job.id === id).isOpen;
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

  function saveJob(id) {
    const job = cv.experience.find((job) => job.id === id);

    if (!job.company) return;
    if (!job.role) return;
    if (!job.start) return;
    if (!job.location) return;

    const isSaved = {
      id: id,
    }
    setIsSaved([...jobsSaved, isSaved]);

    flipDropDownMenu(id);
    setDeleteBtn(false);
  }

  // A job counts as "active" if it's an unsaved job currently being filled in,
  // or a saved job whose dropdown is currently expanded. Only one of these
  // should ever block the rest of the UI at a time.
  const unsavedJob = jobs.find(
    (job) => !jobsSaved.some((saved) => saved.id === job.id)
  );
  const openSavedJob = jobsSaved.find((saved) => {
    const entry = jobsDropdown.find((j) => j.id === saved.id);
    return entry?.isOpen;
  });
  const activeJobId = unsavedJob ? unsavedJob.id : openSavedJob ? openSavedJob.id : null;

  const jobsList = jobs.map((job, index) =>
    <div className="job-form-container" key={job.id}>
      <div className="job-name-container">
        <div className="job-name">
          {job.company || `Job ${index + 1}`}
        </div>
        <div className="job-dropdown">
          <button
            type="button"
            onClick={() => flipDropDownMenu(job.id)}
            disabled={
              (activeJobId !== null && activeJobId !== job.id) ||
              (unsavedJob?.id === job.id)
            }
          >
            ↓
          </button>
        </div>
      </div>
      <div className={isOpen(job.id) ? "job-dropdown-container" : "job-dropdown-container hidden"}>
        <div className="form-row">
          <label htmlFor={`company-${index}`}>Company <span className="required">*</span></label>
          <input 
            type="text"
            id={`company-${index}`} 
            name="company"
            maxLength="64"
            value={job.company}
            onChange={(e) => updateJob(index, 'company', e.target.value)}
            required
          />
        </div>
        <div className="form-row" >
          <label htmlFor={`role-${index}`}>Role <span className="required">*</span></label>
          <input
            type="text"
            id={`role-${index}`}
            name="role"
            maxLength="64"
            value={job.role}
            onChange={(e) => updateJob(index, 'role', e.target.value)}
            required
          />
        </div>
        <div className="form-row" >
          <label htmlFor={`jobStart-${index}`}>Start Date <span className="required">*</span></label>
          <input
            type="month"
            id={`jobStart-${index}`}
            name="jobStart"
            pattern="\d{4}-\d{2}"
            placeholder="YYYY-MM"
            value={job.start}
            onChange={(e) => updateJob(index, 'start', e.target.value)}
            required
          />
        </div>
        <div className="form-row" >
          <label htmlFor={`jobEnd-${index}`}>End Date</label>
          <input
            type="month"
            id={`jobEnd-${index}`}
            name="jobEnd"
            pattern="\d{4}-\d{2}"
            placeholder="YYYY-MM"
            value={job.end}
            onChange={(e) => updateJob(index, 'end', e.target.value)}
          />
        </div>
        <div className="form-row" >
          <label htmlFor={`location-${index}`}>Location <span className="required">*</span></label>
          <input
            type="text"
            id={`location-${index}`}
            name="location"
            value={job.location} 
            onChange={(e) => updateJob(index, 'location', e.target.value)}
            required
          />
        </div>
        <div className="form-row" >
          <label htmlFor={`description-${index}`}>Description</label>
          <textarea
            id={`description-${index}`}
            name="description"
            maxLength="1000"
            value={job.description} 
            onChange={(e) => updateJob(index, 'description', e.target.value)}
          />
        </div>
        <div className="form-row">
          <button type="button" onClick={() => removeJob(index)} hidden={deleteBtn}>Delete</button>
          <button type="button" onClick={() => cancelJob(index, job.id)}>Cancel</button>
          <button type="button" onClick={() => saveJob(job.id)}>Save</button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="experience-container background-style">
        <div className="form-header">
            <h3>Experience</h3>
            <button type="button" onClick={addJob} disabled={activeJobId !== null}>Add</button>
        </div>
        {jobsList}
      </div>
    </>
  )
}

export default Experience
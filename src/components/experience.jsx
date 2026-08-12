import '../styles/form.css';

function Experience({ cv, setCV }) {
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

    const updatedJobs = [...cv.experience, job];

    setCV({ ...cv, experience: updatedJobs });
  }

  function removeJob(index) {
    const updatedJobs = [...cv.experience];
    updatedJobs.splice(index, 1);
    setCV({ ...cv, experience: updatedJobs });
  }

  const jobs = cv.experience;

  const updateJob = (index, field, value) => {
    const updatedExperience = jobs.map((job, i) =>
      i === index ? { ...job, [field]: value } : job
    );
    setCV({ ...cv, experience: updatedExperience });
  };

  const jobsList = jobs.map((job, index) =>
    <div className="job-form-container" key={job.ids}>
      <div className="form-row">
        <label htmlFor={`company-${index}`}>Company *</label>
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
        <label htmlFor={`role-${index}`}>Role *</label>
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
        <label htmlFor={`jobStart-${index}`}>Start Date *</label>
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
        <label htmlFor={`location-${index}`}>Location *</label>
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
          maxLength="500"
          value={job.description} 
          onChange={(e) => updateJob(index, 'description', e.target.value)}
        />
      </div>
      <button type="button" onClick={() => removeJob(index)}>Remove</button>
    </div>
  )

  return (
    <>
    <div className="experience-container background-style">
      <div className="form-header">
          <h2>Experience</h2>
          <button type="button" onClick={addJob}>Add</button>
      </div>
      {jobsList}
    </div>
    </>
  )
}

export default Experience
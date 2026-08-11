import '../styles/form.css';

function Experience({ cv, setCV }) {
  const jobs = cv.experience;
  const jobsList = jobs.map((job, index) =>
    <>
      <div className="job-form-container" key={index}>
        <div className="form-row">
          <label htmlFor={`company-${index}`}>Company</label>
          <input type="text" id={`company-${index}`} name="company" maxLength="64" value={job.company} onChange={(e) =>
            setCV({
              ...cv,
              experience: {
                ...cv.experience,
                job: {
                  ...cv.experience.job,
                  company: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`role-${index}`}>Role</label>
          <input type="text" id={`role-${index}`} name="role" maxLength="64" value={job.role} onChange={(e) =>
            setCV({
              ...cv,
              experience: {
                ...cv.experience,
                job: {
                  ...cv.experience.job,
                  role: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`jobStart-${index}`}>Start Date</label>
          <input type="date" id={`jobStart-${index}`} name="jobStart" value={job.start} onChange={(e) =>
            setCV({
              ...cv,
              experience: {
                ...cv.experience,
                job: {
                  ...cv.experience.job,
                  start: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`jobEnd-${index}`}>End Date</label>
          <input type="date" id={`jobEnd-${index}`} name="jobEnd" value={job.end} onChange={(e) =>
            setCV({
              ...cv,
              experience: {
                ...cv.experience,
                job: {
                  ...cv.experience.job,
                  end: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`location-${index}`}>Location</label>
          <input type="text" id={`location-${index}`} name="location" value={job.location} onChange={(e) =>
            setCV({
              ...cv,
              experience: {
                ...cv.experience,
                job: {
                  ...cv.experience.job,
                  location: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`description-${index}`}>Description</label>
          <textarea id={`description-${index}`} name="description" maxLength="500" value={job.description} onChange={(e) =>
            setCV({
              ...cv,
              experience: {
                ...cv.experience,
                job: {
                  ...cv.experience.job,
                  description: e.target.value
                }
              }
            })
          }/>
        </div>
      </div>
    </>
    )

  return (
    <>
    <div className="form-header">
        <h2>Experience</h2>
    </div>
    {jobsList}
    </>
  )
}

export default Experience
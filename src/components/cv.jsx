// import { useState, useRef } from 'react';
import '../styles/cv.css';

function CV({ cv }) {
  const jobs = cv.experience;
  const jobsList = jobs.map((job) =>
    <>
      <div className="job-container">
        <div className="job-date-container">
          <div>{job.start} - {job.end || 'Present'}</div>
          <div>{job.location}</div>
        </div>
        <div className="job-details-container">
          <div>{job.company}</div>
          <div>{job.role}</div>
          <div>{job.description}</div>
        </div>
      </div>
    </>
  )

  const schools = cv.education;
  const schoolList = schools.map((school) =>
    <>
      <div className="school-container">
        <div className="school-date-container">
          <div>{school.start} - {school.end || 'Present'}</div>
          <div>{school.location}</div>
        </div>
        <div className="school-details-container">
          <div>{school.name}</div>
          <div>{school.qualification}</div>
        </div>
      </div>
    </>
  )
  
  const hasJobs = jobsList.length > 0;
  const hasSchools = schoolList.length > 0;

  return (
    <>
      <div className="personal-info-container">
        <div>
          <h2>{cv.name}</h2>
        </div>
        <div className="contact-info-container">
          <div>{cv.email}</div>
          <div>{cv.phone}</div>
          <div>{cv.location}</div>
        </div>
      </div>
      {hasJobs 
      ? <div className="experience-container">
          <h2>Experience</h2>
          {jobsList}
        </div> 
      : null}
      {hasSchools 
      ? <div className="education-container">
          <h2>Education</h2>
          {schoolList}
        </div>
        : null}
    </>
  )
}

export default CV
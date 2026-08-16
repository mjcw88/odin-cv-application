// import { useState, useRef } from 'react';
import '../styles/cv.css';

function CV({ cv }) {
  const EMAIL = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  const PHONE = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.3308 15.9402L15.6608 14.6101C15.8655 14.403 16.1092 14.2384 16.3778 14.1262C16.6465 14.014 16.9347 13.9563 17.2258 13.9563C17.517 13.9563 17.8052 14.014 18.0739 14.1262C18.3425 14.2384 18.5862 14.403 18.7908 14.6101L20.3508 16.1702C20.5579 16.3748 20.7224 16.6183 20.8346 16.887C20.9468 17.1556 21.0046 17.444 21.0046 17.7351C21.0046 18.0263 20.9468 18.3146 20.8346 18.5833C20.7224 18.8519 20.5579 19.0954 20.3508 19.3L19.6408 20.02C19.1516 20.514 18.5189 20.841 17.8329 20.9541C17.1469 21.0672 16.4427 20.9609 15.8208 20.6501C10.4691 17.8952 6.11008 13.5396 3.35083 8.19019C3.03976 7.56761 2.93414 6.86242 3.04914 6.17603C3.16414 5.48963 3.49384 4.85731 3.99085 4.37012L4.70081 3.65015C5.11674 3.23673 5.67937 3.00464 6.26581 3.00464C6.85225 3.00464 7.41488 3.23673 7.83081 3.65015L9.40082 5.22021C9.81424 5.63615 10.0463 6.19871 10.0463 6.78516C10.0463 7.3716 9.81424 7.93416 9.40082 8.3501L8.0708 9.68018C8.95021 10.8697 9.91617 11.9926 10.9608 13.04C11.9994 14.0804 13.116 15.04 14.3008 15.9102L14.3308 15.9402Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  const LOCATION = <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

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
        {(cv.email || cv.phone || cv.location) && (
          <div className="contact-info-container">
            {cv.email && <div>{EMAIL} {cv.email}</div>}
            {cv.phone && <div>{PHONE} {cv.phone}</div>}
            {cv.location && <div>{LOCATION} {cv.location}</div>}
          </div>
        )}
      </div>
      {hasJobs 
      ? <div className="experience-container">
          <h3>Experience</h3>
          {jobsList}
        </div> 
      : null}
      {hasSchools 
      ? <div className="education-container">
          <h3>Education</h3>
          {schoolList}
        </div>
        : null}
    </>
  )
}

export default CV
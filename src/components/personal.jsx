// import { useState, useRef } from 'react';
import '../styles/form.css';

function Personal({ cv, setCV }) {
  return (
    <>
      <div className="personal-details-container">
        <div className="form-header">
          <h2>Personal Details</h2>
        </div>
        <div className="form-row">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            maxLength="64"
            value={cv.name}
            onChange={(e) => setCV({ ...cv, name: e.target.value })}
            required/>
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={cv.email}
            onChange={(e) => setCV({ ...cv, email: e.target.value })}/>
        </div>
        <div className="form-row">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            maxLength="24"
            value={cv.phone}
            onChange={(e) => setCV({ ...cv, phone: e.target.value })}/>
        </div>
          <div className="form-row">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            maxLength="64"
            value={cv.location}
            onChange={(e) => setCV({ ...cv, location: e.target.value })}/>
        </div>
      </div>
    </>
  )
}

export default Personal
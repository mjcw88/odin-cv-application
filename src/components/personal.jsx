import { useState } from 'react';
import '../styles/form.css';

function Personal({ cv, setCV, errors }) {
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
  const [warnings, setWarnings] = useState({});
  const [touched, setTouched] = useState({});

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function setFieldWarning(field, value) {
    setWarnings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function isInputValid(field, value) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "name") {
      setFieldWarning("name", !value);
    } else if (field === "email") {
      setFieldWarning("email", value.trim() !== "" && !isValidEmail(value.trim()));
    }
  }
    
  function invalidClass(input) {
    return input === true ? "invalid" : "";
  }

  return (
    <div className="personal-details-container background-style">
      <div className="form-header">
        <span className="required-container"><b>*</b> = required</span>
      </div>
      <div className="form-header">
        <h2>Personal Details</h2>
      </div>
      <div className="form-row">
        <label htmlFor="name">Full Name <span className="required">*</span></label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Joe Bloggs"
          maxLength="64"
          value={cv.name}
          aria-required="true"
          onChange={(e) => {
            setCV({ ...cv, name: e.target.value })
            isInputValid("name", e.target.value);
            }}
          className={invalidClass(touched.name ? warnings.name : errors?.name)}
        />
        {(touched.name ? warnings.name : errors?.name) && (
          <div className="required-warning">{ALERT_SVG} Name is required.</div>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email@email.com"
          value={cv.email}
          onChange={(e) => {
            setCV({ ...cv, email: e.target.value })
            isInputValid("email", e.target.value);
            }}
          className={invalidClass(warnings?.email || errors?.email)}
        />
        {(warnings?.email || errors?.email) && (
          <div className="required-warning">{ALERT_SVG} Email is invalid.</div>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="07123456789"
          maxLength="24"
          value={cv.phone}
          onChange={(e) => setCV({ ...cv, phone: e.target.value })}
        />
      </div>
        <div className="form-row">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="London"
          maxLength="64"
          value={cv.location}
          onChange={(e) => setCV({ ...cv, location: e.target.value })}
        />
      </div>
    </div>
  )
}

export default Personal
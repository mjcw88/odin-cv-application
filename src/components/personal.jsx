import { useState } from 'react';
import '../styles/form.css';

function Personal({ cv, setCV, errors }) {
  const [warnings, setWarnings] = useState({});

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
    if (field === "name") {
      setFieldWarning("name", !value);
    } else if (field === "email") {
      setFieldWarning("email", !isValidEmail(value));
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
          onChange={(e) => {
            setCV({ ...cv, name: e.target.value })
            isInputValid("name", e.target.value);
            }}
          className={invalidClass(warnings?.name || errors?.name)}
        />
        {(warnings?.name || errors?.name) && (
          <div className="required-warning">Name is required.</div>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          type="text"
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
          <div className="required-warning">Email is invalid.</div>
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
import { useState, useRef } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [cv, setCV] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })

  const [showEditBtn, setEditBtn] = useState(false)
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const locationInputRef = useRef(null)

  function submitCV(event) {
    event.preventDefault()
    setCV({
      name: event.currentTarget.elements.name.value,
      email: event.currentTarget.elements.email.value,
      phone: event.currentTarget.elements.phone.value,
      location: event.currentTarget.elements.location.value,
    })
    event.currentTarget.reset()
    setEditBtn(true);
  }

  function editForm() {
    nameInputRef.current.value = cv.name ?? ""
    emailInputRef.current.value = cv.email ?? ""
    phoneInputRef.current.value = cv.phone ?? ""
    locationInputRef.current.value = cv.location ?? ""
  }

  return (
    <>
      <div className="cv-form-container">
        <form onSubmit={submitCV}>
          <div className="form-row">
            <label htmlFor="name">Full Name *</label>
            <input type="text" id="name" name="name" ref={nameInputRef} maxlength="64" required/>
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" ref={emailInputRef}/>
          </div>
          <div className="form-row">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" maxlength="24" ref={phoneInputRef}/>
          </div>
            <div className="form-row">
            <label htmlFor="Location">Location</label>
            <input type="text" id="location" name="location" maxlength="64" ref={locationInputRef}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="cv-container">
        <div className="edit-btn-container" style={{ display: showEditBtn ? "block" : "none" }}>
          <button onClick={editForm} >Edit</button>
        </div>
        <h1>Curriculum Vitae</h1>
        <div className="cv-name">{cv.name}</div>
        <div className="cv-email">{cv.email}</div>
        <div className="cv-phone">{cv.phone}</div>
        <div className="cv-location">{cv.location}</div>
      </div>
    </>
  )
}

export default App

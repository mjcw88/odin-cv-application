// import { useState, useRef } from 'react';
import '../styles/cv.css';

function CV({ cv }) {
  return (
    <>
      <h1>Curriculum Vitae</h1>
      <div className="cv-name">{cv.name}</div>
      <div className="cv-email">{cv.email}</div>
      <div className="cv-phone">{cv.phone}</div>
      <div className="cv-location">{cv.location}</div>
    </>
  )
}

export default CV
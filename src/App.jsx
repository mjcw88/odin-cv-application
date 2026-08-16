// App.jsx
import { useState } from "react";
import Personal from "./components/personal.jsx";
import Experience from "./components/experience.jsx";
import Education from "./components/education.jsx";
import CV from "./components/cv.jsx";

function App() {
const blankCV = {
  name: "",
  email: "",
  phone: "",
  location: "",
  experience: [],
  education: [],
};

  const [cv, setCV] = useState(blankCV);
  const [draft, setDraft] = useState(structuredClone(cv));
  const [editBtn, setDisabledEditBtn] = useState(true);
  const [errors, setErrors] = useState({});
  const [experienceActive, setExperienceActive] = useState(null);
  const [educationActive, setEducationActive] = useState(null);

  const submitBtn = experienceActive !== null || educationActive !== null;

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateCV(data) {
    const warnings = {};

    if (!data.name.trim()) {
      warnings.name = true;
    }

    if (data.email.trim() && !isValidEmail(data.email.trim())) {
      warnings.email = true
    }

    return warnings;
  }

  function submitCV(event) {
    event.preventDefault();

    const validationErrors = validateCV(draft);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setCV(draft);
    setDraft(structuredClone(blankCV));
    setDisabledEditBtn(false);
  }

  function editForm() {
    setDraft(structuredClone(cv));
    setDisabledEditBtn(true);
  }

  return (
    <>
      <div className="header-container">
        <h1>Curriculum Vitae</h1>
      </div>
      <div className="form-cv-container">
        <div className="edit-btn-container background-style">
          <button onClick={editForm} disabled={editBtn}>Edit</button>
        </div>
        <div className="form-container">
          <form onSubmit={submitCV}>
            <Personal cv={draft} setCV={setDraft} errors={errors}/>
            <Experience cv={draft} setCV={setDraft} setSubmitBtn={setExperienceActive} />
            <Education cv={draft} setCV={setDraft} setSubmitBtn={setEducationActive} />
            <div className="submit-btn-container background-style">
              <button type="submit" disabled={submitBtn}>Submit</button>
            </div>
          </form>
        </div>
        <div className="cv-container">
          <CV cv={cv} />
        </div>
      </div>
    </>
  );
}

export default App;
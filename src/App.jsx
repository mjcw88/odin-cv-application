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

  function submitCV(event) {
    event.preventDefault();
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
      <div className="header-container background-style">
        <h1>Curriculum Vitae</h1>
      </div>
      <div className="form-cv-container">
        <div className="edit-btn-container background-style">
          <button onClick={editForm} disabled={editBtn}>Edit</button>
        </div>
        <div className="form-container">
          <form onSubmit={submitCV}>
            <Personal cv={draft} setCV={setDraft} />
            <Experience cv={draft} setCV={setDraft} />
            <Education cv={draft} setCV={setDraft} />
            <div className="submit-btn-container background-style">
              <button type="submit">Submit</button>
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
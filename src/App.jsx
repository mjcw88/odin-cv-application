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
  experience: [
    {
      company: "",
      role: "",
      start: "",
      end: "",
      location: "",
      description: "",
    }
  ],
  education: [
    {
      name: "",
      qualification: "",
      start: "",
      end: "",
      location: "",
    }
  ]
};
  
  // const [showEditBtn, setEditBtn] = useState(false)

  const [cv, setCV] = useState(blankCV);
  const [draft, setDraft] = useState(cv);

  function submitCV(event) {
    event.preventDefault();
    setCV(draft);
    // setEditBtn(true);
    setDraft(blankCV);
  }

  function editForm() {
    setDraft(cv);
  }

  return (
    <>
      <div className="header-container">
        <h1>Curriculum Vitae</h1>
      </div>
      <div className="form-cv-container">
        <div className="edit-btn-container">
          <button onClick={editForm}>Edit</button>
        </div>
        <div className="form-container">
          <form onSubmit={submitCV}>
            <Personal cv={draft} setCV={setDraft} />
            <Experience cv={draft} setCV={setDraft} />
            <Education cv={draft} setCV={setDraft} />
            <button type="submit">Submit</button>
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
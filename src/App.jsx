// App.jsx
import { useState } from "react";
import Personal from "./components/personal.jsx";
import Experience from "./components/experience.jsx";
import Education from "./components/education.jsx";
import CV from "./components/cv.jsx";

function App() {
  const blankCV = { name: "", email: "", phone: "", location: "" };
  const [showEditBtn, setEditBtn] = useState(false)

  const [cv, setCV] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [draft, setDraft] = useState(cv);

  function submitCV(event) {
    event.preventDefault();
    setCV(draft);
    setEditBtn(true);
    setDraft(blankCV);
  }

  function editForm() {
    setDraft(cv);
  }

  return (
    <>
      <div className="cv-form-container">
        <form onSubmit={submitCV}>
          <Personal cv={draft} setCV={setDraft} />
          <Experience />
          <Education />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="cv-container">
        <div className="edit-btn-container" style={{ display: showEditBtn ? "block" : "none" }}>
          <button onClick={editForm}>Edit</button>
        </div>
        <CV cv={cv} />
      </div>
      
    </>
  );
}

export default App;
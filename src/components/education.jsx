import '../styles/form.css';

function Education({ cv, setCV }) {
  function addSchool() {
    const school = {
      id: crypto.randomUUID(),
      name: "",
      qualification: "",
      start: "",
      end: "",
      location: "",
    };

    const updatedSchools = [...cv.education, school];

    setCV({ ...cv, education: updatedSchools });
  }

  function removeSchool(index) {
    const updatedSchools = [...cv.education];
    updatedSchools.splice(index, 1);
    setCV({ ...cv, education: updatedSchools });
  }

  const schools = cv.education;

  const updateSchool = (index, field, value) => {
    const updatedEducation = schools.map((school, i) =>
      i === index ? { ...school, [field]: value } : school
    );
    setCV({ ...cv, education: updatedEducation });
  };

  const schoolList = schools.map((school, index) =>
    <div className="school-form-container" key={school.id}>
      <div className="form-row">
        <label htmlFor={`school-${index}`}>School *</label>
        <input
          type="text"
          id={`school-${index}`}
          name="school"
          maxLength="64"
          value={school.name}
          onChange={(e) => updateSchool(index, 'name', e.target.value)}
          required/>
      </div>
      <div className="form-row" >
        <label htmlFor={`role-${index}`}>Qualification *</label>
        <input
          type="text"
          id={`qualification-${index}`}
          name="role"
          maxLength="64"
          value={school.qualification}
          onChange={(e) => updateSchool(index, 'qualification', e.target.value)}
          required/>
      </div>
      <div className="form-row" >
        <label htmlFor={`schoolStart-${index}`}>Start Date *</label>
        <input
          type="month"
          id={`schoolStart-${index}`}
          name="schoolStart"
          pattern="\d{4}-\d{2}"
          placeholder="YYYY-MM"
          value={school.start}
          onChange={(e) => updateSchool(index, 'start', e.target.value)}
          required/>
      </div>
      <div className="form-row" >
        <label htmlFor={`schoolEnd-${index}`}>End Date</label>
        <input
          type="month"
          id={`schoolEnd-${index}`}
          name="schoolEnd"
          pattern="\d{4}-\d{2}"
          placeholder="YYYY-MM"
          value={school.end}
          onChange={(e) => updateSchool(index, 'end', e.target.value)}/>
      </div>
      <div className="form-row" >
        <label htmlFor={`schoolLocation-${index}`}>Location *</label>
        <input
          type="text"
          id={`schoolLocation-${index}`}
          name="schoolLocation" value={school.location}
          onChange={(e) => updateSchool(index, 'location', e.target.value)}
          required/>
      </div>
      <button type="button" onClick={() => removeSchool(index)}>Remove</button>
    </div>
  )

  return (
    <>
    <div className="education-container">
      <div className="form-header">
          <h2>Education</h2>
          <button type="button" onClick={addSchool}>Add</button>
      </div>
      {schoolList}
    </div>
    </>
  )
}

export default Education
import '../styles/form.css';

function Education({ cv, setCV }) {
  const schools = cv.education;
  const schoolList = schools.map((school, index) =>
    <>
      <div className="school-form-container" key={index}>
        <div className="form-row">
          <label htmlFor={`school-${index}`}>School</label>
          <input type="text" id={`school-${index}`} name="school" maxLength="64" value={school.name} onChange={(e) =>
            setCV({
              ...cv,
              education: {
                ...cv.education,
                school: {
                  ...cv.education.school,
                  name: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`role-${index}`}>Qualification</label>
          <input type="text" id={`qualification-${index}`} name="role" maxLength="64" value={school.qualification} onChange={(e) =>
            setCV({
              ...cv,
              education: {
                ...cv.education,
                school: {
                  ...cv.education.school,
                  qualification: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`schoolStart-${index}`}>Start Date</label>
          <input type="date" id={`schoolStart-${index}`} name="schoolStart" value={school.start} onChange={(e) =>
            setCV({
              ...cv,
              education: {
                ...cv.education,
                school: {
                  ...cv.education.school,
                  start: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`schoolEnd-${index}`}>End Date</label>
          <input type="date" id={`schoolEnd-${index}`} name="schoolEnd" value={school.end} onChange={(e) =>
            setCV({
              ...cv,
              education: {
                ...cv.education,
                school: {
                  ...cv.education.school,
                  end: e.target.value
                }
              }
            })
          }/>
        </div>
        <div className="form-row" >
          <label htmlFor={`schoolLocation-${index}`}>Location</label>
          <input type="text" id={`schoolLocation-${index}`} name="schoolLocation" value={school.location} onChange={(e) =>
            setCV({
              ...cv,
              education: {
                ...cv.education,
                school: {
                  ...cv.education.school,
                  location: e.target.value
                }
              }
            })
          }/>
        </div>
      </div>
    </>
    )

  return (
    <>
    <div className="form-header">
        <h2>Education</h2>
    </div>
    {schoolList}
    </>
  )
}

export default Education
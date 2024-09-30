import React, { useState } from 'react';
import '../css/ApplicationComponent.css'; // Import the CSS file
import { saveApplicationCall } from '../AuthService';

const ApplicationComponent = () => {
  const [studentName, setStudentName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [universityCourse, setCourseName] = useState('');
  const [error, setError] = useState(null); // State to hold error messages
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      studentName,
      universityName,
      universityCourse,
    };
    try {
      const response = await saveApplicationCall(applicationData);
      // Handle successful response
      setSuccessMessage(response.message || 'Application submitted successfully!');
      setError(null); // Clear any previous error messages
    } catch (error) {
      // Handle error
      setError(error.message || 'Failed to submit application');
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div className="application-container">
      <h2 className="application-title">Application Form</h2>
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Success message */}
      {error && <div className="error-message">{error}</div>} {/* Error message */}
      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label>Student Name:</label>
          <input 
            type="text" 
            value={studentName} 
            onChange={(e) => setStudentName(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>University Name:</label>
          <input 
            type="text" 
            value={universityName} 
            onChange={(e) => setUniversityName(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Course Name:</label>
          <input 
            type="text" 
            value={universityCourse} 
            onChange={(e) => setCourseName(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationComponent;

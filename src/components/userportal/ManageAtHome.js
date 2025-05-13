import React, { useState } from 'react';
// import './userportalcss/manageathome.css';

const ManageAtHome = ({ closeModal }) => {
  const [instructions, setInstructions] = useState({
    rest: false,
    monitor: false,
    contactDoctor: false,
    oximeter: false,
  });

  const [feeling, setFeeling] = useState('');
  const [symptoms, setSymptoms] = useState({
    fever: false,
    breathing: false,
    smell: false,
  });

  const [otherIssue, setOtherIssue] = useState('');

  const handleInstructionChange = (e) => {
    setInstructions({
      ...instructions,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSymptomChange = (e) => {
    setSymptoms({
      ...symptoms,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = () => {
    const data = {
      instructions,
      feeling,
      symptoms: feeling === 'bad' ? symptoms : {},
      otherIssue,
    };
    console.log('Submitted data:', data);
    alert("Your response has been submitted. Thank you!");
    closeModal();
  };

  return (
    <div className="manage-at-home-modal">
      <div className="manage-at-home-container">
        <h2 className="manage-heading">🩺 Daily Home Health Check</h2>

        <div className="manage-section">
          <p className="font-semibold text-gray-700 mb-3">✅ Have you followed today's self-care instructions?</p>
          {[
            { name: 'rest', label: 'Stay hydrated and take rest.' },
            { name: 'monitor', label: 'Monitor your symptoms regularly.' },
            { name: 'contactDoctor', label: 'Contact your doctor if symptoms worsen.' },
            { name: 'oximeter', label: 'Use a pulse oximeter to monitor oxygen levels.' },
          ].map(item => (
            <label className="manage-label" key={item.name}>
              <input
                type="checkbox"
                name={item.name}
                checked={instructions[item.name]}
                onChange={handleInstructionChange}
                className="mr-2 accent-blue-600"
              />
              {item.label}
            </label>
          ))}
        </div>

        <div className="manage-section">
          <p className="font-semibold text-gray-700 mb-3">🩹 After following instructions, how do you feel?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setFeeling('bad')}
              className={`manage-button ${
                feeling === 'bad' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600'
              }`}
            >
              😷 Feel Bad
            </button>
            <button
              onClick={() => setFeeling('ok')}
              className={`manage-button ${
                feeling === 'ok' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
              }`}
            >
              🙂 Feeling Okay
            </button>
          </div>
        </div>

        {feeling === 'bad' && (
          <>
            <div className="manage-section">
              <p className="font-semibold text-gray-700 mb-3">⚠️ What symptoms are you experiencing?</p>
              {[
                { name: 'fever', label: 'Fever' },
                { name: 'breathing', label: 'Breathing issues' },
                { name: 'smell', label: 'Loss of smell or taste' },
              ].map(item => (
                <label className="manage-label hover:text-red-600" key={item.name}>
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={symptoms[item.name]}
                    onChange={handleSymptomChange}
                    className="mr-2 accent-red-500"
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <div className="manage-section">
              <label className="block font-semibold mb-2 text-gray-700">
                📝 Any other issues you’d like to report?
              </label>
              <textarea
                rows="3"
                className="manage-textarea"
                value={otherIssue}
                onChange={(e) => setOtherIssue(e.target.value)}
                placeholder="Write here..."
              />
            </div>
          </>
        )}

        <div className="manage-actions">
          <button onClick={closeModal} className="manage-cancel">
            Cancel
          </button>
          <button onClick={handleSubmit} className="manage-submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAtHome;

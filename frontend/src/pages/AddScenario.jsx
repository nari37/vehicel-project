
import React, { useState } from 'react';
import '../css/AddSenarios.css';
import { useNavigate } from 'react-router-dom';
import  serverconfig from '../config/index.js';
export default function AddScenario({setActiveLink}) {
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioTime, setScenarioTime] = useState('');
  const [error, setError] = useState('');
   const nav = useNavigate();
  const handleAdd = () => {
    if (!scenarioName || !scenarioTime) {
      setError('Scenario name and time are required');
      return;
    }

    const scenarioData = {
      name: scenarioName,
      time: scenarioTime
    };



    

    fetch(`${serverconfig()}/api/scenarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scenarioData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add scenario');
        }
        return response.json();
      })
      .then(data => {
        // Handle success response from the server
        alert('Scenario added successfully');
        // Clear input fields and error state
        setScenarioName('');
        setScenarioTime('');
        setError('');
      })
      .catch(error => {
        console.error('Error adding scenario:', error);
        setError('Failed to add scenario');
      });
  };

  const handleReset = () => {
    setScenarioName('');
    setScenarioTime('');
    setError('');
  };



  const handleGoBack = () => {
    // Logic to go back
    nav('/')

  };

  return (
    <div className="add-scenario">
        <p>Scenario/add</p>
      <h2>Add Scenario</h2>
      <div className="form-content">
        <div className="form-group">
          <label>Scenario Name</label>
          <input
            type="text"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            className={error ? 'input-error' : ''}
          />
        </div>
        <div className="form-group">
          <label>Scenario Time (seconds)</label>
          <input
            type="text"
            value={scenarioTime}
            onChange={(e) => setScenarioTime(e.target.value)}
            className={error ? 'input-error' : ''}
          />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="button-group">
        <button className="btn add" onClick={handleAdd}>Add</button>
        <button className="btn reset" onClick={handleReset}>Reset</button>
        <button className="btn go-back" onClick={()=>setActiveLink('home')}>Go Home</button>
      </div>
    </div>
  );
}

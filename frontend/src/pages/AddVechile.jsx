


import React, { useState, useEffect } from 'react';
import '../css/Addvechicle.css';


export default function AddVehicle({setActiveLink}) {
  const [name, setVehicleName] = useState('');
  const [initialPositionX, setPositionX] = useState('');
  const [initialPositionY, setPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [scenario, setScenario] = useState('');
  const [scenarios, setScenarios] = useState([]);
  const [error, setError] = useState('');




  useEffect(() => {
    // Fetch scenario names from the JSON server
    fetch('http://localhost:5000/api/scenariosnames')
      .then(response => response.json())
      .then(data => {  
        setScenarios(data);
      })
      .catch(error => console.error('Error fetching scenarios:', error));
  }, []);

  const handleSubmit = (event) => {

    event.preventDefault();

    // Check if any field is empty...
    if (!name || !initialPositionX || !initialPositionY || !speed || !direction || !scenario) {
      alert('Please fill all fields');
      return;
    }
   
    if (initialPositionX > 0 || initialPositionX < 800) {
      setError('Position X must be between 0 and 800.');
      return;
    }
    
    setError('');

    //data to send to the server
    const formData = {
      name,
      initialPositionX,
      initialPositionY,
      speed,
      direction,
      scenario,
    };

    // POST request to the server
    fetch('http://localhost:5000/api/vehiclespost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Vehicle added successfully:', data);
        alert('Vehicle added successfully')        
        handleReset();
      })
      .catch(error => {
        console.error('Error adding vehicle:', error);      
      });
  };

  const handleReset = () => {
    setVehicleName('');
    setPositionX('');
    setPositionY('');
    setSpeed('');
    setDirection('');
    setScenario('');
    setError('');
  };


  return (
    <div className="AddVehicle">
      <p>Vehicle/add</p>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <label>
            Scenario:
            <select value={scenario} onChange={(event) => setScenario(event.target.value)}>
              <option value="">Select a scenario</option>
              {scenarios.map(scenario => (
                <option key={scenario.id} value={scenario.name}>{scenario.name}</option>
              ))}
            </select>
          </label>
          <label>
            Vehicle Name:
            <input
              type="text"
              value={name}
              onChange={(event) => setVehicleName(event.target.value)}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Position X:
            <input
              type="number"
              value={initialPositionX}
              onChange={(event) => setPositionX(event.target.value)}
            />
          </label>
          <label>
            Position Y:
            <input
              type="number"
              value={initialPositionY}
              onChange={(event) => setPositionY(event.target.value)}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Speed:
            <input
              type="number"
              value={speed}
              onChange={(event) => setSpeed(event.target.value)}
            />
          </label>
          <label>
            Direction:
            <select value={direction} onChange={(event) => setDirection(event.target.value)}>
              <option value="">Select a direction</option>
              <option value="Towards">Towards</option>
              <option value="Backwards">Backwards</option>
              <option value="Upwards">Upwards</option>
              <option value="Downwards">Downwards</option>
            </select>
          </label>
        </div>
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <div className="button-container">
          <button type="submit" id="add">Add</button>
          <button type="button" id="reset" onClick={handleReset}>Reset</button>
          <button type="button" id="back" onClick={()=>setActiveLink('home')}>Go Home</button>
        </div>
      </form>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import '../css/AllScenarios.css';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaCirclePlus } from "react-icons/fa6";

export default function AllScenarios({ setActiveLink }) {
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedScenario, setEditedScenario] = useState({ id: '', name: '', time: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/scenariosnames')
      .then(response => response.json())
      .then(data => setScenarios(data))
      .catch(error => console.error('Error fetching scenarios:', error));

    fetch('http://localhost:5000/api/vehicle-names')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  useEffect(() => {
    if (scenarios.length > 0 && vehicles.length > 0) {
      const scenarioMap = scenarios.reduce((map, scenario) => {
        map[scenario.name] = scenario.id;
        return map;
      }, {});

      const combined = vehicles.map(vehicle => ({
        id: vehicle.id,
        scenarioId: scenarioMap[vehicle.scenario],
        name: vehicle.name
      }));

      setCombinedData(combined);
    }
  }, [scenarios, vehicles]);

  const handleEdit = (scenario) => {
    setEditMode(scenario.id);
    setEditedScenario(scenario);
  };

  const handleSave = () => {
    const editedScenarioId = editedScenario.id;
    fetch(`http://localhost:5000/api/update-scenarios/${editedScenarioId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedScenario),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update scenario');
        }
        return response.json();
      })
      .then(data => {
        const updatedScenarios = scenarios.map(scenario => {
          if (scenario.id === editedScenario.id) {
            return editedScenario;
          }
          return scenario;
        });
        setScenarios(updatedScenarios);
        setEditMode(null);
      })
      .catch(error => console.error('Error updating scenario:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedScenario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this scenario?');
    if (!isConfirmed) return;

    const updatedScenarios = scenarios.filter(scenario => scenario.id !== id);
    setScenarios(updatedScenarios);

    fetch(`http://localhost:5000/api/scenariosDelete/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete scenario');
        }
        return response.json();
      })
      .then(data => console.log('Deleted successfully:', data))
      .catch(error => console.error('Error deleting scenario:', error));
  };

  return (
    <div className='AllScenarios'>
      <div className="button-container">
        <div>
          <h2>All Scenarios</h2>
        </div>
        <div>
          <button className="btn new-scenario" onClick={() => setActiveLink('Add Scenario')}>New Scenario</button>
          <button className="btn add-vehicle" onClick={() => setActiveLink('Addvechile')}>Add Vehicle</button>
          <button className="btn delete-all">Delete All</button>
        </div>
      </div>
      <table className="scenario-table">
        <thead>
          <tr>
            <th>Scenario Id</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Number of Vehicles</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.id}>
              <td>{scenario.id}</td>
              <td>
                {editMode === scenario.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedScenario.name}
                    onChange={handleChange}
                  />
                ) : (
                  scenario.name
                )}
              </td>
              <td>
                {editMode === scenario.id ? (
                  <input
                    type="text"
                    name="time"
                    value={editedScenario.time}
                    onChange={handleChange}
                  />
                ) : (
                  scenario.time
                )}
              </td>
              <td>{combinedData.filter(vehicle => vehicle.scenarioId === scenario.id).length}</td>
              <td><FaCirclePlus className="icon" onClick={() => setActiveLink('Addvechile')} /></td>
              <td>
                {editMode === scenario.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <MdModeEditOutline className="icon" onClick={() => handleEdit(scenario)} />
                )}
              </td>
              <td>
                <RiDeleteBin5Fill className="icon" onClick={() => handleDelete(scenario.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

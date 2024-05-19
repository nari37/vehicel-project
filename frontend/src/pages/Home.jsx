
// import React, { useState, useEffect } from 'react';
// import '../css/Home.css'; 
// import { MdModeEditOutline } from "react-icons/md";
// import { RiDeleteBin5Fill } from "react-icons/ri";

// export default function Home() {
//   const [vehicleData, setVehicleData] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [scenarios, setScenarios] = useState([]);
//   const [selectedScenario, setSelectedScenario] = useState(null);
//   const [simulationStarted, setSimulationStarted] = useState(false);
//   const [simulationInterval, setSimulationInterval] = useState(null);

//   useEffect(() => {
//     // Fetch scenario names from the JSON server
//     fetch('http://localhost:5000/api/scenariosnames')
//       .then(response => response.json())
//       .then(data => {
//         setScenarios(data);
//       })
//       .catch(error => console.error('Error fetching scenarios:', error));
//   }, []);

//   useEffect(() => {
//     // Fetch vehicle data on component mount
//     fetch('http://localhost:5000/api/vehicle-names')
//       .then(response => response.json())
//       .then(data => setVehicleData(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleEditClick = (id) => {
//     setEditingId(id);
//     const rowData = vehicleData.find(vehicle => vehicle.id === id);
//     setEditedData(rowData);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };


//   const handleSaveClick = () => {
//     const index = vehicleData.findIndex(vehicle => vehicle.id === editingId);
//     const updatedData = [...vehicleData];
//     // Update only the specific fields that were edited
//     updatedData[index] = {
//       ...updatedData[index],
//       name: editedData.name,
//       initialPositionX: editedData.initialPositionX,
//       initialPositionY: editedData.initialPositionY,
//       speed: editedData.speed,
//       direction: editedData.direction
//     };
//     setVehicleData(updatedData);
    
//     // Capture the ID before setting it to null
//     const idToUpdate = editingId;
//     setEditingId(null); // Set editingId to null after updating
  
//     // Make a PUT request to update the data on the server
//     fetch(`http://localhost:5000/api/update-vehicle-data/${idToUpdate}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(updatedData[index])
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => console.log('Data updated:', data))
//     .catch(error => console.error('Error updating data:', error));
//   };
  


//   const startSimulation = () => {
//     if (!selectedScenario) return;
//     setSimulationStarted(true);
//     const interval = setInterval(moveVehicles, selectedScenario.time * 1000);
//     setSimulationInterval(interval);
//   };

//   const stopSimulation = () => {
//     setSimulationStarted(false);
//     clearInterval(simulationInterval);
//     resetVehiclePositions(); // Reset vehicle positions when simulation stops
//   };

//   const resetVehiclePositions = () => {
//     // Reset vehicle positions to initial positions
//     const updatedData = vehicleData.map(vehicle => ({
//       ...vehicle,
//       initialPositionX: vehicle.initialPositionX,
//       initialPositionY: vehicle.initialPositionY,
//       visible: true // Ensure all vehicles are visible after reset
//     }));
//     setVehicleData(updatedData);
//   };

//   const moveVehicles = () => {
//     const updatedData = vehicleData.map(vehicle => {
//       let newPositionX = vehicle.initialPositionX;
//       let newPositionY = vehicle.initialPositionY;
//       switch (vehicle.direction) {
//         case 'Towards':
//           newPositionX += vehicle.speed;
//           break;
//         case 'Backwards':
//           newPositionX -= vehicle.speed;
//           break;
//         case 'Upwards':
//           newPositionY += vehicle.speed;
//           break;
//         case 'Downwards':
//           newPositionY -= vehicle.speed;
//           break;
//         default:
//           break;
//       }
//       // Validate new position to prevent vehicles from going outside the container
//       newPositionX = Math.min(Math.max(newPositionX, 0), 800);
//       newPositionY = Math.min(Math.max(newPositionY, 0), 800);
//       return { ...vehicle, initialPositionX: newPositionX, initialPositionY: newPositionY };
//     });
//     setVehicleData(updatedData);
//     // Check if simulation time exceeds scenario time and stop simulation if necessary
//   if (simulationStarted && updatedData.length > 0 && updatedData.every(vehicle => vehicle.initialPositionX !== vehicleData[0].initialPositionX || vehicle.initialPositionY !== vehicleData[0].initialPositionY)) {
//     stopSimulation();
//   }
//   };

 
//   const deleteVehicle = (id) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this vehicle?");
//     if (isConfirmed) {
//       const updatedData = vehicleData.filter(vehicle => vehicle.id !== id);
//       setVehicleData(updatedData);
//       deleteVehicleFromJson(id); 
//     }
//   };
  
//   //  delete function....
//   const deleteVehicleFromJson = (id) => {
//     // Send a request to server to delete vehicle from JSON file
//     fetch(`http://localhost:5000/api/delete-vehicle/${id}`, {
//       method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Vehicle deleted:', data)
      
//     })
//     .catch(error => console.error('Error deleting vehicle:', error));
//   };

//   return (
//     <div className="content">
//       <div className="scenario-container">
//         <h2>Scenario</h2>
//         <select value={selectedScenario} onChange={(event) => setSelectedScenario(event.target.value)} style={{padding:'0.6rem'}}>
//           <option value="">Select a scenario</option>
//           {scenarios.map(scenario => (
//             <option key={scenario.id} value={scenario.time}>{scenario.name}</option>
//           ))}
//         </select>
//       </div>
//       <div className="vehicle-container">
//         <h2>Vehicle</h2>      
//         <table>
//           <thead>
//             <tr>
//               <th>Vehicle Id</th>
//               <th>Vehicle Name</th>
//               <th>Position X</th>
//               <th>Position Y</th>
//               <th>Speed</th>
//               <th>Direction</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//           {vehicleData.map((vehicle) => (
//               <tr key={vehicle.id}>
//                 <td>{vehicle.id}</td>
//                 <td>{editingId === vehicle.id ? <input type="text" name="name" value={editedData.name} onChange={handleInputChange} /> : vehicle.name}</td>
//                 <td>{editingId === vehicle.id ? <input type="number" name="initialPositionX" value={editedData.initialPositionX} onChange={handleInputChange} /> : vehicle.initialPositionX}</td>
//                 <td>{editingId === vehicle.id ? <input type="number" name="initialPositionY" value={editedData.initialPositionY} onChange={handleInputChange} /> : vehicle.initialPositionY}</td>
//                 <td>{editingId === vehicle.id ? <input type="number" name="speed" value={editedData.speed} onChange={handleInputChange} /> : vehicle.speed}</td>
//                 <td>
//                   {editingId === vehicle.id ? (
//                     <select name="direction" value={editedData.direction} onChange={handleInputChange}>
//                       <option value="Towards">Towards</option>
//                       <option value="Backwards">Backwards</option>
//                       <option value="Upwards">Upwards</option>
//                       <option value="Downwards">Downwards</option>
//                     </select>
//                   ) : (
//                     vehicle.direction
//                   )}
//                 </td>
//                 <td>
//                   {editingId === vehicle.id ? (
//                     <button onClick={handleSaveClick}>Save</button>
//                   ) : (
//                     <MdModeEditOutline style={{ cursor: 'pointer'}} onClick={() => handleEditClick(vehicle.id)} />
//                   )}
//                 </td>
//                 <td><RiDeleteBin5Fill style={{ cursor: 'pointer' }} onClick={() => deleteVehicle(vehicle.id)} /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="simulation-controls">
//         {simulationStarted ? (
//           <button id='StopSimulation' onClick={stopSimulation}>Stop Simulation</button>
//         ) : (
//           <button id='StartSimulation' onClick={startSimulation}>Start Simulation</button>
//         )}
//       </div>
//       <div className="grid-container">
//         {[...Array(10)].map((_, rowIndex) => {
//           return (
//             <div key={rowIndex} className="grid-row">
//               {[...Array(10)].map((_, colIndex) => (
//                 <div key={colIndex} className="grid-cell"></div>
//               ))}
//             </div>
//           );
//         })}
//         {vehicleData.map((vehicle) => (
//           vehicle.visible && (
//             <div
//               key={vehicle.id}
//               className="vehicle"
//               style={{
//                 top: `${vehicle.initialPositionY / 10}%`,
//                 left: `${vehicle.initialPositionX / 10}%`,
//               }}
//             >
//               {vehicle.id}
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// }








import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MdModeEditOutline } from 'react-icons/md';
import  serverconfig from '../config/index.js';

const Home = () => {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [vehicles, setVehicles] = useState([])
  const [isSimulating, setIsSimulating] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [scenarios,Setscenarios] = useState([])
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
        // Fetch scenario names from the JSON server
        fetch(`${serverconfig()}/api/scenariosnames`)
          .then(response => response.json())
          .then(data => {
            Setscenarios(data);
          })
          .catch(error => console.error('Error fetching scenarios:', error));
      }, []);

  // fech vehicledata...

  useEffect(() => {
        
        fetch(`${serverconfig()}/api/vehicle-names`)
          .then(response => response.json())
          .then(data => setVehicles(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

  useEffect(() => {
    let interval;
    if (isSimulating) {
      interval = setInterval(() => {
        moveVehicles();
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            stopSimulation();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, vehicles]);

  const moveVehicles = () => {
    setVehicles(prevVehicles =>
      prevVehicles.map(vehicle => {
        if (vehicle.scenario === selectedScenario.name) {
          let newPositionX = vehicle.initialPositionX;
          let newPositionY = vehicle.initialPositionY;
          switch (vehicle.direction) {
            case 'Towards':
              newPositionX += vehicle.speed / 10;
              break;
            case 'Backwards':
              newPositionX -= vehicle.speed / 10;
              break;
            case 'Upwards':
              newPositionY -= vehicle.speed / 10; // Decrease Y position to move upwards
              break;
            case 'Downwards':
              newPositionY += vehicle.speed / 10; // Increase Y position to move downwards
              break;
            default:
              break;
          }
  
          newPositionX = Math.min(Math.max(newPositionX, 0), 800);
          newPositionY = Math.min(Math.max(newPositionY, 0), 800);
          return { ...vehicle, initialPositionX: newPositionX, initialPositionY: newPositionY };
        }
        return vehicle;
      })
    );
  };
  


  const startSimulation = () => {
    if (!selectedScenario) return;
    setRemainingTime(selectedScenario.time);
    setIsSimulating(true);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };




// edit data...

const handleEditClick = (id) => {
  setEditingId(id);
  const rowData = vehicles.find(vehicle => vehicle.id === id);
  setEditedData(rowData);
};


const handleSaveClick = () => {
  const index = vehicles.findIndex(vehicle => vehicle.id === editingId);
  const updatedData = [...vehicles];
  // Update only the specific fields that were edited
  updatedData[index] = {
    ...updatedData[index],
    name: editedData.name,
    initialPositionX: editedData.initialPositionX,
    initialPositionY: editedData.initialPositionY,
    speed: editedData.speed,
    direction: editedData.direction
  };
  setVehicles(updatedData);
  
  // Capture the ID before setting it to null
  const idToUpdate = editingId;
  setEditingId(null); // Set editingId to null after updating

  // Make a PUT request to update the data on the server
  fetch(`${serverconfig()}/api/update-vehicle-data/${idToUpdate}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData[index])
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('Data updated:', data))
  .catch(error => console.error('Error updating data:', error));
};




  const deleteVehicle = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this vehicle?");
    if (isConfirmed) {
      const updatedData = vehicles.filter(vehicle => vehicle.id !== id);
      setVehicles(updatedData);
      deleteVehicleFromJson(id); 
    }
  };

//  delete function....
const deleteVehicleFromJson = (id) => {
  // Send a request to server to delete vehicle from JSON file
  fetch(`${serverconfig()}/api/delete-vehicle/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Vehicle deleted:', data)
    
  })
  .catch(error => console.error('Error deleting vehicle:', error));
};



  return (
    <div className="content">
      <div className="scenario-selector">
        <label htmlFor="scenario-select">Select Scenario:</label>
        <select
          id="scenario-select"
          value={selectedScenario ? selectedScenario.name : ''}
          onChange={(e) => {
            const scenario = scenarios.find(s => s.name === e.target.value);
            setSelectedScenario(scenario);
          }}
        >
          <option value="">Select a scenario</option>
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.name}>{scenario.name}</option>
          ))}
        </select>
      </div>
      <div className="vehicle-container">
        <h2>Vehicle</h2>
        <table>
          <thead>
            <tr>
              <th>Vehicle Id</th>
              <th>Vehicle Name</th>
              <th>Position X</th>
              <th>Position Y</th>
              <th>Speed</th>
              <th>Direction</th> 
              <th>Scenarios</th>
              <th>Edit</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{editingId === vehicle.id ? <input type="text" name="name" value={editedData.name} onChange={handleInputChange} /> : vehicle.name}</td>              
                <td>{editingId === vehicle.id ? <input type="number" name="initialPositionX" value={editedData.initialPositionX} onChange={handleInputChange} /> : vehicle.initialPositionX}</td>             
                <td>{editingId === vehicle.id ? <input type="number" name="initialPositionY" value={editedData.initialPositionY} onChange={handleInputChange} /> : vehicle.initialPositionY}</td>
                <td>{editingId === vehicle.id ? <input type="number" name="speed" value={editedData.speed} onChange={handleInputChange} /> : vehicle.speed}</td>              
                <td>
                  {editingId === vehicle.id ? (
                    <select name="direction" value={editedData.direction} onChange={handleInputChange}>
                      <option value="Towards">Towards</option>
                      <option value="Backwards">Backwards</option>
                      <option value="Upwards">Upwards</option>
                      <option value="Downwards">Downwards</option>
                    </select>
                  ) : (
                    vehicle.direction
                  )}
                </td>
                <td>{vehicle.scenario}</td> 

                <td>
                  {editingId === vehicle.id ? (
                    <button onClick={handleSaveClick}>Save</button>
                  ) : (
                    <MdModeEditOutline style={{ cursor: 'pointer'}} onClick={() => handleEditClick(vehicle.id)} />
                  )}
                </td>

                <td><RiDeleteBin5Fill style={{ cursor: 'pointer' }} onClick={() => deleteVehicle(vehicle.id)} /></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="simulation-controls">
        <button onClick={startSimulation} disabled={isSimulating} style={{background:'#1ae740',color:'white',padding:'0.4rem',borderRadius:'5px',cursor:'pointer'}}>Start Simulation</button>
        <button onClick={stopSimulation} disabled={!isSimulating} style={{background:'#1694b7',color:'white',padding:'0.4rem',borderRadius:'5px',cursor:'pointer'}}>Stop Simulation</button>
      </div>
      <div className="grid-container">
        {[...Array(10)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {[...Array(10)].map((_, colIndex) => (
              <div key={colIndex} className="grid-cell"></div>
            ))}
          </div>
        ))}
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="vehicle"
            style={{
              top: `${vehicle.initialPositionY / 10}%`,
              left: `${vehicle.initialPositionX / 10}%`,
            }}
          >
            {vehicle.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

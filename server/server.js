


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5002;
const Path = require('path');

express.static('client')

app.use(bodyParser.json());
app.use(cors());



// Serve static files from the React app
app.use(express.static(Path.join(__dirname, '../client/static')));

// Catch-all handler to send back React's index.html for any request that doesn't match above
app.get('*', (req, res) => {
    res.sendFile(Path.join(__dirname, '../client/index.html'));
});


// const readData = async (filename) => {
//     try {
//         const rawData = await fs.readFile(filename, 'utf8');
//         return JSON.parse(rawData);
//     } catch (error) {
//         console.error(`Error reading ${filename}:`, error);
//         throw error;
//     }
// };

// const writeData = async (filename, data) => {
//     try {
//         await fs.writeFile(filename, JSON.stringify(data, null, 2));
//     } catch (error) {
//         console.error(`Error writing ${filename}:`, error);
//         throw error;
//     }
// };

const readData = async (filename) => {
    try {
        const filePath = Path.join(__dirname, filename);
        const rawData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        throw error;
    }
};

const writeData = async (filename, data) => {
    try {
        const filePath = Path.join(__dirname, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        throw error;
    }
};






// get vehiclenames...
app.get('/api/vehicle-names', async (req, res) => {
    try {
        const data = await readData('vehicles.json');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error reading data' });
    }
});
// Scenarioadd...
app.post('/api/scenarios', async (req, res) => {
    try {
        const scenarioData = req.body;
        const scenarios = await readData('scenarios.json');
        const nextId = scenarios.length > 0 ? Math.max(...scenarios.map(s => parseInt(s.id))) + 1 : 1;
        scenarioData.id = nextId.toString();
        scenarios.push(scenarioData);
        await writeData('scenarios.json', scenarios);
        res.json({ message: 'Scenario added successfully', scenario: scenarioData });
    } catch (error) {
        res.status(500).json({ error: 'Error adding scenario' });
    }
});

// Vehicleadd...

app.post('/api/vehiclespost', async (req, res) => {
    try {
        const vehicleData = req.body;
        const vehicles = await readData('vehicles.json');
        const nextId = vehicles.length > 0 ? Math.max(...vehicles.map(v => parseInt(v.id))) + 1 : 1;
        vehicleData.id = nextId.toString();
        vehicles.push(vehicleData);
        await writeData('vehicles.json', vehicles);
        res.json({ message: 'Vehicle added successfully', vehicle: vehicleData });
    } catch (error) {
        res.status(500).json({ error: 'Error adding vehicle' });
    }
});

// scenariosnames get call
app.get('/api/scenariosnames', async (req, res) => {
    try {
        const scenarios = await readData('scenarios.json');
        res.json(scenarios);
    } catch (error) {
        res.status(500).json({ error: 'Error reading scenarios' });
    }
});

// Vehicle delete... 
app.delete('/api/delete-vehicle/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id;
        let vehicles = await readData('vehicles.json');
        vehicles = vehicles.filter(vehicle => vehicle.id !== vehicleId);
        await writeData('vehicles.json', vehicles);
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting vehicle' });
    }
});
// Vehicle dataupdate....
app.put('/api/update-vehicle-data/:id', async (req, res) => {
    try {
        const idToUpdate = req.params.id;
        const newData = req.body;
        let vehicles = await readData('vehicles.json');
        const index = vehicles.findIndex(vehicle => vehicle.id === idToUpdate);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }

        vehicles[index] = { ...vehicles[index], ...newData };
        await writeData('vehicles.json', vehicles);
        res.json({ success: true, message: 'Vehicle data updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update vehicle data' });
    }
});
// Scenario data update...
app.put('/api/update-scenarios/:id', async (req, res) => {
    try {
        const editedScenarioId = req.params.id;
        const editedScenario = req.body;
        let scenarios = await readData('scenarios.json');
        const index = scenarios.findIndex(scenario => scenario.id === editedScenarioId);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Scenario not found' });
        }

        scenarios[index] = { ...scenarios[index], ...editedScenario };
        await writeData('scenarios.json', scenarios);
        res.json({ success: true, message: 'Scenario data updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update scenario data' });
    }
});


// delete senarios...
app.delete('/api/scenariosDelete/:id', async (req, res) => {
  try {
      const scenarioId = req.params.id;
      console.log(`Deleting scenario with ID: ${scenarioId}`);
      
      let scenarios = await readData('scenarios.json');
      console.log('Current scenarios:', scenarios);
      
      scenarios = scenarios.filter(scenario => scenario.id !== scenarioId);
      console.log('Updated scenarios after deletion:', scenarios);
      
      await writeData('scenarios.json', scenarios);
      res.json({ message: 'Scenario deleted successfully' });
  } catch (error) {
      console.error('Error deleting scenario:', error);
      res.status(500).json({ error: 'Error deleting scenario' });
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;


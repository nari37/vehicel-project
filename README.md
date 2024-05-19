# AddVehicle Application

## Overview

The AddVehicle application is a simple React-based web application that allows users to add vehicle details, including the vehicle name, position, speed, direction, and the scenario it belongs to. This project includes both frontend and backend components, with the backend simulated using `json-server` to handle API requests.

## Features

- Fetch and display a list of scenarios from the backend.
- Add new vehicle details through a form.
- Validate input fields before submission.
- Display error messages for invalid inputs.
- Reset the form after successful submission.

## Project Structure

- `client`: The client folder is complete front ui uisng React.
- `Server`:The Server folder is complete Backend with node server.
- `senarios.json`: Is used to store the Scenarios.
- `vehicles.json`:Is used to store the Vehicles information.
## Installation and Setup


### Backend Setup

1. Install `json-server` globally.
   
   npm install -g json-server

2. And install the necessary package like express,cors,body-parser like..,

3. And setup a server port.

### Frontend Setup

1. Install `npx create-react-app` in clint folder.

2. And Install necessary pakages like react-router-dom etc.


### Project Explanation

- The AddVehicle application is designed to simulate the process of adding vehicle details to a scenario. It demonstrates basic CRUD operations and form validation using React and node server. The project helps understand the interaction between frontend and backend components, state management in React, and basic deployment techniques.

- Inside Home page user can be able to select the scenario whichever scenarios he has created
and start simulation, when user click start simulation vehicles should start moving based on the
direction and speed, till the scenario time.

### Usage

1. Open the application in your browser (usually at http://localhost:3000).
2. Select a scenario from the dropdown menu.
3. Fill in the vehicle details (name, position X, position Y, speed, and direction).
4. Click "Add" to submit the form. If the form is successfully submitted, it will reset, and you will see a success message.
5. Click "Reset" to clear all fields.
6. Click "Go Back" to navigate back to the previous page.
import React, { useState } from 'react'
import Addvechile from '../pages/AddVechile.jsx';
import Home from '../pages/Home.jsx';
import '../css/Main.css';
import AddScenario from '../pages/AddScenario.jsx';
import AllScenarios from '../pages/AllScenarios.jsx';


function Sidebar({setActiveLink}){
    return(
    <>
    <div className='side' style={{
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100%',
        width: '15%',          
        boxSizing: 'border-box',
        zIndex: '3000', 
    }}>
    <ul style={{
        listStyleType: 'none',
        padding: '0',
        margin: '0'
      }}>

<li style={{
          marginBottom: '10px',
          cursor:'pointer'
        }} onClick={() => setActiveLink('home')}>
          <span>Home</span>
     </li>
   
     <li style={{
          marginBottom: '10px',
          cursor:'pointer'
        }} onClick={() => setActiveLink('Add Scenario')}>
          <span>Add Scenario</span>
     </li>

     <li style={{
          marginBottom: '10px',
          cursor:'pointer'
        }} onClick={() => setActiveLink('All Scenario')}>
          <span>All Scenario</span>
     </li>
    
     <li style={{
          marginBottom: '10px',
          cursor:'pointer'
        }} onClick={() => setActiveLink('Addvechile')}>
          <span>Add Vechile</span>
     </li>

   </ul>


    </div>
    </>
    )
}


// main page...
export default function Main() {
    const [activeLink, setActiveLink] = useState('home');

    const renderContent = ()=>{
         switch(activeLink){
            case 'Addvechile':
               return <Addvechile setActiveLink={setActiveLink}/>; 
             case 'home' :            
               return <Home/>; 
              case 'All Scenario' :            
               return <AllScenarios setActiveLink={setActiveLink}/>; 
               case 'Add Scenario' :            
               return <AddScenario setActiveLink={setActiveLink}/>;
              
              }     
    }
  return (
    <>
     <div style={{display:'flex',maxWidth:'100%'}}>
        <div style={{width:'15%'}}>
            <Sidebar setActiveLink={setActiveLink} />
        </div>
        <div style={{width:'85%',background:'rgb(19, 17, 17)',height:'100%',color:'white',padding:'1rem'}}>
        {renderContent()}
        </div>
     </div>

    </>
  )
}

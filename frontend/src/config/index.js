// export default serverconfig = () =>  {
    
//     let hostname = window.location.hostname === `localhost` ? `http://localhost:5000`: `${window.location.protocal}://${widow.location.hostname}`
    
//    return hostname;
// }



const serverconfig = () => {
    let hostname = window.location.hostname === 'localhost' ? 
                   'http://localhost:5002' : 
                   `${window.location.protocol}//${window.location.hostname}`;
    
    return hostname;
  }
  
  export default serverconfig;
  
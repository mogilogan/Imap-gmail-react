// import React from "react";
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
// import Button from "@mui/material/Button";

// import { useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// function App() {
//   let navigate = useNavigate(); 
//   const routeChange = () =>{ 
//     let path = `/login`; 
//     navigate(path);
//   }
//   const [url, setUrl] = useState("");

 
// axios.get("http://localhost:8000/")
// .then((response) => {
// const required   = response.data;
//   setUrl(required);
//   console.log(url);
// })

//   const qrcode = (
//     <QRCodeCanvas
//       id="qrCode"
//       value={url}
//       size={300}
//       bgColor={"#ffffff"}
//       level={"H"}
//     />
//   );
//   return (
//     <div className="qrcode__container">
//         <h1>Wait for qr to load!!!!!</h1>   
//       <div>
//         {qrcode}
//         </div>

  
              
//           <Button
//             onClick={routeChange}
//               >
//               Click to login mail
//             </Button>

       
      
//       </div>
//   );
// };

// export default App;



import React from 'react';
import { Container } from '@mui/material';

import Scan from './scan/index.js';

const App = () => (
    <Container maxWidth="lg">
      <Scan/>
    </Container>

);

export default App;

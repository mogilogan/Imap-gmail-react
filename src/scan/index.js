import React from "react";
import axios from "axios";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const Scan = () => {

  const [url, setUrl] = useState("");
  const [needed,setNeeded] = useState({number:"",mailid:"",password:""});

  const handleChange = (e) => {
    setNeeded ({...needed,[e.target.name]: e.target.value})
  };

  const handlesubmit = (e) =>{
    e.preventDefault();
    console.log("needed Created", needed);

    const mydata = {
      "mailid": `${needed.mailid}`,
      "password": `${needed.password}`,
      "number": `${needed.number}`,
    };
    axios({
      method: 'post',
      url: 'http://localhost:8000/okok',
      headers: {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Accept': 'Token',
        "Access-Control-Allow-Origin": "*",
  
    },
      data: mydata
  })
  .then((res) => {
      console.log(res);
  })
  }

  
 
axios.get("http://localhost:8000/")
.then((response) => {
const required   = response.data;
  setUrl(required);
  console.log(url);
})

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );
  return (
    <div className="qrcode__container">
        <h1>Wait for qr to load!!!!!</h1>   
      <div>
        {qrcode}
        </div>    

        <form onSubmit={handlesubmit}>

<label>Number:</label>
<input type="tel" name="number" value={needed.number} onChange={handleChange} />
<label>MailID:</label>
<input type="text" name="mailid" value={needed.mailid} onChange={handleChange} />
<label>Password:</label>
<input type="password" name="password" value={needed.password} onChange={handleChange} />
<button>Send Data</button>

</form>  
      
      </div>
  );
};

export default Scan;
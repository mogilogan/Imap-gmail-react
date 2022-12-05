import React from "react";
import axios from "axios";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const Scan = () => {

  const [url, setUrl] = useState("");
  const [needed,setNeeded] = useState({number:"",mailid:"",password:""});
  const [lockmsg,setLockmsg] = useState(" ");
  const [locked,setLocked] = useState(false);
  const [locked1,setLocked1] = useState(true);

  const handleChange = (e) => {
    setNeeded ({...needed,[e.target.name]: e.target.value})
  };

  const handleunlock = (e) => {
    setLocked(false);
    setLocked1(true);
    setLockmsg(" ");
  };

  const handlesubmit = (e) =>{
    e.preventDefault();
    console.log("needed Created", needed);
    setLocked(true);
    setLocked1(false);
    setLockmsg("Data locked. Click below to release it. Check Whatsapp! Every minute mails are fetched to your whatsapp account");

    const mydata = {
      "mailid": `${needed.mailid}`,
      "password": `${needed.password}`,
      "number": `${needed.number}`,
    };
     (function myLoop(i){
    setTimeout(function () {
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
  if(--i) myLoop(i);
},60000)})(5000)

};


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
    <div style={{textAlign:'center',paddingTop:40, paddingBottom:40}}>
      <div>
        <h1>WARNING: Follow instructions carefully orelse the app will crash.</h1>
        <h2>INTRUCTIONS TO FOLLOW: </h2>
        <h3>1. Wait for your QR to load. The Inital qr is wont work.</h3>
        <h3>2. Open Your Whatsapp and go to link devices. Scan the QR code.</h3>
        <h3>3. visit your <a href="https://www.gmail.com" target="_blank">www.gmail.com</a> and Enable Imap.</h3>
        <h3>4. Enable 2 factor auth. for your gmail account. Setup "App Password". <a href="https://support.google.com/mail/answer/185833?hl=en" target="_blank" rel="noopener noreferrer">Follow Link.</a></h3>
        <h3>5. Enter the phone number where the alert should go, with no spaces. Eg:"4444455555" </h3>
        <h3>6. Enter the imap enabled and App password setted email id</h3>
        <h3>7. click Submit.</h3>
        <h3>8. Check your whatsapp for alert.</h3>
      </div>
        <h1>Wait for qr to load!!!!!</h1>   
      <div>
        {qrcode}
        </div>    

        <form  onSubmit={handlesubmit}>
<div style={{alignContent:"center",paddingTop:40}}>
<label>Number:</label>
<input type="tel" name="number" value={needed.number} onChange={handleChange} />
</div>
<div  style={{alignContent:"center"}}>
<label>MailID:</label>
<input type="text" name="mailid" value={needed.mailid} onChange={handleChange} />
</div>
<div style={{alignContent:"center"}}>
<label>Password:</label>
<input type="password" name="password" value={needed.password} onChange={handleChange} />
</div>
<button disabled={locked}>Send Data</button>
</form>  
<div>
  <h4>{lockmsg}</h4>
  <button disabled={locked1}  onClick={handleunlock}>Unlock</button>
</div>
      
      </div>
  );
};

export default Scan;
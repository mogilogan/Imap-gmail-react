const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var Imap = require("imap");
var MailParser = require("mailparser").MailParser;
const simpleParser = require('mailparser').simpleParser;
var Promise = require("bluebird");
Promise.longStackTraces();

app  = express();

app.use(cors());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
}));

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
})); 


const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

const number = "+918778434982";
const chatId = number.substring(1) + "@c.us";
const text = "hey Suriya!!";


// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });
app.get('/', async (req, res) => {
    let qr = await new Promise((resolve, reject) => {
        client.on('qr', (qr) =>
         resolve(qr)
         )
    })
    res.send(qr)
})

client.on('ready', () => {
    console.log('Client is ready!');
    // client.sendMessage(chatId,text);
});

client.initialize();

app.post('/',(req,res) =>{
    var needed = req.body.mailid;
    var phonenumber1 = req.body.number;
    var password = req.body.password;
    console.log(password);
    const phonenumber = `+91${phonenumber1}`;
    var imapConfig = {
      user: `${needed}`,
      password: `${password}`,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions:{rejectUnauthorized:false}
  };
  
  var imap = new Imap(imapConfig);
  Promise.promisifyAll(imap);
  
  imap.once("ready", execute);
  imap.once("error", function(err) {
      console.log("Connection error: " + err.stack);
  });
  
  imap.connect();
  
  function execute() {
      imap.openBoxAsync("INBOX", false, function(err, mailBox) {
          if (err) {
              console.error(err);
              return;
          }
          imap.search(["UNSEEN"], function(err, results) {
              if(!results || !results.length){console.log("No unread mails");imap.end();return;}
              //  mark as seen
          imap.setFlags(results, ['\\Seen'], function(err) {
                  if (!err) {
                      console.log("marked as read");
                  } else {
                      console.log(JSON.stringify(err, null, 2));
                  }
              });
  
              var f = imap.fetch(results, { bodies: ""});
              f.on("message", processMessage);
              f.once("error", function(err) {
                  return Promise.reject(err);
              });
              f.once("end", function() {
                  console.log("Done fetching all unseen messages.");
                  imap.end();
              });
          });
      });
  }
  
  function processMessage(msg, seqno) {
      console.log("Processing msg #" + seqno);
      // console.log(msg);
      var prefix = '(#' + seqno + ') ';
  
    
       msg.on("body", function(stream) {
        simpleParser(stream, (err, mail) => {
            console.log(prefix + mail.subject);
            console.log(prefix + mail.text);
            console.log(prefix + mail.from.text);
            // client.sendMessage(phonenumber1,mail.subject);
            
          });
         
      });
      msg.once("end", function() {
          console.log("Finished msg #" + seqno);
         
      });
    }
        
    res.send('saved')
})

app.listen(8000, () => {console.log('Client is listeningto port 8000!');});


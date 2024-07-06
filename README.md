### Email alert on Whatsapp

## How to Run:

- Clone this repo: `git clone`
- Install Frontend: `npm i`
- Install Backend:
  + `cd server`
  + `npm i`
- Start Backend: `npm start`
- Start Frontend:
  + `cd ..`
  + `npm start`
  
!!!

## Server:

1. Read Documentations of [WhatsappWebJs](https://docs.wwebjs.dev/global.html)
2. Read Documentations of [IMAP](https://www.npmjs.com/package/imap)

- Initailize the Whatsapp client to send the code to the Frontend so that a login session is created
- If Logged in, Based on keywords send the fetched new emails using IMAP to the specified whatsapp Number.
- The Process is automated.

// const router = require("express").Router();
// const { Client } = require('whatsapp-web.js');

// router.get('/', async (req, res) => {
//     try {
//         const client = new Client();
//         let qr = await new Promise((resolve, reject) => {
//             client.once('qr', (qr) => resolve(qr))
//         })
//         res.send(qr)
//     } catch (err) {
//         res.send(err.message)
//     }
// })

router.get('/', async (req,res) => {
    try {
        const sendingnumber  = req.body.sendingnumber;
        const mailid = req.body.mailid;
        const apppassword = req.body.apppassword;
    }
})

module.exports = router;
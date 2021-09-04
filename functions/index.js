const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
 
const app = express();
app.use(cors({
    origin: true
}))
app.use(express.json());


app.get('/', (request, response) => { 
    response.status(200).send('API test')
})

exports.api = functions.https.onRequest(app);
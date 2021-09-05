const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");

const fs = require('fs');
const papa = require('papaparse');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const port = 4000

const app = express();
app.use(cors({
    origin: true
}))
app.use(express.json());


app.get('/', async (request, response) => {
    const file = fs.createReadStream('data/tree_data.csv');
    
    const readFilePromise = (file) => new Promise ((resolve, reject) => {
        papa.parse(file, {
            skipEmptyLines: true,
            header: true,
            complete: function(results, file) {
                
                const arr = results.data;
                let map = {}, node, tree = [], i;

                for (i = 0; i < arr.length; i += 1) {
                    map[arr[i].id] = i; // initializing map
                    arr[i]["children"] = []; // initializing children 
                };


                for (i = 0; i < arr.length; i += 1) {
                    node = arr[i];
                    if (node.parent !== "0") {
                        arr[map[node.parent]].children.push(node); // push node to parent
                    }
                    else {
                        tree.push(node);
                    };
                };

                localStorage.setItem('tree_data', results.data);
                
                resolve(results);
            },
        })
    }).then(results => {
        response.status(201).send(results.data);
    }).catch( error => {
        console.log(error);    
        response.status(503).send('Service Unavailable');
    })

    const results = await readFilePromise(file);

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

exports.api = functions.https.onRequest(app);
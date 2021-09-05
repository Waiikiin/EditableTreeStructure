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

                localStorage.setItem('tree_data', JSON.stringify(results.data) );

                resolve(results.data);
            },
        })
    }).then(results => {
        response.status(201).send(results);
    }).catch( error => {
        console.log(error);    
        response.status(503).send('Service Unavailable');
    })

    const results = await readFilePromise(file);

})

app.post('/update', (request, response) => {
    if (!request.body){
        response.status(400).send('Bad Request');
    }

    const data = request.body;
    const treeData = JSON.parse(localStorage.getItem('tree_data'));

    var result = treeData.find(x => {
        return x.id == data.id
    });

    if (result && result.read_only < 1) {
        result.name = data.name;
        response.status(204).send('Update Success');
    } else {
        response.status(405).send('Error, this node is read only');
    }

})

app.post('/delete', (request, response) => {
    if (!request.body){
        response.status(400).send('Bad Request');
    }

    const data = request.body;
    const treeData = JSON.parse(localStorage.getItem('tree_data'));

    var result = treeData.find( (x,i) => {
        if ( x.id == data.id ) {
            index = i;
            return true;
        }
    });

    if (result && result.read_only < 1) {
        treeData.splice(index,1);
        
        console.log(treeData);
        response.status(204).send('Delete Success');
    } else {
        response.status(405).send('Error, this node is read only');
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

exports.api = functions.https.onRequest(app);
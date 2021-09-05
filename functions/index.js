const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");

const fs = require('fs');
const papa = require('papaparse');
const { trace } = require("console");

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
                let map = {}, node, i;
                // let tree = []

                // must sort the array in a map first
                for (i = 0; i < arr.length; i += 1) {
                    // initializing map
                    // sort out the index of array id in map
                    // key: id, value: index in the array
                    map[arr[i].id] = i; 
                    arr[i]["children"] = []; // initializing children 
                };


                for (i = 0; i < arr.length; i += 1) {
                    node = arr[i];
                    if (node.parent !== "0") {
                        // get the parent id, grab the index in map, access it in array
                        arr[map[node.parent]].children.push(node); // push node to parent
                    }
                    // else {
                    //     tree.push(node);
                    // };
                };
                localStorage.setItem('tree_data', JSON.stringify(results.data) );

                resolve(results.data);
            },
        })
    }).then(results => {
        response.status(201).send(results);
    }).catch( error => {
        console.error(error);    
        response.status(503).send('Service Unavailable');
    })

    const results = await readFilePromise(file);

})


app.get('/export', (request, response) => {
    const treeData = JSON.parse(localStorage.getItem('tree_data'));

    // remove the children
    treeData.forEach(x => {
        delete x.children;
    })

    // const readFilePromise = (treeData) => new Promise ((resolve, reject) => {
    const csv = papa.unparse(treeData, {
        delimiter: '\t',
        header: true,
        newline: '\r\n',
    })


    response.status(201).send(csv);
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
        localStorage.setItem('tree_data', JSON.stringify(treeData) );
        
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

    var result = treeData.find((x,i) => {
        if ( x.id == data.id ) {
            index = i;
            return true;
        }
    });

    if (result && result.read_only < 1) {
        treeData.splice(index,1);
        localStorage.setItem('tree_data', JSON.stringify(treeData) );
        response.status(204).send('Delete Success');
    } else {
        response.status(405).send('Error, this node is read only');
    }

})

app.post('/create', (request, response) => {
    if (!request.body){
        response.status(400).send('Bad Request');
    }

    const data = request.body;
    const treeData = JSON.parse(localStorage.getItem('tree_data'));

    data.node["children"] = []; // initializing children 
    data.node["parent"] = data.parentId;

    data.node['id'] = parseInt(treeData[treeData.length-1].id) + 1;

    // make sure the array that contains the tree is still in order after inserting this new node
    var index = -1;
    var middleIndex = -1
    treeData.forEach((x,i) => {
        if ( data.node.id == x.id ) {
            response.status(400).send('Error, id exists');
        }
        if ( data.node.id < x.id  ) {
            middleIndex = i;
        }
        index = i;
    })
    index++;
    middleIndex++;

    // if the new node fits in the middle of the tree, otherwise
    if (index < middleIndex) {
        treeData.splice(middleIndex, 0, data.node);
    } else {
        treeData.splice(index, 0, data.node);
    }

    treeData.splice(middleIndex, 0, data.node);
   
    var parentIndex = treeData.findIndex(x => {
        return x.id == data.parentId
    })
    
    if (parentIndex === -1) {
        response.status(400).send('Error, parent id does not exists');
    }

    treeData[parentIndex].children.push(data.node);
    localStorage.setItem('tree_data', JSON.stringify(treeData) );
    response.status(204).send(`Create Success, created id: ${data.node.id}`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

exports.api = functions.https.onRequest(app);
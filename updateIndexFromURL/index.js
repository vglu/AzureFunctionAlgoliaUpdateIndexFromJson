const algoliasearch = require("algoliasearch");
const request = require('request');

const client = algoliasearch(process.env.AlgoliaAppId, process.env.AlgoliaAdminKey);
const index = client.initIndex(process.env.AlgoliaIndexName);


function updateData(objects) {
    //const objects = require("./algolia.json");
    index.clearObjects().then(() => {
        index
            .saveObjects(objects)
            .then(({ objectIDs }) => {
                console.log(objectIDs);
                console.log("Updated");
            })
            .catch(err => {
                console.log(err);
        });    
    });
}

function isValueExists(value) {
    let ret = true;
    if (!value || typeof value === 'undefined' || value === null || value === undefined) {
        ret = false;
    }
    return ret;
}

function doRequest(url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
module.exports = async function (context, req) {

    const url = req.query.url || process.env.JSON_URL; 

    if (!isValueExists(url)) {
        context.res = {body: {errorMessage: "Specify URL in input parameters or in function parameters"}};
        context.res.status = 500;
        context.done();
    } else {
        try {
            const body = await doRequest(url);
            if (body.includes('<title>Sign in to your account</title>')) {
                context.res = {body: {errorMessage: body}};
                context.res.status = 500;
                context.done();                        
             } else {
                updateData(JSON.parse(body));
                context.res = { body : { url : url, type: "url"}}; 
                context.done();         
            }            
        } catch (error) {
            context.res = {body: {errorMessage: error}};
            context.res.status = 500;
            context.done();                        
        }
    }
}
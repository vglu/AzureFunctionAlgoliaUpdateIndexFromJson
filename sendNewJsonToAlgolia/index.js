const algoliasearch = require("algoliasearch");
var multipart = require("parse-multipart");

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


module.exports = async function (context, req) {
    // encode body to base64 string
    var bodyBuffer = Buffer.from(req.body);
    // get boundary for multipart data e.g. ------WebKitFormBoundaryDtbT5UpPj83kllfw
    var boundary = multipart.getBoundary(req.headers['content-type']);
    // parse the body
    var parts = multipart.Parse(bodyBuffer, boundary);
    const objects = parts[0].data.toString('utf8');
    updateData(JSON.parse(objects));
    context.res = { body : { name : parts[0].filename, type: parts[0].type, data: parts[0].data.length}}; 
    context.done(); 
      
}
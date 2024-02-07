var axios = require('axios');


var data = JSON.stringify({
    "collection": "users",
    "database": "sample_mflix",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});

function PostTest()
{
var config = {
    method: 'post',
    url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-ouhkz/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'bST3tM9fsZK63ADuaIr8RAjeHXwg5udFO2FeeUfLrvc3cqGWQaWeVtU9EltqHIxY',
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}
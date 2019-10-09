const csv = require('csv-parser');
const fs = require('fs');

var AWS = require("aws-sdk");

fs.createReadStream('AccessKeys.csv')
  .pipe(csv())
  .on('data', (row) => {
    rows.push(row);
    configureAccess(row);

    //console.log(rows.length);
  })
  .on('end', () => {
    console.log('Credentials imported');
  });


var AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY;

function configureAccess(row) {
    // console.log(row);
    AWS_ACCESS_KEY_ID = row.AccessKeyID;
    AWS_SECRET_ACCESS_KEY = row.SecretAccessKey;

    // console.log("Keys");
    // console.log(AWS_ACCESS_KEY_ID);
    // console.log(AWS_SECRET_ACCESS_KEY);

    AWS.config.accessKeyId = AWS_ACCESS_KEY_ID;
    AWS.config.secretAccessKey = AWS_SECRET_ACCESS_KEY;
}

AWS.config.region = "us-east-2";

AWS.config.update({endpoint: "https://dynamodb.us-east-2.amazonaws.com"});

var docClient = new AWS.DynamoDB.DocumentClient();

var rows = [];

createParams();

// fs.createReadStream('SobeysItems.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     rows.push(row);
//     //console.log(rows.length);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//     //processJSON(rows);
//   });

// function processJSON(rows) {
//     console.log(rows.length);
//     for (var i = 0; i < rows.length; i++) {
//         createParams(rows[i]);
//     }
// }

function createParams() {
    var table = "Sobeys";
    
    var params = {
        TableName:table,
        ProjectionExpression: "title",
        KeyConditionExpression: "title between :letter1 and :letter2",
        ExpressionAttributeValues: {
            ":letter1": "A",
            ":letter2": "B"
        }
    };
    queryDynamo(params);
}

function queryDynamo(params) {
    console.log(params);
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded");
            data.Items.forEach(function(item) {
                console.log(item.Item);
            });
        }
    });
}

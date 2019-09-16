const csv = require('csv-parser');
const fs = require('fs');

var AWS = require("aws-sdk");

var AWS_ACCESS_KEY_ID = "AKIA2NAENSDJKEKXQNUR"
var AWS_SECRET_ACCESS_KEY = "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"

AWS.config.accessKeyId = AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = AWS_SECRET_ACCESS_KEY;
AWS.config.region = "us-east-2";

AWS.config.update({endpoint: "https://dynamodb.us-east-2.amazonaws.com"});

var docClient = new AWS.DynamoDB.DocumentClient();

var rows = [];


fs.createReadStream('SobeysItems.csv')
  .pipe(csv())
  .on('data', (row) => {
    rows.push(row);
    //console.log(rows.length);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    processJSON(rows);
  });

function processJSON(rows) {
    console.log(rows.length);
    for (var i = 0; i < rows.length; i++) {
        createParams(rows[i]);
    }
}

function createParams(json) {
    var table = "Sobeys";
    var Store = json.Store;
    var Date = json.Date;
    var Item = json.Item;
    var Price = json.Price;
    var UnitType = json.UnitType;
    var Units = json.Units;

    var params = {
        TableName:table,
        Item:{
        "Store":Store,
        "Date": Date,
        "Item": Item,
        "Price": Price,
        "Units": parseInt(Units),
        "UnitType": UnitType
        }
    };
    console.log(params);
    console.log(typeof params)
    uploadToDynamo(params);
}

function uploadToDynamo(params) {
    console.log("Adding a new item...");
    console.log(params);
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

var AWS = require("aws-sdk");

var AWS_ACCESS_KEY_ID = "AKIA2NAENSDJKEKXQNUR"
var AWS_SECRET_ACCESS_KEY = "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"

AWS.config.accessKeyId = AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = AWS_SECRET_ACCESS_KEY;
AWS.config.region = "us-east-2";

AWS.config.update({endpoint: "https://dynamodb.us-east-2.amazonaws.com"});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Sobeys";

var date = "9/12/2019";
var item = "test123";
var price = 2.99

var params = {
    TableName:table,
    Item:{
        "Store":"testing",
        "Date": date,
        "Item": item,
        "Price": price
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
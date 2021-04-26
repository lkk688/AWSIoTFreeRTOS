
'use strict';
console.log('Loading hello world function');

var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tablename = "IoTBackend";

let deviceID = "NA";
let thingType = 'NA';
let headerdata = 'NA';
let sensorData = 'NA';
let responseCode = 201;//200;
let message = '';

//async (event, context)
//index.handler
exports.handler = (event, context, callback) => {

    //console.log("request: " + JSON.stringify(event));
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    console.log("Context Log Streamname: " + JSON.stringify(context.logStreamName));//cloudwatch logstream name,match to the cloudwatch log file

    //Get the queryStringParameters in the URL
    if (event.queryStringParameters && event.queryStringParameters.deviceID) {
        console.log("Received deviceID: " + event.queryStringParameters.deviceID);
        deviceID = event.queryStringParameters.deviceID;
    }

    if (event.queryStringParameters && event.queryStringParameters.thingType) {
        console.log("Received thingType: " + event.queryStringParameters.thingType);
        thingType = event.queryStringParameters.thingType;
    }

    if (event.headers && event.headers['headerdata']) {
        console.log("Received headerdata: " + event.headers.headerdata);
        headerdata = event.headers.headerdata;
    }

    if (event.body) {
        let body = JSON.parse(event.body);
        console.log("Received event body: "+ body);
        if (body.sensorData)
            console.log("Received sensorData: "+ JSON.stringify(body.sensorData));
            sensorData = body.sensorData;
        if (body.temperature)
            console.log("Received temperature: "+ JSON.stringify(body.temperature));
    }

    var params = {
        TableName:tablename,
        Item:{
            "deviceID": deviceID,
            "thingType": thingType,
            "sensorData": sensorData,
            "time": new Date().toISOString(),
            "headerdata": headerdata
            }
    };
    dbSensor(event, params).then((res) => {
        // You can use the callback function to provide a return value from your Node.js
        // Lambda functions. The first parameter is used for failed invocations. The
        // second parameter specifies the result data of the invocation.

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        console.log("received db data in callback:" + JSON.stringify(res.Item) );
        message = JSON.stringify(res.Item);
        let responseBody = {
            message: message,
            currenttime: new Date().toISOString(), //added new field for testing
            input: event
        };
        callback(null, {
            statusCode: responseCode,
            body: JSON.stringify(responseBody),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        errorResponse(err.message, context.awsRequestId, callback);
    });

    // let greeting = `Good ${time}, ${name} of ${city}.`;
    // if (day) greeting += ` Happy ${day}!`;

    // The output from a Lambda proxy integration must be
    // in the following JSON object. The 'headers' property
    // is for custom response headers in addition to standard
    // ones. The 'body' property  must be a JSON string. For
    // base64-encoded payload, you must also set the 'isBase64Encoded'
    // property to 'true'.
    // let response = {
    //     statusCode: responseCode,
    //     headers: {
    //         "x-custom-header" : "my custom header value"
    //     },
    //     body: JSON.stringify(responseBody)
    // };

    // console.log("response: " + JSON.stringify(response));
    // return response;
};

function dbSensor(event, params) {
    switch (event.httpMethod) {
        case 'DELETE':
            //dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            var getparams = {
                TableName: tablename,
                Key: {
                    "deviceID": deviceID, //"testid1",
                    "thingType": thingType //"web"
                }
            };
            return dynamo.get(getparams).promise();
        case 'POST':
            //dynamo.putItem(JSON.parse(event.body), done);
            console.log('POST method');
            return dynamo.put(params).promise();
        case 'PUT':
            //dynamo.updateItem(JSON.parse(event.body), done);
            break;
        default:
            //done(new Error(`Unsupported method "${event.httpMethod}"`));
    }

}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };

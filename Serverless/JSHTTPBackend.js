// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };

'use strict';

var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tablename = "IoTBackend";

let deviceID = "NA";
let thingType = 'NA';
let headerdata = 'NA';
let sensorData = 'NA';
let responseCode = 201; //200;
let responseCodeErr = 500; //200;
let message = '';

//index.handler
exports.handler = async(event, context) => {

    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    console.log("Context Log Streamname: " + JSON.stringify(context.logStreamName)); //cloudwatch logstream name,match to the cloudwatch log file

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
        console.log("Received event body: " + body);
        if (body.sensorData)
            console.log("Received sensorData: " + JSON.stringify(body.sensorData));
        sensorData = body.sensorData;
        if (body.temperature)
            console.log("Received temperature: " + JSON.stringify(body.temperature));
    }

    let responseBody = '';
    var getparams = {
        TableName: tablename,
        Key: {
            "deviceID": deviceID, //"testid1",
            "thingType": thingType //"web"
        }
    };

    //use event.httpMethod for API Gateway REST API; use event.requestContext.http.method for HTTP API
    switch (event.requestContext.http.method)//event.httpMethod) //event.requestContext.http.method)//)
    {
        case 'DELETE':
            try {
                await dynamo.delete(getparams).promise();
                message = "Data deleted";
            }
            catch (err) {
                console.log("DELETE DB Failure", err.message);
                responseCode = responseCodeErr;
            }
            break;
        case 'GET':
            try {
                const data = await dynamo.get(getparams).promise();
                console.log("received db data:" + JSON.stringify(data.Item));
                if (!data.Item) {
                    message = "Data not available";
                    console.log("Data not available");
                }else {
                    message = JSON.stringify(data.Item);
                }
            }
            catch (err) {
                console.log("GET DB Failure", err.message);
                responseCode = responseCodeErr;
            }
            break;
        case 'POST':
            var postparams = {
                TableName: tablename,
                Item: {
                    "deviceID": deviceID,
                    "thingType": thingType,
                    "sensorData": sensorData,
                    "time": new Date().toISOString(),
                    "headerdata": headerdata
                }
            };
            try {
                await dynamo.put(postparams).promise();
                message = "Data saved to db";
            }
            catch (err) {
                console.log("POST DB Failure", err.message);
                responseCode = responseCodeErr;
            }
            break;
        case 'PUT':
            // var putparams = {
            //     TableName: tablename,
            //     Key: {
            //         "deviceID": deviceID,
            //         "thingType": thingType
            //     },
            //     UpdateExpression: 'set sensorData.temperature = :temperature, sensorData.batteryVoltage = :batteryVoltage ',
            //     ExpressionAttributeValues: {
            //         ":temperature": sensorData.temperature,
            //         ":batteryVoltage": sensorData.batteryVoltage
            //     },
            //     ReturnValues: "UPDATED_NEW"
            // };
            var putparams = {
                TableName: tablename,
                Key: {
                    "deviceID": deviceID,
                    "thingType": thingType
                },
                UpdateExpression: 'set sensorData = :s ',
                ExpressionAttributeValues: {
                    ":s": sensorData
                },
                ReturnValues: "UPDATED_NEW"
            };
            try {
                await dynamo.update(putparams).promise();
            }
            catch (err) {
                console.log("PUT DB Failure", err.message);
                responseCode = responseCodeErr;
            }
        default:
            console.log(`Unsupported HTTP method: "${event.httpMethod}"`);
            console.log(`Unsupported HTTP method: "${event.requestContext.http.method}"`);
            message = "Unsupported HTTP method";
            responseCode = responseCodeErr;
    }
    responseBody = {
        message: message,
        currenttime: new Date().toISOString(),
        input: event
    };
    return {
        statusCode: responseCode,
        body: JSON.stringify(responseBody),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };
};


const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const ddbtable = 'WebSocketDB';

let send = undefined;

function init(event) {  
    console.log(event);
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({    
        apiVersion: '2018-11-29',    
        endpoint: event.requestContext.domainName + '/' + event.requestContext.stage  
    });        
    send = async (connectionId, data) => {  
        console.log("Start send function. "); 
        await apigwManagementApi.postToConnection(
            { 
                ConnectionId: connectionId, 
                Data: `Echo: ${data}` 
            }
        ).promise();  
    };
}

exports.handler =  (event, context, callback) => {  
    init(event);  
    let message = JSON.parse(event.body).data;//message;
    console.log("Received message: " + message);  
    //send message to all connected devices
    getConnections().then((data) => {        
        console.log(data.Items);        
        data.Items.forEach(function(connection) {           
            console.log("Connection " +connection.connectionid); 
            send(connection.connectionid, message);        
        }); 
        callback(null, {
            statusCode: 200,
            body: "OK",
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    }).catch((err) => {
        console.error(err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        console.log("ERROR: " +err.message); 
        errorResponse(err.message, context.awsRequestId, callback);
    });   
    //return {statusCode: 200, body: 'Data sent.'};
};

function getConnections(){    
    return ddb.scan({        
        TableName: ddbtable,    
    }).promise();
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

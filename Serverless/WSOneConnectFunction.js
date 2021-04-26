
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const ddbtable = 'WebSocketDB';

exports.handler = (event, context, callback) => {    
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    const connectionId = event.requestContext.connectionId;    
    console.log("ConnectionID: " + connectionId);  
    addConnectionId(connectionId).then(() => {    
        callback(null, {        
            statusCode: 200,        
        }); 
    });
};

function addConnectionId(connectionId) {    
    return ddb.put({        
        TableName: ddbtable,        
        Item: {            
            connectionid : connectionId        
            
        },
    }).promise();
    
}
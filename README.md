# AWSIoTFreeRTOS
 This repo contains AWS FreeRTOS IoT python client sample code (colab example) and AWS IoT FreeRTOS sample code for TI CC32xx wifi board.
 
 ## Python Client
 [CMPE-AWSIoT.ipynb](/CMPE-AWSIoT.ipynb) is the AWS IoT python sdk example based on colab.
 
 ## AWS FreeRTOS for TI CC32xx wifi board
 [FreeRTOS](/FreeRTOS) folder the AWS IoT FreeRTOS code for TI CC32xx wifi board. You can check my tutorial from this [link](https://kaikailiu.cmpe.sjsu.edu/iot/ti-cc3220-and-aws-freertos/). Amazon's tutorial is in [FreeRTOS Getting Started] (https://docs.aws.amazon.com/freertos/latest/userguide/freertos-getting-started.html) and [Getting Started TI](https://docs.aws.amazon.com/freertos/latest/userguide/getting_started_ti.html)
 
 ### Hardware board
 The hardware board used here is TI Simplelink CC3200SF Launchpad based on TI CC3200SF chip, which is a single chip MCU (ARM Cortex M4) with 2.4GHz Wifi. This board is one of the [FreeRTOS-Qualified Hardware Platforms](https://devices.amazonaws.com/search?page=1&sv=freertos) supported by Amazon.
 ![image](https://user-images.githubusercontent.com/6676586/115983615-1bad1d80-a557-11eb-8c9f-faf7fad60f0e.png)

 ### IDE and SDK installation (TI CCS)
 Download TI CCS in this [link](http://processors.wiki.ti.com/index.php/Download_CCS%20?DCMP=slulplaunch&HQS=ep-con-lprf-slulplaunch-pr-sw-ccs-en), download and install the latest version of CCS (e.g., CCS 10.3)
 ![image](https://user-images.githubusercontent.com/6676586/115983708-a9890880-a557-11eb-875f-9d46a783cb67.png)

Make sure TI CC32xx is selected during the installation
![image](https://user-images.githubusercontent.com/6676586/115983728-cde4e500-a557-11eb-8c56-ef4f65c6c8bf.png)

Install TI CC3220 SDK in the TI CCS. Open resource explorer, search CC3220SF launchpad. Select the CC3220SF SDK, then click install (the package is installed under C:\TI\)
![image](https://user-images.githubusercontent.com/6676586/115983750-fc62c000-a557-11eb-8783-8352d6b877df.png)

### Install the latest service pack
Download and install TI [Uniflash](https://www.ti.com/tool/UNIFLASH#downloads) to install the latest service pack to the TI CC32xxSF launchpad.

On your TI CC3220SF-LAUNCHXL, place the SOP jumper on the middle set of pins (position = 1) and reset the board.
![image](https://user-images.githubusercontent.com/6676586/115983938-2e285680-a559-11eb-9ae9-3eb4f0b0e386.png)

Start Uniflash. If your CC3220SF LaunchPad board appears under Detected Devices, choose Start. If your board is not detected, choose CC3220SF-LAUNCHXL from the list of boards under New Configuration, and then choose Start Image Creator. Choose New Project.

On the Start new project page, enter a name for your project. For Device Type, choose CC3220SF. For Device Mode, choose Develop, and then choose Create Project. On the right side of the Uniflash application window, choose Connect. If the connect has problems, make sure your SOP jumpter is in 010 position

From the left column, choose Advanced, Files, and then Service Pack. Choose Browse, and then navigate to where you installed the CC3220SF SimpleLink SDK. The service pack is located at your download TI CC32xx SDK folder:  ti/simplelink_cc32xx_sdk_VERSION/tools/cc32xx_tools/servicepack-cc3x20/sp_VERSION.bin.

Choose the Burn button, and then choose Program Image (Create & Program) to install the service pack. Remember to switch the SOP jumper back to position 0 and reset the board.
![image](https://user-images.githubusercontent.com/6676586/115983968-5fa12200-a559-11eb-8eb5-a3e6731b9d0e.png)

### Download AWS FreeRTOS in the AWS IoT Console
Click the Software section of the AWS IoT Console, select FreeRTOS, then find TI CC3200SF Launchpad. You can follow Amazon's tutorial to configure the FreeRTOS and download the software package. 
![image](https://user-images.githubusercontent.com/6676586/115984032-beff3200-a559-11eb-8a69-2ec55fe38128.png)

If you created the things and credentials, you will also download a Credential folder (contains the private/public key, certificate, aws_clientcredential and aws_clientcredential_keys c header files)
![image](https://user-images.githubusercontent.com/6676586/115984147-6f6d3600-a55a-11eb-89d1-2c2e29ec2cb3.png)


### Open the AWS FreeRTOS project in TI CCS
Open TI Code Composer, and choose OK to accept the default workspace name. On the Getting Started page, choose Import Project. In Select search-directory, enter your downloaded AWS FreeRTOS project path, and select subfolders of projects/ti/cc3220_launchpad/ccs/aws_demos. The project aws_demos should be selected by default. To import the project into TI Code Composer, choose Finish.
![image](https://user-images.githubusercontent.com/6676586/115984141-654b3780-a55a-11eb-9a48-c654883ed229.png)

Only a single FreeRTOS demo application can run at a time. When we build a FreeRTOS demo project, the first demo enabled in the freertos/vendors/vendor/boards/board/aws_demos/config_files/aws_demo_config.h header file is the application that runs. The demo application in this tutorial is the coreMQTT Mutual Authentication demo defined in the freertos/demos/coreMQTT/mqtt_demo_mutual_auth.c file. It uses the coreMQTT library to connect to the AWS Cloud and then periodically publish messages to an MQTT topic hosted by the AWS IoT MQTT broker. You can also change the default application in [aws_demo_config.h](/config_files/aws_demo_config.h)
![image](https://user-images.githubusercontent.com/6676586/115984280-14880e80-a55b-11eb-9967-5db5f3155bae.png)

### Configuring the FreeRTOS demos
Open demos/include/aws_clientcredential.h. Specify values for the following constants:
#define clientcredentialMQTT_BROKER_ENDPOINT "Your AWS IoT endpoint";
#define clientcredentialIOT_THING_NAME
You also can copy the aws_clientcredential.h in your downloaded Credential folder (contains the private/public key, certificate, aws_clientcredential and aws_clientcredential_keys c header files)
![image](https://user-images.githubusercontent.com/6676586/115984345-86f8ee80-a55b-11eb-9718-4d3e6b135d80.png)

You also need to add your WiFi access point and password in the aws_clientcredential.h
![image](https://user-images.githubusercontent.com/6676586/115984429-df2ff080-a55b-11eb-817d-e27e6f936f75.png)

FreeRTOS needs the AWS IoT certificate and private keys associated with your registered thing and its permissions policies to successfully communicate with AWS IoT on behalf of your device. FreeRTOS is a C language project, and the certificate and private key must be specially formatted to be added to the project.
Open aws_clientcredential_keys in your downloaded Credential folder (contains the private/public key, certificate, aws_clientcredential and aws_clientcredential_keys c header files) and replace the aws_clientcredential_keys.h under demos/include/aws_clientcredential_keys.h. This file contains the #define keyCLIENT_CERTIFICATE_PEM term and #define keyCLIENT_PRIVATE_KEY_PEM. 

You also can generate the #define strings via the tools in tools/certificate_configuration/CertificateConfigurator.html. Under Certificate PEM file, choose the ID-certificate.pem.crt that you downloaded from the AWS IoT console. Under Private Key PEM file, choose the ID-private.pem.key that you downloaded from the AWS IoT console. Choose Generate and save aws_clientcredential_keys.h, and then save the file in demos/include. This overwrites the existing file in the directory.

The demo application is in demos/coreMQTT/mqtt_demo_mutual_auth.c, you can change the topic name and message in this file. For example, the topic name is "TIIoT2021a/example/topic"
![image](https://user-images.githubusercontent.com/6676586/115984672-31254600-a55d-11eb-9bf4-bc12ca0b1013.png)

You can now click build and debug to download the code to the hardware board. You can open the terminal window to see the output of the code. Click View->Terminal, click the first icon in the Terminal window to launch terminal.
![image](https://user-images.githubusercontent.com/6676586/115984753-9711cd80-a55d-11eb-9ee8-9f5dbcecb99a.png)

The output of the terminal will show the wifi connection and MQTT data publish
![image](https://user-images.githubusercontent.com/6676586/115984848-fbcd2800-a55d-11eb-85e1-61d99a56a821.png)

You can subscribe the MQTT topic in AWS IoT Test window, and see the received data
![image](https://user-images.githubusercontent.com/6676586/115984880-0daecb00-a55e-11eb-82dd-d5a73c4bdb77.png)

### Add additional task in FreeRTOS demos to read onboard temperature sensor and blink the LED
Add code in line 447-544 of demos/coreMQTT/mqtt_demo_mutual_auth.c, then start the two tasks in RunCoreMqttMutualAuthDemo (line 574-585)
```bash
I2C_init();
xTaskCreate(vGreenTurnOn, "GLED", 512, NULL, 2, NULL);

xMQTTTaskParameter taskParameter_temperature;
memset( taskParameter_temperature.topic, 0x00, sizeof( taskParameter_temperature.topic ) );
snprintf( taskParameter_temperature.topic, sizeof( taskParameter_temperature.topic ), "%s%s", mqttexampleTOPIC, "sensor");
xTaskCreate( prvTempSensorReaderTask,
                                   "TMP006",
                                   TEMP_TASK_STACK_SIZE,
                                   ( void * ) &taskParameter_temperature,
                                   TEMP_TASK_PRIORITY,
                                   &xTempReadHandle );
```

Add code in function prvMQTTPublishToTopic to read temperature data and put into the json string
```bash
snprintf(cDataBuffer, sizeof( cDataBuffer), "{\"message\":\" %s \",\"temp\":%f, \"count\":%d}", mqttexampleMESSAGE, temp, ( int ) xMessageNumber);
xMessageNumber ++;

/* This demo uses QoS1. */
xMQTTPublishInfo.qos = MQTTQoS1;
xMQTTPublishInfo.retain = false;
xMQTTPublishInfo.pTopicName = mqttexampleTOPIC;
xMQTTPublishInfo.topicNameLength = ( uint16_t ) strlen( mqttexampleTOPIC );
xMQTTPublishInfo.pPayload = cDataBuffer;//mqttexampleMESSAGE;
xMQTTPublishInfo.payloadLength = strlen(cDataBuffer);//strlen( mqttexampleMESSAGE );

/* Get a unique packet id. */
usPublishPacketIdentifier = MQTT_GetPacketId( pxMQTTContext );

/* Send PUBLISH packet. Packet ID is not used for a QoS1 publish. */
xResult = MQTT_Publish( pxMQTTContext, &xMQTTPublishInfo, usPublishPacketIdentifier );
```

Received publish message from AWS IoT console.
```bash
724 59456 [iot_thread] [INFO] [MQTT_MutualAuth_Demo] [mqtt_demo_mutual_auth.c:1235] 725 59456 [iot_thread] Incoming Publish Topic Name: TIIoT2021a/example/topic matches subscribed topic.Incoming Publish Message : {
                      "message": "Hello from AWS IoT console"
                                                             }
```
The subscription code is in function prvMQTTProcessIncomingPublish
```bash
static void prvMQTTProcessIncomingPublish( MQTTPublishInfo_t * pxPublishInfo )
{
    configASSERT( pxPublishInfo != NULL );

    /* Set the global for indicating that an incoming publish is received. */
    usPacketTypeReceived = MQTT_PACKET_TYPE_PUBLISH;

    /* Process incoming Publish. */
    LogInfo( ( "Incoming QoS : %d\n", pxPublishInfo->qos ) );

    /* Verify the received publish is for the we have subscribed to. */
    if( ( pxPublishInfo->topicNameLength == strlen( mqttexampleTOPIC ) ) &&
        ( 0 == strncmp( mqttexampleTOPIC, pxPublishInfo->pTopicName, pxPublishInfo->topicNameLength ) ) )
    {
        LogInfo( ( "Incoming Publish Topic Name: %.*s matches subscribed topic."
                   "Incoming Publish Message : %.*s",
                   pxPublishInfo->topicNameLength,
                   pxPublishInfo->pTopicName,
                   pxPublishInfo->payloadLength,
                   pxPublishInfo->pPayload ) );
    }
    else
    {
        LogInfo( ( "Incoming Publish Topic Name: %.*s does not match subscribed topic.",
                   pxPublishInfo->topicNameLength,
                   pxPublishInfo->pTopicName ) );
    }
}
```



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







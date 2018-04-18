#include <AFMotor.h>
#include <SPI.h>
#include <Ethernet.h>
#include <PubNub.h>
AF_Stepper Stepper2(48, 2)
;

// Some Ethernet shields have a MAC address printed on a sticker on the shield;
// fill in that address here, or choose your own at random:
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

//const int subLedPin = 8;
// declaring all of the needed keys and the channel
char pubkey[] = "pub-c-872e3808-d4fd-4211-ace7-42bbafc03208";
char subkey[] = "sub-c-2ee62116-3ff3-11e8-afae-2a65d00afee8";
char channel[] = "iotchannel";
char uuid[] = "customUUID || PubNub.generateUUID()";







void setup()
{
	Serial.begin(9600);
	Serial.println("Serial set up");
  Stepper2.setSpeed(255);
  
	while (!Ethernet.begin(mac)) {
		Serial.println("Ethernet setup error");	
	}
	Serial.println("Ethernet set up");

  //begining all of the neede components for pubnub
	PubNub.begin(pubkey, subkey);
	random_uuid();
	PubNub.set_uuid(uuid);
	Serial.println("PubNub set up");

  
   
  
}


void random_uuid() {
  randomSeed(analogRead(4) + millis() * 1024);
  snprintf(uuid, sizeof(uuid), "%04lx%04lx-%04lx-4444-9999-%04lx%04lx%04lx",
    random(0x10000), random(0x10000), random(0x10000),
    random(0x10000), random(0x10000), random(0x10000));
}


void loop()
{
	Ethernet.maintain();
	PubSubClient *client;
  client = PubNub.subscribe(channel);
  
	//Serial.println("waiting for a message (subscribe)");
  
	  if (!client) {   
		Serial.println("subscription error");     
		return;
	}
 // creating a placement for data that the arduino recieves and placing it in a string
	Serial.print("Received: "); 
   String responceString;
	 while (client->wait_for_data()) {
		char c = client->read();
    
    if(c != ']' && c != '[') {
        if(c != '"'){
          responceString += c;
        }
	   }
     
	}
  
	client->stop();
  Serial.println(responceString);
// if statment that reads the string that the arduino recieves and runs a Stepper command depending on what the string is
if (responceString == "up"){
  Stepper2.step(300, FORWARD, DOUBLE);
  Serial.println("blindsup");
   //blinds go down
}

else if (responceString == "down"){
    Stepper2.step(300, BACKWARD, DOUBLE);
    Serial.println("blindsdown");
    //blinds up

  
}

// Serial.print("String: ");
//	Serial.println(responceString);
//  MOTOR SPIN GOES HERE :s


	//delay(200);
}

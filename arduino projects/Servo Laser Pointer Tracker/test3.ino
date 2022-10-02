//Joel Toledo
int val1 = 0;
int val2 = 0;

#include <Servo.h>
String readString;
Servo myservoa, myservob;

void setup()

{

Serial.begin(9600);
myservoa.attach(10);  //the pin for the servoa control
myservob.attach(9);  //the pin for the servob control
}

void loop()

{

//waiting for input
if (Serial.available())  {
    char c = Serial.read();  //gets one byte from serial buffer
    if (c == ',') {
      if (readString.length() >1) {
        Serial.println(readString); //prints string to serial port out

        int n = readString.toInt();  //convert readString into a number

        // auto select appropriate value, copied from someone elses code.
        if(n >= 500)
        {
          Serial.print("writing Microseconds: ");
          Serial.println(n);
          if(readString.indexOf('a') >0) myservoa.writeMicroseconds(n);
          if(readString.indexOf('b') >0) myservob.writeMicroseconds(n);
        }
        else
        {   
          Serial.print("writing Angle: ");
          Serial.println(n);
          Serial.println(readString);
          if(readString.indexOf('a') >0) {myservoa.write(n);}
          if(readString.indexOf('b') >0) {myservob.write(n);}
        }
         readString=""; //clears variable for new input
      }
    } 
    else {     
      readString += c; //makes the string readString
    }
  }
}

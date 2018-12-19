// var serialport = require("serialport");
// var SerialPort = serialport.SerialPort;
// var portname = process.argv[1];
//
// var myPort = new SerialPort(portname, {
//   beaudeRate:9600,
//   parsers:serialport.parsers.readline("\r\n")
// })
//
// myPort.on('open', onOpen);
// myPort.on('data',onData);
//
// function onOpen(){
//   console.log("open connection");
// }
//
// function onData(data){
//   console.log("on Data" +data);
// }

// Node.js code, nodejsUno.js
//To install 'serialport' locally, enter the command:
//$ npm install serialport
//Otherwise, Error: Cannot find module 'serialport' will reported

var SerialPort = require("serialport");
var serialPort = SerialPort.serialPort;
var sp = new SerialPort('/dev/cu.usbmodem1411',
    {   baudRate: 9600
    });

sp.on("open", function () {
    console.log('open');


    setTimeout(function() {
        sp.write("Hello...", function(err, results) {
            console.log('Latitude ' + 40.805761 );
            console.log('Longitude ' + -73.953987);
        });
      }, 1000);

});

// var SerialPort = require('serialport');
// var serialPort = SerialPort.serialPort;
// var sp = new SerialPort("/dev/ttyACM0", {
// });

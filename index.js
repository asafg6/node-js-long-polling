
const express = require('express');
const EventEmitter = require('./event.js')
const app = express();

// create an instance of our event emitter
const eventEmitter = new EventEmitter();

app.get('/', function (req, res) {
   const id = Date.now().toString(); // milliseconds of now will be fine for our case
   var timer = null;
   const handler = function(event) {
      clearTimeout(timer);
      console.log('event', event);
      res.status(201);
      res.end( JSON.stringify(event));
   };

   eventEmitter.register(id, handler);
   timer = setTimeout(function(){ 
      console.log('timeout');
      const wasUnregistered = eventEmitter.unregister(id);
      console.log("wasUnregistered", wasUnregistered);
      if (wasUnregistered){
         res.status(200);
         res.end();
      }
   }, 5000);
});


async function sleep(ms) {
   return new Promise((resolve) => {
     setTimeout(resolve, ms);
   }).catch(function() {});
 }   


 async function main() {
   while (true) {
      const waitTimeMS = Math.floor(Math.random() * 10000);
      await sleep(waitTimeMS);
      eventEmitter.fire({time: waitTimeMS});
   }
 }
 

 var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
    main();
 })
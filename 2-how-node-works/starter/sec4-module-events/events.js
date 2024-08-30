const EventEmitter = require('events');

const http = require('http');

class Sales extends EventEmitter {
    constructor() {
        //by running super, we then get access to all the methods of the parent class.
        super();
    }
}

const myEmitter = new Sales();

//This two below is the observe the emitter
// and wait until it emits the newSale event
myEmitter.on('newSale', () => {
    console.log('There was a new sale!!')
});
myEmitter.on('newSale', () => {
    console.log('Customer name: Jonas!');
});
myEmitter.on('newSale', stock => {
    console.log(`There are ${stock} in our house!`);
});

//this emitting here is as if we were clicking on the button, and so now we have to set up these listeners
myEmitter.emit('newSale', 9); //This object that emits the events


////////////////////////////////////////////////////////////////////////////////////////////

// And what we're gonna do is to basically create a small web server, 
// and then actually listen to the event that it emits

const server = http.createServer();

//if you see .on anywhere in a node project,well, 
//then you already know that you are listening, or that the code is listening for an event
server.on('request', (req, res) => {
    console.log('Request Received!');
    console.log(req.url);
    res.end('Request Received!');
});
server.on('request', (req, res) => {
    console.log('Another request Received!😭');
});
//We can also listen to the close event.
server.on('close', () => {
    console.log('Server closed!👉👈')
});
//We start the server up by using server.listen, pass in the port, 
//the address which is localhost again
server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for the request...');
});


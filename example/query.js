var EventEmitter = require('events').EventEmitter;
var util = require('util');


var client;
client = require('../riemann').createClient();

client.on('connect', function(m){console.log("connect: "+m)});

client.on('data', function(r) {
  console.log("data result:"+util.inspect(r));
});

client.send(client.Event({
    service : 'hello_udp',
    metric  : Math.random(100)*100,
    tags    : ['bar'] }), client.udp);


var counter = 3;

for (var i = parseInt(counter); i >= 0; i--) {
    client.send(client.Event({
      service : 'hello_tcp_'+i,
      metric  : Math.random(100)*100,
      tags    : ['bar'] }), client.tcp);
};

client.send(client.Query("host"), client.tcp);


//client.disconnect();

var Schema    = require('protobuf').Schema;
var readFile  = require('fs').readFileSync;
var util      = require('util');

f = readFile(__dirname+'/proto/proto.desc');

riemannSchema = new Schema(f);
console.log(util.inspect(riemannSchema));

function _serialize(type, value) {
  return riemannSchema[type].serialize(value);
}

function _deserialize(type, value) {
  return riemannSchema[type].parse(value);
}

r = _serialize("Msg", {host: "localhost"});
console.log(r.toString());

r = _serialize("Query", {string: "host"});
console.log(r.toString());

query = riemannSchema["Query"].serialize({string: "host"});
msg = riemannSchema["Msg"].serialize({query: query});

console.log(msg.toString());

msg = riemannSchema["Msg"].serialize({query: {string: "host"}});
console.log(msg.toString());


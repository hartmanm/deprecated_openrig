//editrig PUT



function sendEdits1(rig_data)
{
var newURL = window.location.toString();
var here = newURL.indexOf("?");
var resp = newURL.slice(here + 1);
var i = 0
while (i < 200) //46
{resp = resp.replace('%22', '"'); i++;}
var respJSON = JSON.parse(resp);
var self = respJSON.self;
//var self = "/rigs/" + id
console.log( "self: " + self );
var payload = rig_data;
console.log( "payload: " + payload );
//Content-Type header("Content-type:application/json")

var id = self.slice(5);

var temp = {};
temp['self'] = self;

temp['id'] = id;
//temp['ETHASH_SPECIFIC_OC_SETTINGS'] = "[" + respJSON.ETHASH_SPECIFIC_OC_SETTINGS + "]";
//temp['X16R_SPECIFIC_OC_SETTINGS'] = "[" + respJSON.X16R_SPECIFIC_OC_SETTINGS + "]";
console.log( "temp: " + temp );

payload = JSON.parse(payload);

var result = {};
Object.keys(payload).forEach(key => result[key] = payload[key]);
Object.keys(temp).forEach(key => result[key] = temp[key]);
//for each in payload result[key] = payload[key];
//for(var key in temp) result[key] = temp[key];

result = JSON.stringify(result);

console.log( "result: " + result );
payload = result;

//var payload = rig_data;
console.log( "payload: " + payload );




var req = new XMLHttpRequest();
var url = "https://cors-anywhere.herokuapp.com/https://overlord-nv.appspot.com" + self;
//var url = "https://overlord-nv.appspot.com" + self;
req.open( "PUT", url, true );
req.setRequestHeader("Content-Type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify( req.responseText );}
else{console.log( "Error: " + req.statusText ); isgo = 0;}});
req.send( payload );
console.log( "received" );
}

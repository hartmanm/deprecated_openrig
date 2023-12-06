


function patchCustomer()
{
var self = c1id;
var user = u1id;
var bullet = {};
bullet['USER_ID'] = "test1" + u1id;
//bullet['CUSTOMER_KEY'] = c2as;
var payload = JSON.stringify(bullet);
console.log(payload);
var req = new XMLHttpRequest();
var url = overlord + self;
if(use_proxy == 1){url = cors_proxy + overlord + self;}
console.log(url);
req.open( "PATCH", url, true );
req.setRequestHeader("Content-Type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify(req.responseText);
console.log( response );
}
else{console.log("Error: " + req.statusText);}});
req.send(payload);
console.log("all is up & up");
}

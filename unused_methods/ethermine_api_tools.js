

const overlord = 'https://overlord-nv.appspot.com';
const add_rig_url = "file:///Users/apollo/Library/Mobile%20Documents/com~apple~CloudDocs/DEV/carousel/overlord-nv/frontend/add_rig/add_rig.html?";
const edit_rig_url = "file:///Users/apollo/Library/Mobile%20Documents/com~apple~CloudDocs/DEV/carousel/overlord-nv/frontend/edit_rig/edit_rig.html?";
const add_group_url = "file:///Users/apollo/Library/Mobile%20Documents/com~apple~CloudDocs/DEV/carousel/overlord-nv/frontend/add_group/add_group.html?";
const edit_group_url = "file:///Users/apollo/Library/Mobile%20Documents/com~apple~CloudDocs/DEV/carousel/overlord-nv/frontend/edit_group/edit_group.html?";
const add_basis_url = "file:///Users/apollo/Library/Mobile%20Documents/com~apple~CloudDocs/DEV/carousel/overlord-nv/frontend/basis/basis.html?";
const use_proxy = 1;
const cors_proxy = "https://cors-anywhere.herokuapp.com/";
const update_ready = 0;
const number_of_supported_coins = 4;


var number_of_groups = 0;

const profibility_url = "";
var session = "";
//patch rigs
//https://overlord-nv.appspot.com/rigs/ag1wfm92ZXJsb3JkLW52chcLEgpSaWdzX2NsYXNzGICAgIDA4YoKDA
//{"HASHRATE": "30"}

//auth find auth
// rest all patch other than hashrate requires authkey

//patch
//https://overlord-nv.appspot.com/user/ag1wfm92ZXJsb3JkLW52chYLEglDdXN0b21lcnMYgICAwPbthQsM
//{"electric_usage": "2.825", "given_kwh_cost": "0.178530512191975"}
//https://overlord-nv.appspot.com/user/ag1wfm92ZXJsb3JkLW52chYLEglDdXN0b21lcnMYgICAwPbthQsM/rigs/ag1wfm92ZXJsb3JkLW52chQLEgdPbmViYXNoGICAgIDe_pgJDA

//https://overlord-nv.appspot.com/rigs/ag1wfm92ZXJsb3JkLW52chQLEgdPbmViYXNoGICAgIDe_pgJDA

//PUT
//https://overlord-nv.appspot.com/rigs/ag1wfm92ZXJsb3JkLW52chQLEgdPbmViYXNoGICAgIDe_pgJDA
//{"COIN": "ETC"}
//{"REBOOT": "YES"}



//delete a rig // must only be last rig
//first remove from user:
//https://overlord-nv.appspot.com/user/ag1wfm92ZXJsb3JkLW52chgLEgtVc2Vyc19jbGFzcxiAgIDAzJqXCgw/rigs/ag1wfm92ZXJsb3JkLW52chcLEgpSaWdzX2NsYXNzGICAgKDGj5QKDA
//then remove entirely:
//https://overlord-nv.appspot.com/rigs/ag1wfm92ZXJsb3JkLW52chcLEgpSaWdzX2NsYXNzGICAgKDGj5QKDA




function exe(target){target.className = 'loader';}

var etc_flag = 0;
var eth_flag = 0;


var coin_base = document.getElementById("coin_base");
var coins = document.createElement("div");
coins.id = "coins";
coins.className = "grid-container0";
coin_base.appendChild(coins);
var ch1 = document.createElement("div");
ch1.id = "chart";
ch1.className = "a_etc";
coins.appendChild(ch1);

var coin1 = "ETC";
var cn1 = document.createElement("div");
cn1.innerHTML = coin1;
cn1.id = "coin1";
cn1.className = "a_etc";
//cn1.style.visibility = "hidden";
cn1.style.opacity = 0.5;
coins.appendChild(cn1);

var coin2 = "ETH";
var cn2 = document.createElement("div");
cn2.innerHTML = coin2;
cn2.id = "coin2";
cn2.className = "b_eth";
//cn2.style.visibility = "hidden";
cn2.style.opacity = 0.5;
coins.appendChild(cn2);


var hh1 = document.createElement("codezh");
hh1.id = "hashrate";
hh1.className = "a_etc";
//hh1.style.visibility = "hidden";
hh1.style.opacity = 0.5;
coins.appendChild(hh1);


var hh2 = document.createElement("codeETH");
hh2.id = "hashrate_eth";
hh2.className = "b_eth";
//hh2.style.visibility = "hidden";
hh2.style.opacity = 0.5;
coins.appendChild(hh2);


var one = document.createElement("codevv");
one.innerHTML = "<br>";
one.className = "a_etc";
coins.appendChild(one);

var one = document.createElement("codevv");
one.innerHTML = "<br>";
one.className = "b_eth";
coins.appendChild(one);

var dh1 = document.createElement("codex");
dh1.id = "dollaraday";
dh1.className = "a_etc";
//dh1.style.visibility = "hidden";
dh1.style.opacity = 0.5;
coins.appendChild(dh1);

var dh2 = document.createElement("codex");
dh2.id = "dollaraday_eth";
dh2.className = "b_eth";
//dh2.style.visibility = "hidden";
dh2.style.opacity = 0.5;
coins.appendChild(dh2);

var one = document.createElement("codevv");
one.innerHTML = "<br>";
one.className = "a_etc";
coins.appendChild(one);

var one = document.createElement("codevv");
one.innerHTML = "<br>";
one.className = "b_eth";
coins.appendChild(one);

var eh1 = document.createElement("codey");
eh1.id = "ethermine";
eh1.className = "a_etc";
//eh1.style.visibility = "hidden";
eh1.style.opacity = 0.5;
coins.appendChild(eh1);


var eh2 = document.createElement("codey");
eh2.id = "ethermine_eth";
eh2.className = "b_eth";
//eh2.style.visibility = "hidden";
eh2.style.opacity = 0.5;
coins.appendChild(eh2);

var one = document.createElement("codevv");
one.innerHTML = "<br>";
one.className = "a_etc";
coins.appendChild(one);

var one = document.createElement("codevv");
one.innerHTML = "<br>";
one.className = "b_eth";
coins.appendChild(one);


function vis_toggle(){
var element = document.getElementById("loading_status");
if (element.style.display === "none"){element.style.display = "block";}
else {element.style.display = "none";}
}

function update_status_innerHTML(innerHTML){
var status = document.getElementById("loading_status");
status.innerHTML = innerHTML;
}


function etc_vis_toggle(){
var element = document.getElementById("hashrate").innerHTML;
if(element != ""){
var one = document.getElementById("coin1"); one.style.visibility = "visible";
var one = document.getElementById("hashrate"); one.style.visibility = "visible";
var one = document.getElementById("dollaraday"); one.style.visibility = "visible";
var one = document.getElementById("ethermine"); one.style.visibility = "visible";
}
}

function eth_vis_toggle(){
var element = document.getElementById("hashrate_eth").innerHTML;
if(element != ""){
var one = document.getElementById("coin2"); one.style.visibility = "visible";
var one = document.getElementById("hashrate_eth"); one.style.visibility = "visible";
var one = document.getElementById("dollaraday_eth"); one.style.visibility = "visible";
var one = document.getElementById("ethermine_eth"); one.style.visibility = "visible";
}
}

function etc_opacity_toggle(opacity){
var element = document.getElementById("hashrate").innerHTML;
if(element != ""){
var one = document.getElementById("coin1"); one.style.opacity = opacity;
var one = document.getElementById("hashrate"); one.style.opacity = opacity;
var one = document.getElementById("dollaraday"); one.style.opacity = opacity;
var one = document.getElementById("ethermine"); one.style.opacity = opacity;
var one = document.getElementById("etc_ref_link"); one.style.opacity = opacity;
}
}

function eth_opacity_toggle(opacity){
var element = document.getElementById("hashrate_eth").innerHTML;
if(element != ""){
var one = document.getElementById("coin2"); one.style.opacity = opacity;
var one = document.getElementById("hashrate_eth"); one.style.opacity = opacity;
var one = document.getElementById("dollaraday_eth"); one.style.opacity = opacity;
var one = document.getElementById("ethermine_eth"); one.style.opacity = opacity;
var one = document.getElementById("eth_ref_link"); one.style.opacity = opacity;
}
}









function content_hide_show_toggle(element2){
var element = document.getElementById("wallet");
var eth_wallet = document.getElementById("eth_ref_link");
var etc_wallet = document.getElementById("etc_ref_link");
var rvn_wallet = document.getElementById("rvn_ref_link");
var nice_wallet = document.getElementById("nice_ref_link");
var vis = "test";
if(element != ""){
if((eth_wallet.style.visibility == "hidden") || (etc_wallet.style.visibility == "hidden") ||
(rvn_wallet.style.visibility == "hidden") || (nice_wallet.style.visibility == "hidden")){
vis = "visible";
eth_wallet.style.visibility = vis;
etc_wallet.style.visibility = vis;
rvn_wallet.style.visibility = vis;
nice_wallet.style.visibility = vis;}
else{
vis = "hidden";
eth_wallet.style.visibility = vis;
etc_wallet.style.visibility = vis;
rvn_wallet.style.visibility = vis;
nice_wallet.style.visibility = vis;}
}
}



function load_complete(){
var target = document.getElementById("load");
target.innerHTML = 'Done';
target.className = 'success';
setTimeout(function(){
target.innerHTML = 'Load Rigs';
target.className = 'form__button';
//etc_vis_toggle();
//eth_vis_toggle();
etc_opacity_toggle(1.0);
eth_opacity_toggle(1.0);
//vis_toggle();
target.blur();
}, 3000);}


function detect_coin(coin){
if(coin == "ETC"){etc_flag = 1;}
if(coin == "ETH"){eth_flag = 1;}
}

// primary function
var reload_number = 0;
var form_to_json = function form_to_json(elements){
return [].reduce.call(elements, function(data, element){
data[element.name] = element.value;
return data;}, {});};
var submit_form = function submit_form(event){
event.preventDefault();
var data = form_to_json(form.elements);
data_box = JSON.stringify(data);

//console.log("data_box: " + data_box);

getGroups(data_box);

getRigs(data_box);
if(etc_flag == 1){dashboardETC();}
if(eth_flag == 1){dashboardETH();}
// optimize pool calls rm redundant ones.

load_complete();
function refresh(){
reload_number++;
console.log("reload_number: " + reload_number);
update_hashrate(data_box);
}
var timer = setInterval(refresh, 120000);
};
var form = document.getElementsByClassName('form')[0];
var button = document.getElementById("load");
button.addEventListener("click", function(e){var target = e.target || e.srcElement; exe(target)}, false);
form.addEventListener('submit', submit_form);






function dashboardETC(){
var ex_uid = document.getElementById("USER_ID").value;
var ex_etc = document.getElementById("ETC_ADDR").value;
var ex_cid = document.getElementById("CHAT_ID").value;
var ex_aid = document.getElementById("API_ID").value;
var ex_eu = document.getElementById("ELEC_USAGE").value;
var ex_gkc = document.getElementById("G_KWH_C").value;
var itr = 0;

function polar(){
while (chart.firstChild ){chart.removeChild(chart.firstChild);}
var width = 25;
var height = 25;
var radius = Math.min(width, height);
var spacing = .09;
var formatSecond = d3.time.format("%S s");

var color = d3.scale.linear()
.range(["hsl(180,50%,50%)", "hsl(180,50%,50%)"])

var arc = d3.svg.arc()
.startAngle(0)
.endAngle(function(d){return d.value * 2 * Math.PI;})
.innerRadius(function(d){return d.index;})
.outerRadius(function(d){return (d.index + spacing) * radius;});

function number(a, b){
if (rotation_direction == 0){a = -a, b = -b;} // change direction to counter clockwise
if (rotation_direction == 1){a = +a, b = +b;} // default clockwise
return function(t){
return a * (1 - t) + b * t;};}

function switch_rotation(){
if(rotation_direction == 0){rotation_direction = 1}
else if(rotation_direction == 1){rotation_direction = 0}}

var svg = d3.select("#chart").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
if(document.getElementById("chart")){
var rotation_direction = 1;
};

var field = svg.selectAll("g")
.data(fields)
.enter().append("g");

field.append("path");
d3.transition().duration(0).each(tick);
d3.select(self.frameElement).style("height", height + "px");

function tick(){
field = field
.each(function(d) {this._value = d.value;})
.data(fields)
.each(function(d) {d.previousValue = this._value;});

field.select("path")
.transition()
.ease("elastic")
.attrTween("d", arcTween)
.style("fill", function(d) {return color(d.value);});

setTimeout(tick, 1000 - Date.now() % 1000);}

function arcTween(d){
var i = number(d.previousValue, d.value);
return function(t){
d.value = i(t);
return arc(d);};}

function fields(){
var now = new Date;
return [
{index: .3,
value: now.getSeconds() / 60}];}

function interpolateHsl(a, b) {
var i = d3.interpolateString(a, b);
return function(t) {
return d3.hsl(i(t));};}
}

polar();

function getUser(ex_uid){
var temp = {};
var req = new XMLHttpRequest();
var url = overlord + "/user/" + ex_uid;
if(use_proxy == 1){url = cors_proxy + overlord + "/user/" + ex_uid;}
req.open( "GET", url, false );
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.parse( req.responseText );
//ex_eu = document.getElementById("ELEC_USAGE").value = response['electric_usage'];
//ex_gkc = document.getElementById("G_KWH_C").value = response['given_kwh_cost'];
ex_eu = document.getElementById("ELEC_USAGE").value = "0.9";
ex_gkc = document.getElementById("G_KWH_C").value = "0.1";
}
else{console.log( "Error: " + req.statusText );}});
req.send( null );
}

getUser(ex_uid);

var chat_id = ex_cid;
var api_id = ex_aid;
var ETC_address = ex_etc;
var electric_usage = ex_eu;
var num_days = 30;
var given_kwh_cost = ex_gkc;
var monthly_elec_cost_in_dollars = (electric_usage * 24 * num_days) * given_kwh_cost;
var kwh_cost = monthly_elec_cost_in_dollars / (electric_usage * 24 * num_days);
var squelch = ["test1"];
var current_worker;
while(hashrate.firstChild ){hashrate.removeChild(hashrate.firstChild);}
while(dollaraday.firstChild ){dollaraday.removeChild(dollaraday.firstChild);}
while(ethermine.firstChild ){ethermine.removeChild(ethermine.firstChild);}

getData();
//getDollar();

function refresh(){
if(etc_flag == 0){
etc_opacity_toggle(0.5);
var divid = document.getElementById("hashrate");
while (divid.firstChild){divid.removeChild(divid.firstChild);}
var mhd2 = document.getElementById("dollaraday");
while(mhd2.firstChild){mhd2.removeChild(mhd2.firstChild);}
timer = 0;
}
if(etc_flag == 1){
etc_opacity_toggle(1.0);
itr++;
getData();
//getDollar();
console.log(itr);
}
}

var timer = setInterval(refresh, 120000);

// update
function telegram(rigNumber){
var req = new XMLHttpRequest();
var url = "https://api.telegram.org/bot" + api_id + "/sendMessage"
req.open("POST", url, true);
req.setRequestHeader("Content-type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify( req.responseText );}
else{console.log( "Error: " + req.statusText );}});
var message = rigNumber;
var payload = JSON.stringify({"chat_id":chat_id,"text":message});
req.send( payload );
}

function appendRigs(target_id, data){
var mhd2 = document.getElementById("hashrate");
if(mhd2.value == 1){
while(mhd2.firstChild){mhd2.removeChild(mhd2.firstChild);}
mhd2.value = 0;
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else
{mhd2.innerHTML = mhs + " MH/s";}
}
else if(mhd2.value == 0){
var g1 = document.createElement("codes");
g1.innerHTML = "<br><br>";
mhd2.appendChild(g1);
var i = 0;
for (i = 0; i < data.data.currentStatistics.activeWorkers; i++){
var g1 = document.createElement("codes");
g1.innerHTML = "&nbsp&nbsp&nbsp";
mhd2.appendChild(g1);
var g1 = document.createElement("codez");
var mhs = (data.data.workers[i].reportedHashrate /1000000);
mhs = mhs.toFixed(1);
g1.innerHTML = mhs + " MH/s";
mhd2.appendChild(g1);
if(((i+1) % 3 == 0) && (i > 1))
{var g1 = document.createElement("codes");
g1.innerHTML = "<br><br>";
mhd2.appendChild(g1);
}
}
mhd2.value = 1;
}
}


function appendProfit(target_id, data){
var cpf = document.getElementById("dollaraday");
var sw = cpf.value;
switch(sw){
case 0:
cpf.value = 1;
break;
case 1:
cpf.value = 2;
break;
case 2:
cpf.value = 0;
break;
}

if(cpf.value == 0)
{
var dollaramin = (data * 60 * 24 );
var elec_cost = electric_usage * 24 * kwh_cost;
var profit = dollaramin - elec_cost;
//profit = profit.toFixed(2);
//cpf.innerHTML = profit + " $/day";
var revenue = dollaramin;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/day";
}

if(cpf.value == 1)
{var dollaramonth = (data * 60 * 24 * 30);
var elec_cost = electric_usage * 24 * kwh_cost * 30;
var profit = dollaramonth - elec_cost;
//profit = profit.toFixed(2);
//cpf.innerHTML = profit + " $/month";
var revenue = dollaramonth;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/month";
}

if(cpf.value == 2)
{var dollarayear = (data * 60 * 24 * 30 * 12);
var elec_cost = electric_usage * 24 * kwh_cost * 30 * 12;
var profit = dollarayear - elec_cost;
//profit = profit.toFixed(2);
//cpf.innerHTML = profit + " $/year";
var revenue = dollarayear;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/year";
}
}

function getDollar(){
var cpf = document.getElementById("dollaraday");
if(itr == 0){cpf.value = 1;}
var etc_url = "https://api-etc.ethermine.org/miner/" + ETC_address + "/currentStats"
fetch(etc_url).then(data => data.json()).then(data => {

if(cpf.value == 0)
{
var dollaramin = (data.data.usdPerMin * 60 * 24 );
var elec_cost = electric_usage * 24 * kwh_cost;
var profit = dollaramin - elec_cost;
//profit = profit.toFixed(2);
//document.getElementById( "dollaraday_eth" ).innerHTML = profit + " $/day";
var revenue = dollaramin;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/day";
}

if(cpf.value == 1)
{var dollaramonth = (data.data.usdPerMin * 60 * 24 * 30);
var elec_cost = electric_usage * 24 * kwh_cost * 30;
var profit = dollaramonth - elec_cost;
//profit = profit.toFixed(2);
//document.getElementById( "dollaraday_eth" ).innerHTML = profit + " $/month";
var revenue = dollaramonth;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/month";
}

if(cpf.value == 2)
{var dollarayear = (data.data.usdPerMin * 60 * 24 * 30 * 12);
var elec_cost = electric_usage * 24 * kwh_cost * 30 * 12;
var profit = dollarayear - elec_cost;
//profit = profit.toFixed(2);
//document.getElementById( "dollaraday_eth" ).innerHTML = profit + " $/year";
var revenue = dollarayear;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/year";
}

if(itr == 0){
var gd = cpf.addEventListener("click", function(e){var target = e.target; appendProfit(target.id, data.data.usdPerMin)}, false);}
})}

function squelch_ban(worker, is_timeout){
var divid = document.getElementById("ethermine");
var w_element = document.getElementById(worker);
squelch.push(worker);
divid.removeChild(w_element);
if(is_timeout == 0){telegram("rig " + worker + " squelched");}
}

function getData(){
var divid = document.getElementById("ethermine");
while (divid.firstChild){divid.removeChild(divid.firstChild);}

//hashrate without workers expansion
var mhd2 = document.getElementById("hashrate");
var hashrate_url = "https://api-etc.ethermine.org/miner/" + ETC_address + "/dashboard"
fetch(hashrate_url).then(data => data.json()).then(data => {
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else{mhd2.innerHTML = mhs + " MH/s";}
})

var eth_url = "https://api-etc.ethermine.org/miner/" + ETC_address + "/workers"
fetch(eth_url).then(data => data.json()).then(data => {
var avg_time = 0;
var last = 0;
var drop_list=[0];
var i;
var x=1;
var z = data.data.length
var nr = document.getElementById("NUM_RIGS").value;
nr = parseInt(nr);
var rigcount = nr - z ;  // - num of other coin rigs??
var pmt = 1;
if(pmt > 0){
for (i = 0; i < nr; i++){
if(document.getElementById(i+1).value == "ETC"){
//  console.log(data.data[i].worker);
var mhs = (data.data[rigcount].reportedHashrate /1000000);
mhs = mhs.toFixed(1);
//ch2.id = resp.RIG_NUMBER;
//ch2.innerHTML = resp.HASHRATE;
//var output_hashrate = document.getElementById(i+1).innerHTML = mhs;
cur = ((data.data[rigcount].lastSeen + avg_time) / (x) ); //(i - last));
drop_list[rigcount]=0;
if (i === 0){cur = data.data[rigcount].lastSeen;}
if(data.data[rigcount].lastSeen == null){data.data[rigcount].lastSeen = 0.0; console.log("lastseen null converted to 0.0");}
if(((data.data[rigcount].time - data.data[rigcount].lastSeen) > 5000000000)){
drop_list[rigcount]=1;
last = last + 1;}
else{
avg_time += data.data[rigcount].lastSeen;
x += 1;}
rigcount++;
}

}
}

var total_workers = data.data.length - last;
avg_time = avg_time/total_workers;
var rigNumber = 0;
var flag = 0;
rigcount = nr - z ;  // - num of other coin rigs??
 // replace all i with rigcount??
for (i = 0; i < data.data.length; i++){
if((data.data[i].time - data.data[i].lastSeen) > 1000){
var z = avg_time - data.data[i].lastSeen;
//var n = " " + data.data[i].worker + " ";
var n = " " + data.data[i].worker + "<br><br>";
// also add + "<br><br>"; ??  //verify
var ban = 0;
for (j = 0; j < squelch.length; j++){if(data.data[i].worker == squelch[j]){ban = 1;}
}
var p = i + 1;
var timeout = 0;
var drop = 0;
var stale = 0;

if(data.data[i].reportedHashrate == null){data.data[i].reportedHashrate = 0.0; console.log("reported hashrate null converted to 0.0");}
console.log(p + " outside data.data[i].reportedHashrate: " + data.data[i].reportedHashrate);
console.log(p + " outside data.data[i].averageHashrate: " + data.data[i].averageHashrate);
console.log(p + " outside (data.data[i].reportedHashrate * 0.85): " + (data.data[i].reportedHashrate * 0.85));

console.log("drop_list[i]: " + drop_list[i]);
if(drop_list[i] === 0){console.log("exe 1st drop condition")}
if(ban == 0){console.log("exe 2nd drop condition")}
if((data.data[i].averageHashrate * 0.85) > data.data[i].reportedHashrate){console.log("exe 3rd drop condition");}

// submit drop
if((drop_list[i] === 0) && (ban == 0) && ((data.data[i].averageHashrate * 0.85) > data.data[i].reportedHashrate)){
  drop = 1;
console.log(p + " data.data[i].reportedHashrate: " + data.data[i].reportedHashrate);
console.log(p + " data.data[i].averageHashrate: " + data.data[i].averageHashrate);
console.log("is inop");

var g1 = document.createElement("codey");
g1.innerHTML = n;
g1.id = data.data[i].worker;
current_worker = data.data[i].worker;
g1.addEventListener("click", function(e){var target = e.target; squelch_ban(target.id, 0)}, true);
divid.appendChild(g1);
rigNumber = "rig " + data.data[i].worker + " is inop";
telegram(rigNumber);
flag = 1;}

if(drop_list[i] === 0){console.log("exe 1st timeout condition")}
if(ban == 0){console.log("exe 2nd timeout condition")}
if((data.data[i].averageHashrate * 0.85) < data.data[i].reportedHashrate){console.log("exe 3rd timeout condition")}

// submit timeout
if((drop_list[i] === 0) && (ban == 0) && ((data.data[i].averageHashrate * 0.85) < data.data[i].reportedHashrate)){
  timeout = 1;
console.log(p + " data.data[i].reportedHashrate: " + data.data[i].reportedHashrate);
console.log(p + " data.data[i].averageHashrate: " + data.data[i].averageHashrate);
console.log("timed out");
console.log("(data.data[i].time - data.data[i].lastSeen): " + (data.data[i].time - data.data[i].lastSeen));
var g1 = document.createElement("codet");
g1.innerHTML = n;
g1.id = data.data[i].worker;
current_worker = data.data[i].worker;
g1.addEventListener("click", function(e){var target = e.target; squelch_ban(target.id, 1)}, true);
rigNumber = "rig " + data.data[i].worker + " has timed out";
console.log(rigNumber);
divid.appendChild(g1);
flag = 1;}

if(timeout == 0){console.log("exe 1st stale condition")}
if(drop == 0){console.log("exe 2nd stale condition")}
if((((data.data[i].staleShares / (data.data[i].validShares + data.data[i].invalidShares)) * 100) > 5)){console.log("exe 3rd stale condition")}

// submit stale shares
if(timeout == 0 && drop == 0 && (((data.data[i].staleShares / (data.data[i].validShares + data.data[i].invalidShares)) * 100) > 5)){
  stale = 1;

console.log(p + " stale shares");
console.log(p + " has " + data.data[i].staleShares + " stale shares");
var g1 = document.createElement("codet");
g1.innerHTML = n;
g1.id = data.data[i].worker;
current_worker = data.data[i].worker;
g1.addEventListener("click", function(e){var target = e.target; squelch_ban(target.id, 1)}, true);
rigNumber = "rig " + data.data[i].worker + " has over 5% stale shares";
console.log(rigNumber);
divid.appendChild(g1);
flag = 1;}
}}})};
}


function dashboardETH(){
var ex_uid = document.getElementById("USER_ID").value;
var ex_eth = document.getElementById("ETH_ADDR").value;
var ex_cid = document.getElementById("CHAT_ID").value;
var ex_aid = document.getElementById("API_ID").value;
var ex_eu = document.getElementById("ELEC_USAGE").value;
var ex_gkc = document.getElementById("G_KWH_C").value;
var itr = 0;


function getUser(ex_uid){
var temp = {};
var req = new XMLHttpRequest();
var url = overlord + "/user/" + ex_uid;
if(use_proxy == 1){url = cors_proxy + overlord + "/user/" + ex_uid;}
req.open( "GET", url, false );
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.parse( req.responseText );
//ex_eu = document.getElementById("ELEC_USAGE").value = response['electric_usage'];
//ex_gkc = document.getElementById("G_KWH_C").value = response['given_kwh_cost'];
ex_eu = document.getElementById("ELEC_USAGE").value = "0.9";
ex_gkc = document.getElementById("G_KWH_C").value = "0.1";
}
else{console.log( "Error: " + req.statusText );}});
req.send( null );
}

getUser(ex_uid);

var chat_id = ex_cid;
var api_id = ex_aid;
var ETH_address = ex_eth;
var electric_usage = ex_eu;
var num_days = 30;
var given_kwh_cost = ex_gkc;
var monthly_elec_cost_in_dollars = (electric_usage * 24 * num_days) * given_kwh_cost;
var kwh_cost = monthly_elec_cost_in_dollars / (electric_usage * 24 * num_days);
var squelch = ["test1"];
var current_worker;
while(hashrate_eth.firstChild ){hashrate_eth.removeChild(hashrate_eth.firstChild);}
while(dollaraday_eth.firstChild ){dollaraday_eth.removeChild(dollaraday_eth.firstChild);}
while(ethermine_eth.firstChild ){ethermine_eth.removeChild(ethermine_eth.firstChild);}

getData();
//getDollar();

function refresh(){
if(eth_flag == 0){
eth_opacity_toggle(0.5);
var divid = document.getElementById("hashrate_eth");
while (divid.firstChild){divid.removeChild(divid.firstChild);}
var mhd2 = document.getElementById("dollaraday_eth");
while(mhd2.firstChild){mhd2.removeChild(mhd2.firstChild);}
timer = 0;
}
if(eth_flag == 1){
eth_opacity_toggle(1.0);
itr++;
getData();
//getDollar();
console.log(itr);
}
}

var timer = setInterval(refresh, 120000);

// update
function telegram(rigNumber){
var req = new XMLHttpRequest();
var url = "https://api.telegram.org/bot" + api_id + "/sendMessage"
req.open("POST", url, true);
req.setRequestHeader("Content-type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify( req.responseText );}
else{console.log( "Error: " + req.statusText );}});
var message = rigNumber;
var payload = JSON.stringify({"chat_id":chat_id,"text":message});
req.send( payload );
}

function appendRigs(target_id, data){
var mhd2 = document.getElementById("hashrate_eth");
if(mhd2.value == 1){
while(mhd2.firstChild){mhd2.removeChild(mhd2.firstChild);}
mhd2.value = 0;
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else
{mhd2.innerHTML = mhs + " MH/s";}
}
else if(mhd2.value == 0){
var g1 = document.createElement("codes");
g1.innerHTML = "<br><br>";
mhd2.appendChild(g1);
var i = 0;
for (i = 0; i < data.data.currentStatistics.activeWorkers; i++){
var g1 = document.createElement("codes");
g1.innerHTML = "&nbsp&nbsp&nbsp";
mhd2.appendChild(g1);
var g1 = document.createElement("codez");
var mhs = (data.data.workers[i].reportedHashrate /1000000);
mhs = mhs.toFixed(1);
g1.innerHTML = mhs + " MH/s";
mhd2.appendChild(g1);
if(((i+1) % 3 == 0) && (i > 1))
{var g1 = document.createElement("codes");
g1.innerHTML = "<br><br>";
mhd2.appendChild(g1);
}
}
mhd2.value = 1;
}
}


function appendProfit(target_id, data){
var cpf = document.getElementById("dollaraday_eth");
var sw = cpf.value;
switch(sw){
case 0:
cpf.value = 1;
break;
case 1:
cpf.value = 2;
break;
case 2:
cpf.value = 0;
break;
}

if(cpf.value == 0)
{
var dollaramin = (data * 60 * 24 );
var elec_cost = electric_usage * 24 * kwh_cost;
var profit = dollaramin - elec_cost;
//profit = profit.toFixed(2);
//cpf.innerHTML = profit + " $/day";
var revenue = dollaramin;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/day";
}

if(cpf.value == 1)
{var dollaramonth = (data * 60 * 24 * 30);
var elec_cost = electric_usage * 24 * kwh_cost * 30;
var profit = dollaramonth - elec_cost;
//profit = profit.toFixed(2);
//cpf.innerHTML = profit + " $/month";
var revenue = dollaramonth;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/month";
}

if(cpf.value == 2)
{var dollarayear = (data * 60 * 24 * 30 * 12);
var elec_cost = electric_usage * 24 * kwh_cost * 30 * 12;
var profit = dollarayear - elec_cost;
//profit = profit.toFixed(2);
//cpf.innerHTML = profit + " $/year";
var revenue = dollarayear;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/year";
}
}

function getDollar(){
var cpf = document.getElementById("dollaraday_eth");
if(itr == 0){cpf.value = 1;}
var eth_url = "https://api.ethermine.org/miner/" + ETH_address + "/currentStats"
fetch(eth_url).then(data => data.json()).then(data => {

if(cpf.value == 0)
{
var dollaramin = (data.data.usdPerMin * 60 * 24 );
var elec_cost = electric_usage * 24 * kwh_cost;
var profit = dollaramin - elec_cost;
//profit = profit.toFixed(2);
//document.getElementById( "dollaraday_eth" ).innerHTML = profit + " $/day";
var revenue = dollaramin;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/day";
}

if(cpf.value == 1)
{var dollaramonth = (data.data.usdPerMin * 60 * 24 * 30);
var elec_cost = electric_usage * 24 * kwh_cost * 30;
var profit = dollaramonth - elec_cost;
//profit = profit.toFixed(2);
//document.getElementById( "dollaraday_eth" ).innerHTML = profit + " $/month";
var revenue = dollaramonth;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/month";
}

if(cpf.value == 2)
{var dollarayear = (data.data.usdPerMin * 60 * 24 * 30 * 12);
var elec_cost = electric_usage * 24 * kwh_cost * 30 * 12;
var profit = dollarayear - elec_cost;
//profit = profit.toFixed(2);
//document.getElementById( "dollaraday_eth" ).innerHTML = profit + " $/year";
var revenue = dollarayear;
revenue = revenue.toFixed(2);
cpf.innerHTML = revenue + " $/year";
}

if(itr == 0){
var gd = cpf.addEventListener("click", function(e){var target = e.target; appendProfit(target.id, data.data.usdPerMin)}, false);}
})}

function squelch_ban(worker, is_timeout){
var divid = document.getElementById("ethermine_eth");
var w_element = document.getElementById(worker);
squelch.push(worker);
divid.removeChild(w_element);
if(is_timeout == 0){telegram("rig " + worker + " squelched");}
}

function getData(){
var divid = document.getElementById("ethermine_eth");
while (divid.firstChild){divid.removeChild(divid.firstChild);}

//hashrate without workers expansion
var mhd2 = document.getElementById("hashrate_eth");
var hashrate_url = "https://api.ethermine.org/miner/" + ETH_address + "/dashboard"
fetch(hashrate_url).then(data => data.json()).then(data => {
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else{mhd2.innerHTML = mhs + " MH/s";}
})

var eth_url = "https://api.ethermine.org/miner/" + ETH_address + "/workers"
fetch(eth_url).then(data => data.json()).then(data => {
var avg_time = 0;
var last = 0;
var drop_list=[0];
var i = 0;
var x=1;
var z = data.data.length
var nr = document.getElementById("NUM_RIGS").value;
nr = parseInt(nr);
var rigcount = nr - z;

var pmt = 1;
if(pmt > 0){
for (i = 0; i < nr; i++){
if(document.getElementById(i+1).value == "ETH"){
var u = i+1;
var mhs = (data.data[rigcount].reportedHashrate /1000000);
mhs = mhs.toFixed(1);
//var output_hashrate = document.getElementById(i+1).innerHTML = mhs;

cur = ((data.data[rigcount].lastSeen + avg_time) / (x) ); //(i - last));
drop_list[rigcount]=0;
if (i === 0){cur = data.data[rigcount].lastSeen;}
if(data.data[rigcount].lastSeen == null){data.data[rigcount].lastSeen = 0.0; console.log("lastseen null converted to 0.0");}
if(((data.data[rigcount].time - data.data[rigcount].lastSeen) > 5000000000)){
drop_list[rigcount]=1;
last = last + 1;}
else{
avg_time += data.data[rigcount].lastSeen;
x += 1;}
rigcount++;
}

}
}

var total_workers = data.data.length - last;
avg_time = avg_time/total_workers;
var rigNumber = 0;
var flag = 0;
rigcount = nr - z ;  // - num of other coin rigs??
// change all i to rigcount ??
for (i = 0; i < data.data.length; i++){
if((data.data[i].time - data.data[i].lastSeen) > 1000){
var z = avg_time - data.data[i].lastSeen;
var n = " " + data.data[i].worker + "<br><br>";
// also add + "<br><br>"; ??  //verify
var ban = 0;
for (j = 0; j < squelch.length; j++){if(data.data[i].worker == squelch[j]){ban = 1;}
}
var p = i + 1;
var timeout = 0;
var drop = 0;
var stale = 0;

if(data.data[i].reportedHashrate == null){data.data[i].reportedHashrate = 0.0; console.log("reported hashrate null converted to 0.0");}
console.log(p + " outside data.data[i].reportedHashrate: " + data.data[i].reportedHashrate);
console.log(p + " outside data.data[i].averageHashrate: " + data.data[i].averageHashrate);
console.log(p + " outside (data.data[i].reportedHashrate * 0.85): " + (data.data[i].reportedHashrate * 0.85));

console.log("drop_list[i]: " + drop_list[i]);
if(drop_list[i] === 0){console.log("exe 1st drop condition")}
if(ban == 0){console.log("exe 2nd drop condition")}
if((data.data[i].averageHashrate * 0.85) > data.data[i].reportedHashrate){console.log("exe 3rd drop condition");}

// submit drop
if((drop_list[i] === 0) && (ban == 0) && ((data.data[i].averageHashrate * 0.85) > data.data[i].reportedHashrate)){
  drop = 1;
console.log(p + " data.data[i].reportedHashrate: " + data.data[i].reportedHashrate);
console.log(p + " data.data[i].averageHashrate: " + data.data[i].averageHashrate);
console.log("is inop");

var g1 = document.createElement("codey");
g1.innerHTML = n;
g1.id = data.data[i].worker;
current_worker = data.data[i].worker;
g1.addEventListener("click", function(e){var target = e.target; squelch_ban(target.id, 0)}, true);
divid.appendChild(g1);
rigNumber = "rig " + data.data[i].worker + " is inop";
telegram(rigNumber);
flag = 1;}

if(drop_list[i] === 0){console.log("exe 1st timeout condition")}
if(ban == 0){console.log("exe 2nd timeout condition")}
if((data.data[i].averageHashrate * 0.85) < data.data[i].reportedHashrate){console.log("exe 3rd timeout condition")}

// submit timeout
if((drop_list[i] === 0) && (ban == 0) && ((data.data[i].averageHashrate * 0.85) < data.data[i].reportedHashrate)){
  timeout = 1;
console.log(p + " data.data[i].reportedHashrate: " + data.data[i].reportedHashrate);
console.log(p + " data.data[i].averageHashrate: " + data.data[i].averageHashrate);
console.log("timed out");
console.log("(data.data[i].time - data.data[i].lastSeen): " + (data.data[i].time - data.data[i].lastSeen));
var g1 = document.createElement("codet");
g1.innerHTML = n;
g1.id = data.data[i].worker;
current_worker = data.data[i].worker;
g1.addEventListener("click", function(e){var target = e.target; squelch_ban(target.id, 1)}, true);
rigNumber = "rig " + data.data[i].worker + " has timed out";
console.log(rigNumber);
divid.appendChild(g1);
flag = 1;}

if(timeout == 0){console.log("exe 1st stale condition")}
if(drop == 0){console.log("exe 2nd stale condition")}
if((((data.data[i].staleShares / (data.data[i].validShares + data.data[i].invalidShares)) * 100) > 5)){console.log("exe 3rd stale condition")}

// submit stale shares
if(timeout == 0 && drop == 0 && (((data.data[i].staleShares / (data.data[i].validShares + data.data[i].invalidShares)) * 100) > 5)){
  stale = 1;

console.log(p + " stale shares");
console.log(p + " has " + data.data[i].staleShares + " stale shares");
var g1 = document.createElement("codet");
g1.innerHTML = n;
g1.id = data.data[i].worker;
current_worker = data.data[i].worker;
g1.addEventListener("click", function(e){var target = e.target; squelch_ban(target.id, 1)}, true);
rigNumber = "rig " + data.data[i].worker + " has over 5% stale shares";
console.log(rigNumber);
divid.appendChild(g1);
flag = 1;}
}}})};
}

/*
# Copyright (c) 2018 Michael Neill Hartman. All rights reserved.
# mnh_license@proton.me
# https://github.com/hartmanm
# oros / overlord (previously openrig.net)
*/

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


var coin_switch_count = 0;
var compared_text = "test";
var last_coin = "test";
// coin selection change
$(document).on("click",  "#coin_selector", function(){
//if($(document).id == "coin_selector"){
var original_text = $(this).text();
compared_text = original_text.toUpperCase();
var new_input = $("<input class=\"text_editor\"/>");
new_input.val(original_text);
$(this).replaceWith(new_input);
new_input.focus();
//}
//if(original_text === cur_bill.current_bill){active_edit = cur_bill.current_bill; key_name = "current_bill"};
});
$(document).on("blur", ".text_editor", function(){
var global_coin_selection = document.getElementById(1).value;
var new_input = $(this).val();
//console.log("global_coin_selection: " + global_coin_selection);
last_coin = global_coin_selection;
var uppercase_newinput = new_input.toUpperCase();
new_input = uppercase_newinput;
//console.log(new_input);
if(new_input != compared_text && new_input != "" && (new_input == "ETH" || new_input == "ETC" || new_input == "RVN"
|| new_input == "X16R") ){  //&& new_input != last_coin
//console.log(new_input);
//console.log(compared_text);
var updated_text = $("<code5 class=\"d\" id=\"coin_selector\">");
updated_text.text(new_input);
$(this).replaceWith(updated_text);
var new_coin_selection = new_input;
etc_flag = 0;
eth_flag = 0;
//console.log(new_coin_selection);
global_coin_change(data_box, new_coin_selection);
detect_coin(new_coin_selection);
if(etc_flag == 1){dashboardETC();}
if(eth_flag == 1){dashboardETH();}
console.log(last_coin);
last_coin = new_coin_selection;
console.log(last_coin);
coin_switch_count++;
console.log(coin_switch_count);
}
});







// update individual rig hashrates
function update_hashrate(form_data){
var payload = JSON.parse(form_data);
var user_id = payload.id;
var ex_uid2 = document.getElementById("USER_ID").value = user_id;
var req = new XMLHttpRequest();
var url = overlord + "/user/" + user_id + "/rigs";
if(use_proxy == 1){url = cors_proxy + overlord + "/user/" + user_id + "/rigs";}
req.open("GET", url, false);
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){
var response = JSON.parse(req.responseText);
var numrigs = response.length;
var ex_numrigs = document.getElementById("NUM_RIGS").value = numrigs;
for (i = 0; i < response.length; i++){
var num = response[i];
var req2 = new XMLHttpRequest();
var rig_url = overlord + num;
if(use_proxy == 1){rig_url = cors_proxy + overlord + num;}
req2.open("GET", rig_url, false);
req2.addEventListener( "load",function(){
if( req2.status >= 200 && req2.status < 403 ){
var resp2 = JSON.parse(req2.responseText);

//new hashrate code:
var target_rig = document.getElementById(i+1);

// check to see if cycle changed? if cycle == lastcycle??  then update last cycle??  or make cycle an array of x length?

target_rig.innerHTML = resp2.HASHRATE;

}else{console.log( "Error: " + req2.statusText );}});req2.send( null );}
}else{console.log( "Error: " + req.statusText );}});req.send( null );}




function global_coin_change(form_data, new_coin_selection){
var payload = JSON.parse(form_data);
var user_id = payload.id;
var ex_uid2 = document.getElementById("USER_ID").value = user_id;
var req = new XMLHttpRequest();
var url = overlord + "/user/" + user_id + "/rigs";
if(use_proxy == 1){url = cors_proxy + overlord + "/user/" + user_id + "/rigs";}
req.open("GET", url, false);
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){
var response = JSON.parse(req.responseText);
var numrigs = response.length;
var ex_numrigs = document.getElementById("NUM_RIGS").value = numrigs;
for (i = 0; i < response.length; i++){
var num = response[i];
var req2 = new XMLHttpRequest();
var rig_url = overlord + num;
if(use_proxy == 1){rig_url = cors_proxy + overlord + num;}
req2.open("GET", rig_url, false);
req2.addEventListener( "load",function(){
if( req2.status >= 200 && req2.status < 403 ){
var resp2 = JSON.parse(req2.responseText);

//patch rigs
//https://overlord-nv.appspot.com/rigs/ag1wfm92ZXJsb3JkLW52chcLEgpSaWdzX2NsYXNzGICAgIDA4YoKDA
//{"COIN": "30"}
function sendEdits(new_coin_selection, resp2)
{
var self = resp2.self;
var bullet = {};
bullet['COIN'] = new_coin_selection;
var payload = JSON.stringify(bullet);
//console.log(payload);
var req = new XMLHttpRequest();
var url = overlord + self;
if(use_proxy == 1){url = cors_proxy + overlord + self;}
req.open( "PATCH", url, true );
req.setRequestHeader("Content-Type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify(req.responseText);}
else{console.log("Error: " + req.statusText);}});
req.send(payload);
console.log("received");
}
//if(coin_switch_count == 0){var target = resp2.RIG_NUMBER + resp2.COIN;}
//if(coin_switch_count > 0){var target = resp2.RIG_NUMBER + last_coin;}
//if(coin_switch_count > 0){var target = resp2.RIG_NUMBER + resp2.COIN;}
var target = resp2.RIG_NUMBER + resp2.COIN;
var target_rig = document.getElementById(target);
target_rig.id = resp2.RIG_NUMBER + new_coin_selection;
target_rig.innerHTML = new_coin_selection;
sendEdits(new_coin_selection, resp2);


}else{console.log( "Error: " + req2.statusText );}});req2.send( null );}
}else{console.log( "Error: " + req.statusText );}});req.send( null );}






function download(content, fileName, contentType) {
var a = document.createElement("a");
var file = new Blob([content], {type: contentType});
a.href = URL.createObjectURL(file);
a.download = fileName;
a.click();
}


function sendEdits(rig_data){
var newURL = window.location.toString();
var here = newURL.indexOf("?");
var resp = newURL.slice(here + 1);
var i = 0
while (i < 200)
{resp = resp.replace('%22', '"'); i++;}
}


function renull_reboot(){
//console.log(rn);
var rignum = rn.shift();
//console.log(rignum);
var element = reboot_element[rignum];
var e = reboot_trans[rignum];
//console.log(e);
var resp = JSON.parse(e);
var self = resp.self;
var payload = resp;
var id = self.slice(5);
var temp = {};
temp['self'] = self;
temp['id'] = id;
temp['REBOOT'] = "1";
var result = {};
Object.keys(payload).forEach(key => result[key] = payload[key]);
Object.keys(temp).forEach(key => result[key] = temp[key]);
result = JSON.stringify(result);
payload = result;
var req = new XMLHttpRequest();
var url = overlord + self;
if(use_proxy == 1){url = cors_proxy + overlord + self;}
req.open( "PUT", url, true );
req.setRequestHeader("Content-Type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify( req.responseText );}
else{console.log( "Error: " + req.statusText ); isgo = 0;}});
req.send( payload );
console.log(payload);
//console.log(payload + "reboot complete");
element.innerHTML = "reboot";
}

function shell(){setTimeout(renull_reboot, 130000);}
var reboot_trans = [];
var reboot_element = [];
var rn = [];

function send_reboot(e){
var element = e.value;
e.innerHTML = "...";
//console.log(element);
var resp = JSON.parse(element);
var self = resp.self;
var rignum = parseInt(resp.RIG_NUMBER);
var payload = resp;
var id = self.slice(5);
var temp = {};
temp['self'] = self;
temp['id'] = id;
temp['REBOOT'] = "YES";
var target_rig = document.getElementById(rignum);
target_rig.innerHTML = "...";
temp['HASHRATE'] = "...";
var result = {};
Object.keys(payload).forEach(key => result[key] = payload[key]);
Object.keys(temp).forEach(key => result[key] = temp[key]);
result = JSON.stringify(result);
payload = result;
var req = new XMLHttpRequest();
var url = overlord + self;
if(use_proxy == 1){url = cors_proxy + overlord + self;}
req.open( "PUT", url, true );
req.setRequestHeader("Content-Type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify( req.responseText );}
else{console.log( "Error: " + req.statusText ); isgo = 0;}});
req.send(payload);
reboot_trans[rignum] = payload;
reboot_element[rignum] = e;
rn.push(rignum);
console.log(payload);
shell();
}








// update below
function renull_update(){
//console.log(up);
var rignum = up.shift();
//console.log(rignum);
var element = update_element[rignum];
var e = update_trans[rignum];
//console.log(e);
var resp = JSON.parse(e);
var self = resp.self;
var payload = resp;
var id = self.slice(5);
var temp = {};
temp['self'] = self;
temp['id'] = id;
temp['UPDATE'] = "1";
var result = {};
Object.keys(payload).forEach(key => result[key] = payload[key]);
Object.keys(temp).forEach(key => result[key] = temp[key]);
result = JSON.stringify(result);
payload = result;
var req = new XMLHttpRequest();
var url = overlord + self;
if(use_proxy == 1){url = cors_proxy + overlord + self;}
req.open( "PUT", url, true );
req.setRequestHeader("Content-Type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify( req.responseText );}
else{console.log( "Error: " + req.statusText ); isgo = 0;}});
req.send( payload );
console.log(payload);
//console.log(payload + "reboot complete");
element.innerHTML = "update";
// set opactiy to .5 disable click function
}

function up_shell(){setTimeout(renull_update, 200000);}
var update_trans = [];
var update_element = [];
var up = [];

function send_update(e){
var element = e.value;
e.innerHTML = "...";
//console.log(element);
var resp = JSON.parse(element);
var self = resp.self;
var rignum = parseInt(resp.RIG_NUMBER);
var payload = resp;
var id = self.slice(5);
var temp = {};
temp['self'] = self;
temp['id'] = id;
temp['UPDATE'] = "YES";
var result = {};
Object.keys(payload).forEach(key => result[key] = payload[key]);
Object.keys(temp).forEach(key => result[key] = temp[key]);
result = JSON.stringify(result);
payload = result;
var req = new XMLHttpRequest();
var url = overlord + self;
if(use_proxy == 1){url = cors_proxy + overlord + self;}
req.open( "PUT", url, true );
req.setRequestHeader("Content-Type", "application/json");
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){var response = JSON.stringify( req.responseText );}
else{console.log( "Error: " + req.statusText ); isgo = 0;}});
req.send(payload);
update_trans[rignum] = payload;
update_element[rignum] = e;
up.push(rignum);
console.log(payload);
up_shell();
}




// add groups section
function addGroups(resp, cur, form_data){
var divid = document.getElementById("GROUPS");
var base = cur + 1;

if(cur === 0){while (divid.firstChild ){divid.removeChild(divid.firstChild);}}
if(base == 1){
var grid_basis = document.createElement("gridBASIS");
grid_basis.className = "grid-containerBASIS";
divid.appendChild(grid_basis);

var grid_group = document.createElement("gridGROUP");
grid_group.className = "grid-containerGROUP";
divid.appendChild(grid_group);

var plus_basis = document.createElement("codeL");
plus_basis.setAttribute("id", "plus_basis");
plus_basis.className = "z";
grid_basis.appendChild(plus_basis);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_basis_url + toString;
var plus_basis = "<a href=" + url + ">BASIS</a>";
var curNG = document.getElementById("plus_basis").innerHTML = plus_basis;
var one = document.createElement("codevv");
one.innerHTML = "<br>";
grid_basis.appendChild(one);


var plus_group = document.createElement("codeL");
plus_group.setAttribute("id", "plus_group");
plus_group.className = "z";
grid_group.appendChild(plus_group);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_group_url + toString;
var plus_group = "<a href=" + url + ">+Group</a>";
var curNG = document.getElementById("plus_group").innerHTML = plus_group;

var fs = document.createElement("code5");
fs.innerHTML = "MH/s";
fs.className = "y";
grid_group.appendChild(fs);

var rn = document.createElement("code5");
rn.innerHTML = "GN";
rn.className = "x";
grid_group.appendChild(rn);

var cn = document.createElement("code5");
cn.innerHTML = "CN";
cn.className = "w";
cn.id = "group_coin_selector";
grid_group.appendChild(cn);
}

var mydivs = [];
mydivs[base] = document.createElement("grid2");
var curg2 = mydivs[base];
curg2.className = "grid-containerGROUPS";
divid.appendChild(curg2);

var myedits = [];
myedits[base] = document.createElement("codeL");
var edits = myedits[base];
var payload = JSON.parse(form_data);
var user_id = payload.id;
var trans = {};
trans['self'] = "/user/" + user_id;
trans['GROUP_NUMBER'] = base;
//console.log(trans['GROUP_NUMBER']);
var toString = JSON.stringify(trans);
var url = edit_group_url + toString;
var edit_group = "<a href=" + url + ">Edit</a>";
edits.innerHTML = edit_group;
edits.className = "z";
curg2.appendChild(edits);

var resp = JSON.parse(resp);

var mych2 = [];
if(base % 2 == 1){mych2[base] = document.createElement("code2");}
if(base % 2 == 0){mych2[base] = document.createElement("code4");}
var ch2 = mych2[base];
ch2.value = resp.COIN;
ch2.id = resp.GROUP_NUMBER;  // conflicts with rig 1 hashrate
ch2.innerHTML = "...";
ch2.className = "y";
curg2.appendChild(ch2);

var mygn = [];
if(base % 2 == 1){mygn[base] = document.createElement("code2");}
if(base % 2 == 0){mygn[base] = document.createElement("code4");}
var gn2 = mygn[base];
gn2.innerHTML = base;
gn2.className = "x";
curg2.appendChild(gn2);

var mycn2 = [];
if(base % 2 == 1){mycn2[base] = document.createElement("code2");}
if(base % 2 == 0){mycn2[base] = document.createElement("code4");}
var cn2 = mycn2[base];
cn2.id = resp.GROUP_NUMBER + resp.COIN;
cn2.innerHTML = resp.COIN;
cn2.className = "w";
curg2.appendChild(cn2);


var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
user['GROUP_NUMBER'] = base + 1;
//console.log(user['GROUP_NUMBER']);
var toString = JSON.stringify(user);
var url = add_group_url + toString;
if(base + 1 <= 3){var plus_group = "<a href=" + url + ">+Group</a>";}
if(base + 1 > 3){var plus_group = "+Group";}
var curNR = document.getElementById("plus_group").innerHTML = plus_group;
}




function addGroupZ(resp, cur, form_data){
var divid = document.getElementById("GROUPS");
var base = cur;

if(cur === 0){while (divid.firstChild ){divid.removeChild(divid.firstChild);}}

var grid_basis = document.createElement("gridBASIS");
grid_basis.className = "grid-containerBASIS";
divid.appendChild(grid_basis);

var grid_group = document.createElement("gridGROUP");
grid_group.className = "grid-containerGROUP";
divid.appendChild(grid_group);


var resp = JSON.parse(resp);
if(resp == null){
resp = {};
resp['BASIS'] = "";}
console.log(resp.BASIS);

var plus_basis = document.createElement("codeL");
plus_basis.setAttribute("id", "plus_basis");
plus_basis.className = "z";
grid_basis.appendChild(plus_basis);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_basis_url + toString;
var plus_basis = "<a href=" + url + ">BASIS</a>";
if(resp.BASIS == ""){var plus_basis = "<a href=" + url + ">BASIS START HERE</a>";}
var curNG = document.getElementById("plus_basis").innerHTML = plus_basis;
var one = document.createElement("codevv");
one.innerHTML = "<br>";
grid_basis.appendChild(one);

var plus_group = document.createElement("codeL");
plus_group.setAttribute("id", "plus_group");
plus_group.className = "z";
grid_group.appendChild(plus_group);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_group_url + toString;
var plus_group = "<a href=" + url + ">+Group</a>";
var curNG = document.getElementById("plus_group").innerHTML = plus_group;

var fs = document.createElement("code5");
fs.innerHTML = "MH/s";
fs.className = "y";
grid_group.appendChild(fs);

var rn = document.createElement("code5");
rn.innerHTML = "GN";
rn.className = "x";
grid_group.appendChild(rn);

var cn = document.createElement("code5");
cn.innerHTML = "CN";
cn.className = "w";
cn.id = "group_coin_selector";
grid_group.appendChild(cn);

var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
user['GROUP_NUMBER'] = base + 1;
var toString = JSON.stringify(user);
var url = add_group_url + toString;
var plus_group = "<a href=" + url + ">+Group</a>";
var curNR = document.getElementById("plus_group").innerHTML = plus_group;
}


function getUser(ex_uid){
var temp = {};
var req = new XMLHttpRequest();
var url = overlord + "/user/" + ex_uid;
if(use_proxy == 1){url = cors_proxy + overlord + "/user/" + ex_uid;}
req.open( "GET", url, false );
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){
var response = JSON.parse( req.responseText );
basis = response['basis'];
group1 = response['group1'];
group2 = response['group2'];
group3 = response['group3'];
if(group3 != ""  || group3 != null){number_of_groups = 3;}
if(group3 == "" || group3 == null){number_of_groups = 2;}
if(group2 == "" || group2 == null){number_of_groups = 1;}
if(group1 == "" || group3 == null){number_of_groups = 0;}
//console.log(number_of_groups);
}
else{console.log( "Error: " + req.statusText );}});
req.send(null);
}

var basis = {};
var group1 = {};
var group2 = {};
var group3 = {};
function getGroups(form_data){
var payload = JSON.parse(form_data);
var user_id = payload.id;
var auth = payload.auth;
//console.log(auth);
// use auth for auth header
var ex_uid = document.getElementById("USER_ID").value = user_id;

//console.log(ex_uid);

getUser(ex_uid);
var i = 0;
var resp = {};
var z = number_of_groups;
if(number_of_groups === 0){addGroupZ(basis,0,form_data);}
if(number_of_groups > 0){
//addGroups(resp,0,form_data);
for(i = 0; i < z; i++){
if(i == 0){resp = group1;}
if(i == 1){resp = group2;}
if(i == 2){resp = group3;}
//console.log(i);
//console.log("number_of_groups: " + number_of_groups);
//console.log("outside: " + resp);
addGroups(resp,i,form_data);
}
}
}










// add rigs section
function addDiv(resp, cur, form_data){
var divid = document.getElementById("RIGS");
var base = cur + 1;

if(cur === 0){while (divid.firstChild ){divid.removeChild(divid.firstChild);}}
var ex_etc2 = document.getElementById("ETC_ADDR").value = resp.ETC_ADDRESS;
var ex_cid2 = document.getElementById("CHAT_ID").value = resp.CHATID;
var ex_aid2 = document.getElementById("API_ID").value = resp.APIKEY;
var ex_etc2 = document.getElementById("ETH_ADDR").value = resp.ETH_ADDRESS;
var ex_uid = document.getElementById("USER_ID").value = resp.USER_ID;
var rvn_recv_address = document.getElementById("RVN_ADDR").value = resp.RVN_ADDRESS;

if(base == 1){


var g1 = document.createElement("grid1");
g1.className = "grid-container";
divid.appendChild(g1);

//var grid_basis = document.createElement("gridBASIS");
//grid_basis.className = "grid-containerBASIS";
//divid.appendChild(grid_basis);

//var grid_group = document.createElement("gridGROUP");
//grid_group.className = "grid-containerGROUP";
//divid.appendChild(grid_group);

var curg = document.createElement("grid3");
curg.className = "grid-container3";
divid.appendChild(curg);

/*
var plus_basis = document.createElement("codeL");
plus_basis.setAttribute("id", "plus_basis");
plus_basis.className = "z";
grid_basis.appendChild(plus_basis);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_basis_url + toString;
var plus_basis = "<a href=" + url + ">BASIS</a>";
var curNG = document.getElementById("plus_basis").innerHTML = plus_basis;
var one = document.createElement("codevv");
one.innerHTML = "<br>";
grid_basis.appendChild(one);


var plus_group = document.createElement("codeL");
plus_group.setAttribute("id", "plus_group");
plus_group.className = "z";
grid_group.appendChild(plus_group);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_group_url + toString;
var plus_group = "<a href=" + url + ">+Group</a>";
var curNG = document.getElementById("plus_group").innerHTML = plus_group;
var one = document.createElement("codevv");
one.innerHTML = "<br>";
curg.appendChild(one);
*/

var plus = document.createElement("codeL");
plus.setAttribute("id", "plus_rig");
plus.className = "a";
curg.appendChild(plus);

var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_rig_url + toString;
var plus_rig = "<a href=" + url + ">+Rig</a>";
var curNR = document.getElementById("plus_rig").innerHTML = plus_rig;


var wallet = document.createElement("code5");
wallet.id = "wallet";
wallet.innerHTML = "Pool Links";
wallet.addEventListener("click", function(e){var target = e.target || e.srcElement; content_hide_show_toggle(target)}, false);
g1.appendChild(wallet);

var one = document.createElement("codevv");
one.innerHTML = "<br>";
wallet.appendChild(one);

var eth = document.createElement("codeETH");
function execute_ethermine(element)
{
var url = overlord + "/signup";var url = "https://ethermine.org/miners/" + resp.ETH_ADDRESS + "/dashboard";
window.open(url);
}
var ethermine = resp.ETH_ADDRESS;
eth.innerHTML = ethermine;
eth.id = "eth_ref_link";
eth.style.visibility = "hidden";
eth.addEventListener("click", function(e){var target = e.target || e.srcElement; execute_ethermine(target)}, false);
wallet.appendChild(eth);

var one = document.createElement("codevv");
one.innerHTML = "<br><br>";
wallet.appendChild(one);

var etc = document.createElement("codeETC");
function execute_ethermineETC(element)
{
var url = "https://etc.ethermine.org/miners/" + resp.ETC_ADDRESS + "/dashboard";
window.open(url);
}
var ethermine = resp.ETC_ADDRESS;
etc.innerHTML = ethermine;
etc.id = "etc_ref_link";
etc.style.visibility = "hidden";
etc.addEventListener("click", function(e){var target = e.target || e.srcElement; execute_ethermineETC(target)}, false);
wallet.appendChild(etc);

var one = document.createElement("codevv");
one.innerHTML = "<br><br>";
wallet.appendChild(one);

var rvn = document.createElement("codeRVN");
function execute_minermoreRVN(element)
{
var url = "https://minermore.com/wallet/" + resp.RVN_ADDRESS + "/RVN/";
window.open(url);
}
rvn.innerHTML = resp.RVN_ADDRESS;
rvn.id = "rvn_ref_link";
rvn.style.visibility = "hidden";
rvn.addEventListener("click", function(e){var target = e.target || e.srcElement; execute_minermoreRVN(target)}, false);
wallet.appendChild(rvn);

var one = document.createElement("codevv");
one.innerHTML = "<br><br>";
wallet.appendChild(one);

var nice = document.createElement("codeNICE");
function execute_nicehash(element)
{
var url = "https://www.nicehash.com/miner/" + resp.NICE_BTC_ADDRESS;
window.open(url);
}
nice.innerHTML = resp.NICE_BTC_ADDRESS;
nice.id = "nice_ref_link";
nice.style.visibility = "hidden";
nice.addEventListener("click", function(e){var target = e.target || e.srcElement; execute_nicehash(target)}, false);
wallet.appendChild(nice);

var fs = document.createElement("code5");
fs.innerHTML = "MH/s";
fs.className = "b";
curg.appendChild(fs);

var rn = document.createElement("code5");
rn.innerHTML = "RN";
rn.className = "c";
curg.appendChild(rn);

var cn = document.createElement("code5");
cn.innerHTML = "CN";
cn.className = "d";
cn.id = "coin_selector";
curg.appendChild(cn);

var gn = document.createElement("code5");
gn.innerHTML = "GN";
gn.className = "e";
curg.appendChild(gn);

var pw = document.createElement("code5");
pw.innerHTML = "PL";
pw.className = "f";
curg.appendChild(pw);

var co = document.createElement("code5");
co.innerHTML = "CC";
co.className = "g";
curg.appendChild(co);

var mo = document.createElement("code5");
mo.innerHTML = "MC";
mo.className = "h";
curg.appendChild(mo);

var fs = document.createElement("code5");
fs.innerHTML = "FS";
fs.className = "i";
curg.appendChild(fs);

var eh = document.createElement("code5");
eh.innerHTML = "EH";
eh.className = "j";
curg.appendChild(eh);

var rb = document.createElement("code5");
rb.innerHTML = "RB";
rb.className = "k";
curg.appendChild(rb);

var fs = document.createElement("code5");
fs.innerHTML = "DL";
fs.className = "l";
curg.appendChild(fs);

var up = document.createElement("code5");
up.innerHTML = "UP";
up.className = "m";
curg.appendChild(up);

}

var mydivs = [];
mydivs[base] = document.createElement("grid2");
var curg2 = mydivs[base];
curg2.className = "grid-container2";
divid.appendChild(curg2);

var myedits = [];
myedits[base] = document.createElement("codeL");
var edits = myedits[base];
var toString = JSON.stringify(resp);
var url = edit_rig_url + toString;
var edit_rig = "<a href=" + url + ">Edit</a>";
edits.innerHTML = edit_rig;
edits.className = "a";
curg2.appendChild(edits);

detect_coin(resp.COIN);

var mych2 = [];
if(base % 2 == 1){mych2[base] = document.createElement("code2");}
if(base % 2 == 0){mych2[base] = document.createElement("code4");}
var ch2 = mych2[base];
if(resp.COIN == "ETC"){ch2.value = "ETC";}
if(resp.COIN == "ETH"){ch2.value = "ETH";}
ch2.id = resp.RIG_NUMBER;
ch2.innerHTML = resp.HASHRATE;
ch2.className = "b";
curg2.appendChild(ch2);

var myrn = [];
if(base % 2 == 1){myrn[base] = document.createElement("code2");}
if(base % 2 == 0){myrn[base] = document.createElement("code4");}
var rn2 = myrn[base];
rn2.innerHTML = resp.RIG_NUMBER;
rn2.className = "c";
curg2.appendChild(rn2);

var mycn2 = [];
if(base % 2 == 1){mycn2[base] = document.createElement("code2");}
if(base % 2 == 0){mycn2[base] = document.createElement("code4");}
var cn2 = mycn2[base];
cn2.id = resp.RIG_NUMBER + resp.COIN;
cn2.innerHTML = resp.COIN;
cn2.className = "d";
curg2.appendChild(cn2);

var mygn = [];
if(base % 2 == 1){mygn[base] = document.createElement("code2");}
if(base % 2 == 0){mygn[base] = document.createElement("code4");}
var gn2 = mygn[base];
gn2.innerHTML = resp.GROUP_NUMBER;
gn2.className = "e";
curg2.appendChild(gn2);

var mypw2 = [];
if(base % 2 == 1){mypw2[base] = document.createElement("code2");}
if(base % 2 == 0){mypw2[base] = document.createElement("code4");}
var pw2 = mypw2[base];
pw2.innerHTML = resp.POWERLIMIT_WATTS;
pw2.className = "f";
curg2.appendChild(pw2);
//pw2.contentEditable = "true";
//pw2.setAttribute("contenteditable", "true");

var myco2 = [];
if(base % 2 == 1){myco2[base] = document.createElement("code2");}
if(base % 2 == 0){myco2[base] = document.createElement("code4");}
var co2 = myco2[base];
co2.innerHTML = resp.CORE_OVERCLOCK;
co2.className = "g";
curg2.appendChild(co2);
//co2.contentEditable = "true";
//co2.setAttribute("contenteditable", "true");

var mymo2 = [];
if(base % 2 == 1){mymo2[base] = document.createElement("code2");}
if(base % 2 == 0){mymo2[base] = document.createElement("code4");}
var mo2 = mymo2[base];
mo2.innerHTML = resp.MEMORY_OVERCLOCK;
mo2.className = "h";
curg2.appendChild(mo2);
//mo2.contentEditable = "true";
//mo2.setAttribute("contenteditable", "true");

var myfs2 = [];
if(base % 2 == 1){myfs2[base] = document.createElement("code2");}
if(base % 2 == 0){myfs2[base] = document.createElement("code4");}
var fs2 = myfs2[base];
fs2.innerHTML = resp.FAN_SPEED;
fs2.className = "i";
curg2.appendChild(fs2);

var myeh2 = [];
if(base % 2 == 1){myeh2[base] = document.createElement("code2");}
if(base % 2 == 0){myeh2[base] = document.createElement("code4");}
var eh2 = myeh2[base];
eh2.innerHTML = resp.EXPECTED_HASHRATE;
eh2.className = "j";
curg2.appendChild(eh2);

var myrb2 = [];
if(base % 2 == 1){myrb2[base] = document.createElement("codebc");}
if(base % 2 == 0){myrb2[base] = document.createElement("codebc");}
var rb2 = myrb2[base];
rb2.innerHTML = "reboot";
rb2.className = "k";
rb2.value = JSON.stringify(resp);
rb2.addEventListener("click", function(e){var target = e.target || e.srcElement; send_reboot(target)}, false);
curg2.appendChild(rb2);


var my1b = [];
if(base % 2 == 1){my1b[base] = document.createElement("codedl");}
if(base % 2 == 0){my1b[base] = document.createElement("codedl");}
var b12 = my1b[base];
var output_0rig = {};
output_0rig['USER_ID'] = resp.USER_ID;
output_0rig['RIG_NUMBER'] = resp.RIG_NUMBER;
var outbash = JSON.stringify(output_0rig);
var filename = '0rig';
b12.addEventListener("click", function(e){var target = e.target || e.srcElement; download(outbash, filename, 'plain')}, false);
//b12.addEventListener("click", function(e){var target = e.target || e.srcElement; generate1bash(toString, filename, 'plain;charset=utf-8')}, false);
b12.innerHTML = "0rig";
b12.className = "l";
curg2.appendChild(b12);

var my1up = [];
if(base % 2 == 1){my1up[base] = document.createElement("codedl");}
if(base % 2 == 0){my1up[base] = document.createElement("codedl");}
var up12 = my1up[base];
up12.innerHTML = "update";
up12.className = "m";
up12.value = JSON.stringify(resp);
up12.style.opacity = 0.5;
if(update_ready == 1){
up12.addEventListener("click", function(e){var target = e.target || e.srcElement; send_update(target)}, false);
up12.style.opacity = 1.0;
}
curg2.appendChild(up12);



//var plus = resp;
//plus['RIG_NUMBER'] = base;
//var toString = JSON.stringify(plus);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
user['RIG_NUMBER'] = base + 1;
var toString = JSON.stringify(user);

var url = add_rig_url + toString;
var plus_rig = "<a href=" + url + ">+Rig</a>";
var curNR = document.getElementById("plus_rig").innerHTML = plus_rig;
}

function addDivZ(resp, cur, form_data){
var divid = document.getElementById("RIGS");
var base = cur;
while (divid.firstChild ){divid.removeChild(divid.firstChild);}

var g1 = document.createElement("grid1");
g1.className = "grid-container";
divid.appendChild(g1);

//var grid_basis = document.createElement("gridBASIS");
//grid_basis.className = "grid-containerBASIS";
//divid.appendChild(grid_basis);

//var grid_group = document.createElement("gridGROUP");
//grid_group.className = "grid-containerGROUP";
//divid.appendChild(grid_group);

var curg = document.createElement("grid3");
curg.className = "grid-container3";
divid.appendChild(curg);

/*
var plus_basis = document.createElement("codeL");
plus_basis.setAttribute("id", "plus_basis");
plus_basis.className = "z";
grid_basis.appendChild(plus_basis);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_basis_url + toString;
var plus_basis = "<a href=" + url + ">BASIS START HERE</a>";
var curNG = document.getElementById("plus_basis").innerHTML = plus_basis;
var one = document.createElement("codevv");
one.innerHTML = "<br>";
grid_basis.appendChild(one);


var plus_group = document.createElement("codeL");
plus_group.setAttribute("id", "plus_group");
plus_group.className = "z";
grid_group.appendChild(plus_group);
var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_group_url + toString;
var plus_group = "<a href=" + url + ">+Group</a>";
var curNG = document.getElementById("plus_group").innerHTML = plus_group;
var one = document.createElement("codevv");
one.innerHTML = "<br><br>";
curg.appendChild(one);
*/

var plus = document.createElement("codeL");
plus.setAttribute("id", "plus_rig");
plus.className = "a";
curg.appendChild(plus);

var payload = JSON.parse(form_data);
var user_id = payload.id;
var user = {};
user['self'] = "/user/" + user_id;
var toString = JSON.stringify(user);
var url = add_rig_url + toString;
var plus_rig = "<a href=" + url + ">+Rig</a>";
var curNR = document.getElementById("plus_rig").innerHTML = plus_rig;




var wallet = document.createElement("code5");
wallet.id = "wallet";
wallet.innerHTML = "Pool Links";
wallet.addEventListener("click", function(e){var target = e.target || e.srcElement; content_hide_show_toggle(target)}, false);
g1.appendChild(wallet);

var one = document.createElement("codevv");
one.innerHTML = "<br>";
wallet.appendChild(one);

var eth = document.createElement("codeETH");
function execute_ethermineETH(element)
{
var url = "https://ethermine.org/miners/" + resp.ETH_ADDRESS + "/dashboard";
window.open(url);
}
var ethermine = resp.ETH_ADDRESS;
eth.innerHTML = ethermine;
eth.id = "eth_ref_link";
eth.style.visibility = "hidden";
eth.addEventListener("click", function(e){var target = e.target || e.srcElement; execute_ethermineETH(target)}, false);
wallet.appendChild(eth);

var one = document.createElement("codevv");
one.innerHTML = "<br><br>";
wallet.appendChild(one);

var etc = document.createElement("codeETC");
function execute_ethermineETC(element)
{
var url = "https://etc.ethermine.org/miners/" + resp.ETC_ADDRESS + "/dashboard";
window.open(url);
}
var ethermine = resp.ETC_ADDRESS;
etc.innerHTML = ethermine;
etc.id = "etc_ref_link";
etc.style.visibility = "hidden";
etc.addEventListener("click", function(e){var target = e.target || e.srcElement; execute_ethermineETC(target)}, false);
wallet.appendChild(etc);

var one = document.createElement("codevv");
one.innerHTML = "<br><br>";
//one.id = "eth_ref_link_space_etc_ref_link";
//one.style.opacity = 0;
//one.style.visibility = "hidden";
//one.className = "content_hidden";
//one.style.display = "block";
wallet.appendChild(one);

var rvn = document.createElement("codeRVN");
function execute_minermoreRVN(element)
{
var url = "https://minermore.com/wallet/" + resp.RVN_ADDRESS + "/RVN/";
window.open(url);
}
rvn.innerHTML = resp.RVN_ADDRESS;
rvn.id = "rvn_ref_link";
rvn.style.visibility = "hidden";
rvn.addEventListener("click", function(e){var target = e.target || e.srcElement; execute_minermoreRVN(target)}, false);
wallet.appendChild(rvn);

var one = document.createElement("codevv");
one.innerHTML = "<br><br>";
wallet.appendChild(one);

var nice = document.createElement("codeNICE");
function execute_nicehash(element)
{
var url = "https://www.nicehash.com/miner/" + resp.NICE_BTC_ADDRESS;
window.open(url);
}
nice.innerHTML = resp.NICE_BTC_ADDRESS;
nice.id = "nice_ref_link";
nice.style.visibility = "hidden";
nice.addEventListener("click", function(e){var target = e.target || e.srcElement; execute_nicehash(target)}, false);
wallet.appendChild(nice);


var fs = document.createElement("code5");
fs.innerHTML = "MH/s";
fs.className = "b";
curg.appendChild(fs);

var rn = document.createElement("code5");
rn.innerHTML = "RN";
rn.className = "c";
curg.appendChild(rn);

var cn = document.createElement("code5");
cn.innerHTML = "CN";
cn.className = "d";
curg.appendChild(cn);

var gn = document.createElement("code5");
gn.innerHTML = "GN";
gn.className = "e";
curg.appendChild(gn);

var pw = document.createElement("code5");
pw.innerHTML = "PL";
pw.className = "f";
curg.appendChild(pw);

var co = document.createElement("code5");
co.innerHTML = "CC";
co.className = "g";
curg.appendChild(co);

var mo = document.createElement("code5");
mo.innerHTML = "MC";
mo.className = "h";
curg.appendChild(mo);

var fs = document.createElement("code5");
fs.innerHTML = "FS";
fs.className = "i";
curg.appendChild(fs);

var eh = document.createElement("code5");
eh.innerHTML = "EH";
eh.className = "j";
curg.appendChild(eh);

var rb = document.createElement("code5");
rb.innerHTML = "RB";
rb.className = "k";
curg.appendChild(rb);

var fs = document.createElement("code5");
fs.innerHTML = "DL";
fs.className = "l";
curg.appendChild(fs);

var up = document.createElement("code5");
up.innerHTML = "UP";
up.className = "m";
curg.appendChild(up);
}

function getRigs(form_data){
var payload = JSON.parse(form_data);
var user_id = payload.id;
var auth = payload.auth;
console.log(auth);
// use auth for auth header
var ex_uid2 = document.getElementById("USER_ID").value = user_id;
var req = new XMLHttpRequest();
var url = overlord + "/user/" + user_id + "/rigs";
if(use_proxy == 1){url = cors_proxy + overlord + "/user/" + user_id + "/rigs";}
req.open("GET", url, false);
req.addEventListener( "load",function(){
if( req.status >= 200 && req.status < 403 ){
var response = JSON.parse(req.responseText);
var numrigs = response.length;
var ex_numrigs = document.getElementById("NUM_RIGS").value = numrigs;
if( numrigs === 0){addDivZ(response,0,form_data);}
for (i = 0; i < response.length; i++){
var num = response[i];
var req2 = new XMLHttpRequest();
var rig_url = overlord + num;
if(use_proxy == 1){rig_url = cors_proxy + overlord + num;}
req2.open("GET", rig_url, false);
req2.addEventListener( "load",function(){
if( req2.status >= 200 && req2.status < 403 ){
var resp2 = JSON.parse(req2.responseText);
addDiv(resp2,i,form_data);
}else{console.log( "Error: " + req2.statusText );}});req2.send( null );}
}else{console.log( "Error: " + req.statusText );}});req.send( null );}


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

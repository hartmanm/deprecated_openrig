var btc = 0;
var itr;
//on click change to name / ex-rate
var arr = ['btc', 'etc', 'eth'];
function shell(){for (i = 0; i < arr.length; i++){itr = arr[i]; getData(itr);}}
shell();
function refresh(){shell();}
var timer = setInterval(refresh, 120000);
var alt_itr;
var alt_arr = ['bitcoin', 'ethereum-classic', 'ethereum'];
function alt_shell(){for (i = 0; i < alt_arr.length; i++){alt_itr = alt_arr[i]; itr = arr[i]; alt_getData(alt_itr, itr);}}
alt_shell();
function alt_refresh(){alt_shell();}
var alt_timer = setInterval(alt_refresh, 120000);
function source_refresh(){choose_source();}
var source_timer = setInterval(source_refresh, 120004);
setTimeout(choose_source, 4000);
function choose_source(){
var coin;
for (i = 0; i < arr.length; i++){
coin = arr[i]
var v = parseFloat(document.getElementById(coin).value);
v = v.toFixed(2);
var n = parseFloat(document.getElementById(coin).innerHTML);
n = n.toFixed(2);
if(n == NaN || n == "NaN"){document.getElementById(coin).innerHTML = v;}
}}
function getData(coin){
if( coin == "btc"){
var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD";
fetch(url).then(data => data.json()).then(data => {
var n = data.last;
btc = n;
document.getElementById(coin).value = n;})}
else{
var url = "https://shapeshift.io/rate/" + coin + "_btc";
fetch(url).then(data => data.json()).then(data => {
var n = data.rate;
n = btc * n;
n = n.toFixed(2);
document.getElementById(coin).value = n;
})}}
function alt_getData(coin, symbol){
var url = "https://api.coincap.io/v2/assets/" + coin;
fetch(url).then(data => data.json()).then(data => {
var a = data.data.priceUsd;
var n = parseFloat(a);
n = n.toFixed(2);
document.getElementById(symbol).innerHTML = n;
})};

//unused functions


function indv_dashboardETH(){

var ex_eth = document.getElementById("ETH_ADDR").value;
var ETH_address = ex_eth;
var mhd2 = document.getElementById("hashrate");
var nr = document.getElementById("NUM_RIGS").value;
var i = 1;
var mhs = [];
var z = [];
while(i < nr+1){
if(document.getElementById(i).value == "ETH"){
//https://api.ethermine.org/miner/0x66Eff1F027115aA58EF5B75D3ddE0c9c49A45CDf/worker/1/currentStats
//var eth_url = "https://cors-anywhere.herokuapp.com/" + "https://api.ethermine.org/miner/" + ETH_address + "/worker/" + i + "/currentStats";
var eth_url = "https://api.ethermine.org/miner/" + ETH_address + "/worker/" + i + "/currentStats";
fetch(eth_url).then(data => data.json()).then(data => {

//console.log(data.data);
mhs = (data.data.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
//console.log(i + " " + mhs);
z[i] = i;
var element = document.getElementById(z[i]).innerHTML = mhs[z];
})
}
i++;
}
}



function getHashrate(){
var mhd2 = document.getElementById("hashrate");
if(itr == 0){mhd2.value = 0;}
var eth_url = "https://api-etc.ethermine.org/miner/" + ETC_address + "/dashboard"
fetch(eth_url).then(data => data.json()).then(data => {
if(itr == 0){
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else{mhd2.innerHTML = mhs + " MH/s";}
var gh = mhd2.addEventListener("click", function(e){var target = e.target; appendRigs(target.id, data)}, false);
}

if(itr > 0){
if(mhd2.value == 0){
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else
{mhd2.innerHTML = mhs + " MH/s";}
}
if(mhd2.value == 1){
while(mhd2.firstChild){mhd2.removeChild(mhd2.firstChild);}
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else
{mhd2.innerHTML = mhs + " MH/s";}
//console.log("mhd2: " + mhd2);
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
}
}
})
}



function getHashrate(){
var mhd2 = document.getElementById("hashrate_eth");
if(itr == 0){mhd2.value = 0;}
var eth_url = "https://api.ethpool.org/miner/" + ETH_address + "/dashboard"
fetch(eth_url).then(data => data.json()).then(data => {
if(itr == 0){
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else{mhd2.innerHTML = mhs + " MH/s";}
var gh = mhd2.addEventListener("click", function(e){var target = e.target; appendRigs(target.id, data)}, false);
}

if(itr > 0){
if(mhd2.value == 0){
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else
{mhd2.innerHTML = mhs + " MH/s";}
}
if(mhd2.value == 1){
while(mhd2.firstChild){mhd2.removeChild(mhd2.firstChild);}
var ghs = (data.data.currentStatistics.reportedHashrate /1000000000);
ghs = ghs.toFixed(2);
var mhs = (data.data.currentStatistics.reportedHashrate /1000000);
mhs = mhs.toFixed(1);
if(ghs >= 1){mhd2.innerHTML = ghs + " GH/s";}
else
{mhd2.innerHTML = mhs + " MH/s";}
//console.log("mhd2: " + mhd2);
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
}
}
})
}

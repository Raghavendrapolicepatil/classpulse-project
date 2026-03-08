
navigator.geolocation.getCurrentPosition(function(pos){

let lat = pos.coords.latitude;
let lon = pos.coords.longitude;

/* College location */

let collegeLat = 15.36755;
let collegeLon = 75.166786;

/* Distance calculation */

function getDistance(lat1, lon1, lat2, lon2){

const R = 6371; // km

let dLat = (lat2-lat1) * Math.PI/180;
let dLon = (lon2-lon1) * Math.PI/180;

let a =
Math.sin(dLat/2)*Math.sin(dLat/2) +
Math.cos(lat1*Math.PI/180) *
Math.cos(lat2*Math.PI/180) *
Math.sin(dLon/2)*Math.sin(dLon/2);

let c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

return R*c;

}

let distance = getDistance(lat,lon,collegeLat,collegeLon);

/* 0.1 km = 100 meters */

if(distance > 0.1){

alert("Voting allowed only inside campus");

document.body.innerHTML =
"<h2 style='text-align:center'>You are outside campus</h2>";

}

});

/* Auto reset after 1 hour */

let resetTime = localStorage.getItem("resetTime");
let now = Date.now();

if(!resetTime){
localStorage.setItem("resetTime", now);
}

if(now - resetTime > 3600000){
localStorage.clear();
localStorage.setItem("resetTime", now);
}


/* Get subject */

const params = new URLSearchParams(window.location.search);
const subject = params.get("subject") || "Class";

document.getElementById("subjectTitle").innerText =
subject + " class happening?";


/* Vote keys */

let yesKey = subject + "_yes";
let noKey = subject + "_no";

let yesVotes = localStorage.getItem(yesKey) || 0;
let noVotes = localStorage.getItem(noKey) || 0;

document.getElementById("yesCount").innerText = yesVotes;
document.getElementById("noCount").innerText = noVotes;


/* Voting */

function voteYes(){

if(localStorage.getItem(subject+"_voted")){
alert("You already voted");
return;
}

yesVotes++;

localStorage.setItem(yesKey, yesVotes);
localStorage.setItem(subject+"_voted","yes");

document.getElementById("yesCount").innerText = yesVotes;

}

function voteNo(){

if(localStorage.getItem(subject+"_voted")){
alert("You already voted");
return;
}

noVotes++;

localStorage.setItem(noKey, noVotes);
localStorage.setItem(subject+"_voted","yes");

document.getElementById("noCount").innerText = noVotes;

}

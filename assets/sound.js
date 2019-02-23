let menu_start = document.createElement("audio");
menu_start.src = "./assets/sound/menu_start.flac";

let land = document.createElement("audio");
land.src = "./assets/sound/landing.wav";

let alarm = document.createElement("audio");
alarm.loop = true;
alarm.src = "./assets/sound/alarm.wav";

let full = document.createElement("audio");
full.src = "./assets/sound/ship_full.wav";

let fuelAudio = document.createElement("audio");
fuelAudio.src = "./assets/sound/alertFuel.wav";

let error = document.createElement("audio");
error.src = "./assets/sound/menu_error.wav";

let money = document.createElement("audio");
money.src = "./assets/sound/money.mp3";

let notyet = document.createElement("audio");
notyet.src = "./assets/sound/lowDown.mp3";

function playError() {
    let sound = error.cloneNode();
    sound.play();
}


function playMoney() {
    let sound = money.cloneNode();
    sound.play();
}
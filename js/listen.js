import jsonConfig from 'https://t-yauk.github.io/peak-theatre/lists/music.json' with {type: "json"};
const library = jsonConfig.music;
const album_id = Number(localStorage.getItem('albumID'));
console.log(album_id);
const a = document.getElementById("audio");
let id;
let menuID = 1;
let playing = true;
let k = 1;
let light;
let theme = library[album_id].theme;
const initialID = localStorage.getItem('song_id');
if(initialID !== "shuffle"){
   id = Number(initialID); 
}
const timeline = (document.getElementsByClassName("timeline"))[0];
const timespot = (document.getElementsByClassName("timespot"))[0];

console.log(id);
const tracks = library[album_id].tracks;
let pathway = "D:\\peaktheatre\\music\\";

window.onload = function() {

    if(theme !== undefined){
        timeline.style.background = "rgb(" + theme[0] + "," + theme[1] + "," + theme[2] + ")";
        document.getElementById("title").style.color = "rgb(" + theme[0] + "," + theme[1] + "," + theme[2] + ")";
        document.getElementsByClassName("main-wrapper")[0].style.background = "rgba(2,2,2,1)";
        document.getElementById("artwork").style.filter = "drop-shadow(0 0 0.7rem rgba(" + theme[0] + "," + theme[1] + "," + theme[2] + "," + "0.1))";
    }

    document.getElementById("listen").style.backgroundImage = "url('D:\\peaktheatre\\elements\\music\\" + library[album_id].artwork + "')";
    document.getElementById("artwork").src = "D:\\peaktheatre\\elements\\music\\" + library[album_id].artwork;
    document.getElementById("title").innerHTML = tracks[id].title;
    document.getElementById("details").innerHTML = library[album_id].title + " <span style='font-size:0.7em'>•</span> " + library[album_id].artist;
    a.src = pathway + library[album_id].id + "/" + tracks[id].id;;
    

    setTimeout(function() {
        if(theme == undefined){
            document.getElementsByClassName("main-wrapper")[0].style.background = "rgba(0,0,0,0.5)";
        }
        a.play();
    }, 1000);

    timeline.style.opacity = "1";

    const t = setInterval(time, 10);
    const s = setInterval(seconds, 1000);

}


function time(){
    const perc = (a.currentTime / a.duration) * 100;
    timeline.style.width = perc + "%";
    timespot.style.left = perc + "%";
    if(a.paused){
        document.getElementsByClassName("control-item")[1].innerHTML = "<span class='fa-solid fa-play'></span>";
    }else{
        document.getElementsByClassName("control-item")[1].innerHTML = "<span class='fa-solid fa-pause'></span>";
    }
}

function seconds(){
    const rem = a.duration - a.currentTime;

    console.log(convertSecondsToHHMMSS(a.currentTime));
    document.getElementById("the-time").innerHTML = convertSecondsToHHMMSS(a.currentTime) + "&emsp;&emsp;<span style='font-weight:normal'>|</span>&emsp;&emsp;" + convertSecondsToHHMMSS(a.duration);

    console.log(rem);
    if(rem < 0.5){
        id = id + 1;
        if(id == tracks.length){
            light = "music";
            api.controlLights({
                light
            });
            window.location.href = "album-2.html";
        }
        localStorage.setItem('song_id', id);
        a.src = pathway + library[album_id].id + "/" + tracks[id].id;
        document.getElementById("title").innerHTML = tracks[id].title;
        a.play();
    }
}


function controls(){
    const items = document.getElementsByClassName("control-item");

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }
}

function action() {
    if(k == 0){
        if(a.currentTime < 3){
            if(id > 0){
                id = id - 1;
                k = 1;
                controls();
            }
        }
        localStorage.setItem('song_id', id);
        a.src = pathway + library[album_id].id + "/" + tracks[id].id;;
        document.getElementById("title").innerHTML = tracks[id].title;
        a.play();
    }else if(k == 1){
        if(playing == true){
            a.pause();
            playing = false;
        }else if(playing == false){
            a.play();
            playing = true;
        }
    }else if(k == 2){
        id = id + 1;
        localStorage.setItem('song_id', id);
        a.src = pathway + library[album_id].id + "/" + tracks[id].id;;
        document.getElementById("title").innerHTML = tracks[id].title;
        a.play();
        k = 1;
        controls();
    }
}









document.addEventListener('keydown', function(event) {

    if(event.key === 'h'){
        window.location.href = "home.html";
    }else if(menuID == 1){
        if(event.key === 'ArrowRight'){
            a.currentTime += 10;
        }else if(event.key === 'ArrowLeft'){
            a.currentTime -= 10;
        }else if(event.key == 'ArrowUp'){
            menuID = 2;
            if(theme == undefined){
                timeline.style.background = "rgba(44,112,244,0.5)";
            }else{
                timeline.style.background = "rgba(" + theme[0] + "," + theme[1] + "," + theme[2] + ",0.5)";
            }
            timespot.style.background = "rgba(255,255,255,0.3)";
            controls();
        }
    }else if(menuID == 2){
        if(event.key === 'ArrowRight'){
            if(k < 2){
                k = k + 1;
                controls();
            }
        }else if(event.key === 'ArrowLeft'){
            if(k > 0){
                k = k - 1;
                controls();
            }
        }else if(event.key === 'ArrowDown'){
            menuID = 1;
            const items = document.getElementsByClassName("control-item");
            for(let i=0;i<items.length;i++){
                items[i].classList.remove("active");
            }
            if(theme == undefined){
                timeline.style.background = "rgba(44,112,244,1)";
            }else{
                timeline.style.background = "rgba(" + theme[0] + "," + theme[1] + "," + theme[2] + ",1)";
            }
            timespot.style.background = "white";
        }else if(event.key === 'Enter'){
            action();
        }
    }

    if(event.key === 'Backspace'){
        light = "music";
        api.controlLights({
            light
        });
        window.location.href = "album-2.html";
    }

});


function convertSecondsToHHMMSS(totalSeconds) {
  totalSeconds = Math.round(totalSeconds);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

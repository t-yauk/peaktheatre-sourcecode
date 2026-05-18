import jsonConfig from 'https://t-yauk.github.io/peak-theatre/library.json' with {type: "json"};
const library = jsonConfig.movies;
const title = localStorage.getItem('the_title');
let id;
const v = document.getElementById("main-video");
const s = document.getElementById("subtitles");
const t = (document.getElementsByClassName("timeline"))[0];
const tc = (document.getElementsByClassName("timecode"))[0];
const tw = (document.getElementsByClassName("timeline-wrapper"))[0];
const titleWrap = (document.getElementsByClassName("title-wrapper"))[0];
let infoVis = false;
let credits;
let light;


window.onload = function() {

    for(let i=0;i<library.length;i++){
        if(library[i].title == title){
            id = i;
            break;
        }
    }

    if(library[id].subtitle == undefined){
        document.getElementById("the-title").innerHTML = library[id].title;
    }else{
        document.getElementById("the-title").innerHTML = library[id].title + " <span style='font-size:0.6em'>" + library[id].subtitle + "</span>";
    }
    v.src = "D:\\peaktheatre\\movies\\" + library[id].id;
    s.src = "D:\\peaktheatre\\movies\\subtitles\\" + library[id].subtitle_id;
    credits = Number(library[id].endTime);
    v.play();
    const timelineInterval = setInterval(timeline, 10);
    const timecodeInterval = setInterval(timecode, 1000);

}

function timecode(){

    const time = v.duration - v.currentTime;
    tc.innerHTML = convertSecondsToHHMMSS(v.currentTime);
    console.log(time);
    if((time < credits) && (time > (credits-1))){
        light = "on-slow";
        api.controlLights({
            light
        });
    }else if(time < 1){
        window.location.href = "movies.html";
    }

}

function timeline() {

    const perc = (v.currentTime / v.duration) * 100;
    t.style.width = perc + "%";
    if(perc > 96.1){
        tc.style.color = "black";
    }else{
        tc.style.color = "white";
    }

}


document.addEventListener('keydown', function(event) {

    if(event.key === 'h'){
        window.location.href = "home.html";
    }else if(event.key === 'ArrowRight'){
        v.currentTime = v.currentTime + 10;
    }else if(event.key === 'ArrowLeft'){
        v.currentTime = v.currentTime - 10;
    }else if(event.key === 'Enter'){
        if(infoVis == true){
            tw.classList.remove("active");
            titleWrap.classList.remove("active");
            infoVis = false;
        }else{
            tw.classList.add("active");
            titleWrap.classList.add("active");
            infoVis = true;
        }
    }else if(event.key === 'Backspace'){
        localStorage.setItem('filter_type', 'all');
        window.location.href = "movies.html";
    }

});



function convertSecondsToHHMMSS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);

  // Pad single-digit components with leading zeros
  const formattedHours = String(hours).padStart(1, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

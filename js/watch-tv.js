import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};
const all = jsonConfig.shows;
let show;
const id = Number(localStorage.getItem('the_episode'));
const showID = Number(localStorage.getItem('show_id'));
let episode;
const pathway = "D:\\peaktheatre\\tv\\";
const v = document.getElementById("video");
const s = document.getElementById("subtitles");
const t = (document.getElementsByClassName("timeline"))[0];
const tc = (document.getElementsByClassName("timecode"))[0];
const tw = (document.getElementsByClassName("timeline-wrapper"))[0];
const titleWrap = (document.getElementsByClassName("title-wrapper"))[0];
let timeline_visible = false;
const nextEp = id + 1;
console.log(nextEp);

window.onload = function() {

    findShow();

}


async function findShow(){

    const requestURL = all[showID].url;
    const request = new Request(requestURL);

    const response = await fetch(request);
    show = await response.json();

    findEpisode();

}

function findEpisode(){

    episode = show.episodes[id];
    document.getElementById("the-title").innerHTML = "<span class='episode-details'>" + show.title + " | Season " + episode.season + ", Episode " + episode.episode_number + "</span>" + episode.title;
    startEp();

}



function startEp(){

    v.src = pathway + episode.ep_id;
    s.src = pathway + episode.subtitles;
    v.play();

    const tcode = setInterval(timecode, 1000);
    const tl = setInterval(timeline, 10);

}





function timecode(){

    const time = v.duration - v.currentTime;
    tc.innerHTML = convertSecondsToHHMMSS(v.currentTime);
    if(time < 1){
        if(nextEp < show.episodes.length){
            localStorage.setItem('the_episode', nextEp);
            window.location.href = "watch-tv.html";
        }else{
            window.location.href = "episodes.html";
        }
    }

}

function timeline() {

    const perc = (v.currentTime / v.duration) * 100;
    t.style.width = perc + "%";

}









document.addEventListener('keydown', function(event) {

    if(event.key === 'h'){
        window.location.href = "home.html";
    }else if(event.key === 'ArrowRight'){
        v.currentTime += 10;
    }else if(event.key === 'ArrowLeft'){
        v.currentTime -= 10;
    }else if(event.key === 'Enter'){
        if(timeline_visible == false){
            tw.classList.add("active");
            titleWrap.classList.add("active");
            timeline_visible = true;
        }else{
            tw.classList.remove("active");
            titleWrap.classList.remove("active");
            timeline_visible = false;
        }
    }else if(event.key === 'Backspace'){
        window.location.href = "tv-2.html";
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

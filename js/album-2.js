import jsonConfig from 'https://t-yauk.github.io/peak-theatre/lists/music.json' with {type: "json"};
const library = jsonConfig.music;
const title = localStorage.getItem('the_name');
let id;
let tracks;
const backdrop = (document.getElementsByClassName("blur-background"))[0];
const container = (document.getElementsByClassName("song-container"))[0];
let light;
let k = 0;
let y = 0;
let a = document.getElementById("audio");
localStorage.setItem('the_artist', 'all');

window.onload = function() {

    findAlbum();
    setTimeout(function() {
        backdrop.style.background = "rgba(0,0,0,0.5)";
        document.getElementById("the-title").style.opacity = "1";
    }, 250);

}

function findAlbum(){

    for(let i=0;i<library.length;i++){
        if(title == library[i].title){
            id = i;
            localStorage.setItem('album_id', id);
            tracks = library[i].tracks;
            console.log(tracks);
            populate();
            break;
        }
    }

    document.getElementById("album-2").style.backgroundImage = "url('D:\\peaktheatre\\elements\\music\\" + library[id].artwork + "')";
    document.getElementById("the-title").innerHTML = title + "<span class='artist'>" + library[id].artist + " <span style='font-size:0.7em'>•</span> " + library[id].year + "</span>";
    if(title.length > 32){
         document.getElementById("the-title").style.fontSize = "4.5rem";
         document.getElementById("the-title").innerHTML = title + "<span class='artist'>" + library[id].artist + " <span style='font-size:0.7em'>•</span> " + library[id].year + "</span>";
    }
    document.getElementById("artwork").src = "D:\\peaktheatre\\elements\\music\\" + library[id].artwork;

}

function populate(){

    for(let i=0;i<tracks.length;i++){

        const newItem = document.createElement('div');
        newItem.classList.add("song-item");
        newItem.innerHTML = "<span class='title'><span style='font-size:0.8em'>" + (i + 1) + ".</span> " + tracks[i].title + "</span>";
        container.appendChild(newItem);

    }

    active();

}

function active() {

    const items = document.getElementsByClassName("song-item");

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    container.style.transform = "translateY(" + y + "px)";

}











document.addEventListener('keydown', function(event) {

    if(event.key === 'h'){
        window.location.href = "home.html";
    }else if(event.key === 'ArrowDown'){
        if(k < (tracks.length - 1)){
            k = k + 1;
            if(k > 1){
                y = y - 120;
            }
            active();
        }
    }else if(event.key === 'ArrowUp'){
        if(k > 0){
            k = k - 1;
            if(k >= 1){
                y = y + 120;
            }
            active();
        }
    }else if(event.key === 'Enter'){
        localStorage.setItem('albumID', id);
        localStorage.setItem('song_id', k);
        light = "half";
        api.controlLights({
            light
        });
        window.location.href = "listen.html";
    }
    
    if(event.key === 'Backspace'){
        window.location.href = "music-2.html";
    }

});

function getAudioDuration(url) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = url;

    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    }, { once: true });

    audio.addEventListener('error', (e) => {
      reject(e.target.error);
    }, { once: true });

  });
}

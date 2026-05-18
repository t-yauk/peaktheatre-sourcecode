import jsonConfig from 'https://t-yauk.github.io/peak-theatre/lists/music.json' with {type: "json"};
const library = jsonConfig.music;
const title = localStorage.getItem('the_name');
let id;
let tracks;
const container = (document.getElementsByClassName("track-list"))[0];

let men = 1;
let k = 0;
let y = -5;

window.onload = function() {

    for(let i=0;i<library.length;i++){
        if((library[i].title) == title){
            id = i;
            break;
        }
    }

    console.log(id);

    tracks = library[id].tracks;

    document.getElementById("artwork").src = library[id].artwork;
    document.getElementById("title").innerHTML = library[id].title + "<span id='artist'>" + library[id].artist + "</span>";

    populate();

}



function populate(){
    
    for(let i=0;i<tracks.length;i++){
        const item = document.createElement('span');
        item.classList.add("track");
        if(i % 2 === 0){
            item.classList.add("even");
        }
        item.innerHTML = (i + 1) + ". " + tracks[i].title;
        container.appendChild(item);
    }

}


function actionMenu(){
    const items = document.getElementsByClassName("action-menu-item");

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }
}

function trackMenu(){
    const items = document.getElementsByClassName("track");

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

    if(men == 1){

        if(event.key === 'ArrowRight'){
            k = k + 1;
            if(k > 1){
                k = 0;
            }
            actionMenu();
        }else if(event.key === 'ArrowLeft'){
            k = k - 1;
            if(k < 0){
                k = 1;
            }
            actionMenu();
        }else if(event.key === 'ArrowDown'){
            k = 0;
            men = 2;
            const items = document.getElementsByClassName("action-menu-item");
            for(let i=0;i<items.length;i++){
                items[i].classList.remove("active");
            }
            trackMenu();
        }else if(event.key === 'Enter'){
            if(k == 0){
                localStorage.setItem('albumID', id);
                localStorage.setItem('song_id', '0');
                window.location.href = "listen.html";
            }else if(k == 1){
                localStorage.setItem('albumID', id);
                window.location.href = "shuffle.html";
            }
        }

    }else if(men == 2){

        if(event.key == 'ArrowDown'){
            if(k < (tracks.length - 1)){
                k = k + 1;
                if(tracks.length > 11){
                    y = y - 35;
                }
            }
            trackMenu();
        }else if(event.key == 'ArrowUp'){
            k = k - 1;
            if(k >= 0){
                if(tracks.length > 11){
                    y = y + 35;
                }
                trackMenu();
            }else{
                k = 0;
                men = 1;
                const items = document.getElementsByClassName("track");
                for(let i=0;i<items.length;i++){
                    items[i].classList.remove("active");
                }
                actionMenu();
            }
        }else if(event.key === 'Enter'){
            localStorage.setItem('albumID', id);
            localStorage.setItem('song_id', k);
            window.location.href = "listen.html";
        }

    }

    if(event.key === 'Backspace'){
        window.location.href = "music-2.html";
    }

});

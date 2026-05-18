import jsonConfig from 'https://t-yauk.github.io/peak-theatre/lists/music.json' with {type: "json"};
import artistConfig from 'https://t-yauk.github.io/peak-theatre/lists/artists.json' with {type: "json"};
const data = jsonConfig.music;
const artists = artistConfig.artists;
console.log(artists);
const container = (document.getElementsByClassName("music-library"))[0];
const container2 = (document.getElementsByClassName("artist-library"))[0];
const mc = (document.getElementsByClassName("music-menu"))[0];
let mk = 0;
let inMenu = true;
let inAlbum = false;
let inArtist = false;
let k = 0;
let a = 0;
let y = 0;
const backdrop = (document.getElementsByClassName("blur-background"))[0];
let initID = Number(localStorage.getItem('album_id'));
let the_artist = localStorage.getItem('the_artist');
console.log(the_artist);
let light;
let library;
console.log(initID);


window.onload = function() {

    if(the_artist == "all"){
        library = data;
        document.getElementById("previous").style.display = "none";
    }else{
        library = data.filter(music => music.artist && music.artist.includes(the_artist));
        document.getElementById("the-albums").style.fontSize = "10rem";
        document.getElementById("the-albums").innerHTML = the_artist + " ALBUMS";
    }

    if(initID > 0){
        mc.style.transition = "0s";
        mc.style.transform = "translate(-100%,0px)";
        container2.style.transform = "translateX(2000px)";
        inMenu = false;
        inAlbum = true;
    }else{
        y = 1920;
    }

    populate();
    populate2();

    document.getElementById("the-menu").style.opacity = "1";

    setTimeout(function() {
        backdrop.style.background = "rgba(0,0,0,0.5)";
        container.style.transition = "1s";
        container.style.display = "block";
    }, 250);

    light = "music";
    api.controlLights({
        light
    });

}

function populate() {

    for(let i=0;i<library.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("music-library-item");
        newItem.innerHTML = "<img src='D:\\peaktheatre\\elements\\music\\" + library[i].artwork + "' class='album-artwork'><span class='title'>" + library[i].title + "<span class='artist'>" + library[i].artist + "</span></span>";
        container.appendChild(newItem);
    }

    k = initID;

    if(k > 2){
        y = y - ((359.5 * (initID-2)) + 250);
    }else if(k > 1){
        y = y - 250;
    }
    container.style.transform = "translateX(" + y + "px)";

    setTimeout(function() {
        active();
    }, 200);
}

function populate2(){

    for(let i=0;i<artists.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("artist-item");
        newItem.style.backgroundImage = "url('D:\\peaktheatre\\elements\\music\\artists\\" + artists[i].artwork + "')";
        newItem.innerHTML = "<span class='artist-name'>" + artists[i].name + "</span>";
        container2.appendChild(newItem);
    }

    setTimeout(function() {
        active2();
    }, 250);

}

function active(){
    const items = document.getElementsByClassName("music-library-item");
    
    if(inAlbum == true){
        document.getElementById("music-2").style.backgroundImage = "url('D:\\peaktheatre\\elements\\music\\" + library[k].artwork + "')";
    }else{
        document.getElementById("music-2").style.backgroundImage = "url('../media/elements/v/bg-gradient.jpg')";
    }

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
            items[i].classList.remove("previous");
        }else if(i < k){
            items[i].classList.remove("active");
            items[i].classList.add("previous");
        }else{
            items[i].classList.remove("active");
            items[i].classList.remove("previous");
        }
    }

    container.style.transform = "translateX(" + y + "px)";
}

function active2(){

    const items = document.getElementsByClassName("artist-item");

    for(let i=0;i<items.length;i++){
        if(i == a){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    container2.style.transform = "translateX(" + y + "px)";

}





document.addEventListener('keydown', function(event) {

    if(event.key === 'h'){
        window.location.href = "home.html";
    }else if(inMenu == true){
        if(event.key === 'ArrowDown'){
            if(mk == 0){
                mc.style.transform = "translate(0px, -100vh)";
                container.style.display = "none";
                container2.style.display = "block";
                mk += 1;
            }
        }else if(event.key === 'ArrowUp'){
            if(mk == 1){
                mc.style.transform = "translate(0px, 0px)";
                container.style.display = "block";
                container2.style.display = "none";
                mk -= 1;
            }else if(mk == 0 && the_artist !== "all"){
                localStorage.setItem('the_artist', 'all');
                window.location.href = "music-2.html";
            }
        }else if(event.key === 'ArrowRight'){
            y = 0;
            if(mk == 0){
                mc.style.transform = "translate(-100%, 0px)";
                inAlbum = true;
                setTimeout(function() {
                    active();
                }, 1000);
            }else{
                mc.style.transform = "translate(-100%, -100vh)";
                inArtist = true;
                setTimeout(function() {
                    active2();
                }, 1000);
            }
            inMenu = false;
        }else if(event.key === 'Backspace'){
            window.location.href = "home.html";
        }
    }else if(inAlbum == true){
        if(event.key === 'ArrowRight'){
            k = k + 1;
            if(k > 2){
                y = y - 359.5;
            }else if(k > 1){
                y = y - 250;
            }
            if(k == library.length){
                k = 0;
                y = 0;
            }
            active();
        }else if(event.key === 'ArrowLeft'){
            if(k > 0){
                k = k - 1;
                if(k > 1){
                    y = y + 359.5;
                }else if(k > 0){
                    y = y + 250;
                }
            }else{
                y = 1920;
                if(mk == 0){
                    mc.style.transform = "translate(0px, 0px)";
                }else{
                    mc.style.transform = "translate(0px, -100vh)";
                }
                inMenu = true;
                inAlbum = false;
                document.getElementById("music-2").style.backgroundImage = "url('../media/elements/v/bg-gradient.jpg')";
            }
            active();
        }else if(event.key === 'Backspace'){
            y = 1920;
            k = 0;
            if(mk == 0){
                mc.style.transform = "translate(0px, 0px)";
                container2.style.transform = "translateX(2000px)";
            }else{
                mc.style.transform = "translate(0px, -100vh)";
            }
            mc.style.transition = "2s";
            inMenu = true;
            inAlbum = false;
            document.getElementById("music-2").style.backgroundImage = "url('../media/elements/v/bg-gradient.jpg')";
            active();
        }else if(event.key === 'Enter'){
            localStorage.setItem('the_name', library[k].title);
            window.location.href = "album-2.html";
        }
    }else if(inArtist == true){
        if(event.key === 'ArrowRight'){
            a = a + 1;
            if(a > 2){
                y = y - 700;
            }else if(a > 1){
                y = y - 820;
            }
            if(a == artists.length){
                a = 0;
                y = 0;
            }
            active2();
        }else if(event.key === 'ArrowLeft'){
            if(a > 0){
                a = a - 1;
                if(a > 1){
                    y = y + 700;
                }else if(a > 0){
                    y = y + 820;
                }
                active2();
            }else{
                y = 1920;
                k = 0;
                a = 0;
                if(mk == 0){
                    mc.style.transform = "translate(0px, 0px)";
                }else{
                    mc.style.transform = "translate(0px, -100vh)";
                }
                inMenu = true;
                inAlbum = false;
                document.getElementById("music-2").style.backgroundImage = "url('../media/elements/v/bg-gradient.jpg')";
                active2();
                active();
            }
        }else if(event.key === 'Backspace'){
            y = 1920;
            k = 0;
            a = 0;
            if(mk == 0){
                mc.style.transform = "translate(0px, 0px)";
            }else{
                mc.style.transform = "translate(0px, -100vh)";
            }
            inMenu = true;
            inAlbum = false;
            document.getElementById("music-2").style.backgroundImage = "url('../media/elements/v/bg-gradient.jpg')";
            active2();
        }else if(event.key === 'Enter'){
            const selected_artist = artists[a].name;
            localStorage.setItem('the_artist', selected_artist);
            localStorage.setItem('album_id', '0')
            window.location.href = "music-2.html";
        }
    }

});

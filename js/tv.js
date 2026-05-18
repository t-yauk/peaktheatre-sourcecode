import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};
const all = jsonConfig.shows;
const library = [];
const container = (document.getElementsByClassName("shows"))[0];
const blur = document.getElementById("blur-cover");
const gc = (document.getElementsByClassName("gradient-cover"))[0];
const the_details = (document.getElementsByClassName("show-details"))[0];
const sw = (document.getElementsByClassName("seasons-container"))[0];
const ew = (document.getElementsByClassName("episodes-wrapper"))[0];
const ec = (document.getElementsByClassName("episodes-container"))[0];
let seasons = [];
let the_show;
let charLim = 196;
const pathway = "D:\\peaktheatre\\elements\\tv\\artwork\\";
const logo_pathway = "D:\\peaktheatre\\elements\\tv\\logos\\";
let x = 0;
let ep_x = 0;
let id = 0;
let action = "home";
let epID = 0;
let sID;
let light;

window.onload = function() {

    container.style.width = (all.length * 1920) + "px";
    setTimeout(function() {
        the_details.style.opacity = "1";
    }, 1000);
    
    createLibrary();

    light = "movies-on";
    api.controlLights({
        light
    });

}

async function createLibrary() {

    for(let i=0;i<all.length;i++){
        const requestURL = all[i].url;
        const request = new Request(requestURL);

        const response = await fetch(request);
        const show = await response.json();
        library.push(show);
    }

    console.log(library);

    document.getElementById("logo").src = logo_pathway + library[id].logo;
    document.getElementById("description").innerHTML = library[id].description;

    populate();

}

function populate(){

    for(let i=0;i<(library.length + 1);i++){

        const newItem = document.createElement('img');
        newItem.classList.add("show-item");
        if(i == library.length){
            newItem.src = pathway + library[0].image_url;
        }else{
            newItem.src = pathway + library[i].image_url;
        }
        container.appendChild(newItem);

    }

    blur.classList.remove("active");
    details();

}

function details(){

    container.style.transform = "translateX(" + x + "px)";
    if(id < library.length){
        document.getElementById("logo").src = logo_pathway + library[id].logo;
        document.getElementById("description").innerHTML = library[id].description;
    }

    if(id == library.length){

        id = 0;
        x = 0;
        document.getElementById("logo").src = logo_pathway + library[id].logo;
        document.getElementById("description").innerHTML = library[id].description;

        setTimeout(function() {

            container.style.transition = "0s";
            container.style.transform = "translateX(0px)";
            setTimeout(function() {
                container.style.transition = "2s";
            }, 50);

        }, 2000);

    }


    console.log(x);

}



function activeEpisode(){

    const episodes = document.getElementsByClassName("episode");

    for(let i=0;i<episodes.length;i++){
        if(i == epID){
            episodes[i].classList.add("active");
        }else{
            episodes[i].classList.remove("active");
        }
    }

    ec.style.transform = "translateX(" + ep_x + "px)";

    activeSeason_ep();

}


function activeSeason(){

    const the_seasons = document.getElementsByClassName("season");

    for(let i=0;i<the_seasons.length;i++){
        if(i == sID){
            the_seasons[i].classList.add("active");
        }else{
            the_seasons[i].classList.remove("active");
        }
    }

}








function activeSeason_ep(){

    const the_seasons = document.getElementsByClassName("season");
    let current_season = Number(the_show[epID].season);
    current_season = current_season - 1;
    sID = current_season;
    console.log("Season: " + current_season);

    for(let i=0;i<the_seasons.length;i++){
        if(i == current_season){
            the_seasons[i].classList.add("visible");
        }else{
            the_seasons[i].classList.remove("visible");
        }
    }

}





function findSeasons(){

    the_show = library[id].episodes;
    
    for(let i=0;i<the_show.length;i++){
        seasons.push(the_show[i].season);
    }

    seasons = [...new Set(seasons)]; 

    for(let i=0;i<seasons.length;i++){
        const newItem = document.createElement('span');
        newItem.classList.add("season");
        newItem.innerHTML = "Season " + seasons[i];
        sw.appendChild(newItem);
    }

    ec.innerHTML = "";
    epID = 0;

    const offset = the_show.length * 530;

    ec.style.width = offset + "px";

    findEpisodes();

}



function findEpisodes(){

    for(let i=0;i<the_show.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("episode");

        if((the_show[i].title).length > 26){
            charLim = 150;
        }else{
            charLim = 196;
        }

        let description = the_show[i].description;
        description = description.slice(0, charLim);
        if((the_show[i].description).length > charLim){
            description = description + "...";
        }

        newItem.innerHTML = "<img src='" + the_show[i].thumbnail + "' class='thumbnail'><div class='details'><span class='title'>" + the_show[i].episode_number + ". " + the_show[i].title + "</span><p class='the-description'>" + description + "</p></div>";
        ec.appendChild(newItem);
    }

    activeEpisode();

}






function actionSeason(){

    const newID = sID + 1;
    const newSeason = String(newID);

    const previousEpisodes = [];

    if(newID > 1){
        for(let i=0;i<the_show.length;i++){
            const currentID = Number(the_show[i].season);
            if(currentID < newID){
                previousEpisodes.push(currentID);
            }else{
                epID = i;
                ep_x = 0 - (previousEpisodes.length * 520);
                break;
            }
        }
        console.log("the new episode ID is: " + epID);

    }else{
        ep_x = 0;
        epID = 0;
    }

    console.log(previousEpisodes);

}






function home(key) {

    if(key === 'ArrowRight'){

        id = id + 1;
        x = x - 1920;

        details();

    }else if(key === 'ArrowLeft'){

        if(id > 0){
            id = id - 1;
            x = x + 1920;
            details();
        }

    }else if(key === 'ArrowDown' || key === 'Enter'){

        gc.style.backdropFilter = "blur(20px)";
        the_details.classList.add("active");
        sw.classList.add("active");
        ew.classList.add("active");
        seasons = [];
        sw.innerHTML = "";
        findSeasons();
        action = "episodes";

    }else if(key === 'Backspace'){

        window.location.href = "home.html";

    }

}









function episodes(key){

    if(event.key === 'h'){

        window.location.href = "home.html";
        
    }else if(key === 'ArrowRight'){
    
        if(epID < (the_show.length-1)){
            epID = epID + 1;
            if(epID > 1){
                ep_x = ep_x - 520;
            }
            activeEpisode();
        }

    }else if(key === 'ArrowLeft'){

        if(epID > 0){
            epID = epID - 1;
            if(epID > 0){
                ep_x = ep_x + 520;
            }
            activeEpisode();
        }

    }else if(key === 'ArrowUp'){

        const the_seasons = document.getElementsByClassName("season");
        for(let i=0;i<the_seasons.length;i++){
            the_seasons[i].classList.remove("visible");
        }
        const the_episodes = document.getElementsByClassName("episode");
        for(let i=0;i<the_episodes.length;i++){
            the_episodes[i].classList.remove("active");
        }
        action = "season";
        activeSeason();

    }else if(key === 'Enter'){
        light = "off";
        api.controlLights({
            light
        });
        localStorage.setItem('the_episode', epID);
        localStorage.setItem('show_id', id);
        window.location.href = "watch-tv.html";

    }else if(key === 'Backspace'){

        gc.style.backdropFilter = "blur(0px)";
        the_details.classList.remove("active");
        sw.classList.remove("active");
        ew.classList.remove("active");
        action = "home";
        const the_seasons = document.getElementsByClassName("season");
        for(let i=0;i<the_seasons.length;i++){
            the_seasons[i].classList.remove("visible");
        }
        setTimeout(function() {
            ep_x = 0;
            ec.style.transform = "translateX(" + ep_x + "px)";
        }, 2000);

    }

}





function seasons_menu(key){

    if(key === 'ArrowRight'){
        if(sID < (seasons.length - 1)){
            sID = sID + 1;
            activeSeason();
        }
    }else if(key === 'ArrowLeft'){
        if(sID > 0){
            sID = sID - 1;
            activeSeason();
        }
    }else if(key === 'ArrowDown'){

        const the_seasons = document.getElementsByClassName("season");
        for(let i=0;i<the_seasons.length;i++){
            the_seasons[i].classList.remove("active");
        }

        activeSeason_ep();
        activeEpisode();

        action = "episodes";

    }else if(key === 'Enter'){

        actionSeason();

        const the_seasons = document.getElementsByClassName("season");
        for(let i=0;i<the_seasons.length;i++){
            the_seasons[i].classList.remove("active");
        }

        activeSeason_ep();
        activeEpisode();

        action = "episodes";

    }else if(key === 'Backspace'){

        gc.style.backdropFilter = "blur(0px)";
        the_details.classList.remove("active");
        sw.classList.remove("active");
        ew.classList.remove("active");
        action = "home";
        const the_seasons = document.getElementsByClassName("season");
        for(let i=0;i<the_seasons.length;i++){
            the_seasons[i].classList.remove("visible");
            the_seasons[i].classList.remove("active");
        }
        setTimeout(function() {
            ep_x = 0;
            ec.style.transform = "translateX(" + ep_x + "px)";
        }, 2000);

    }

}









document.addEventListener('keydown', function(event) {

    if(action == "home"){
        home(event.key);
    }else if(action == "episodes"){
        episodes(event.key);
    }else if(action == "season"){
        seasons_menu(event.key);
    }

});

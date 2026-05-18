let k = Number(localStorage.getItem('menu_item'));
const items = document.getElementsByClassName("menu-item");
const theMenu = (document.getElementsByClassName("main-menu"))[0];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let light;
let val;
let origin = localStorage.getItem('origin');
console.log(origin);

window.onload = function() {

    getDate();
    const formattedTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById("the-time").innerHTML = formattedTime;

    const tI = setInterval(time, 1000);

    setTimeout(function() {
        if(origin == "false"){
            active();
        }
    }, 500);

    light = "home";
    api.controlLights({
        light
    });

}

function time(){
    const formattedTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById("the-time").innerHTML = formattedTime;
    getDate();
}

function active() {

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

}

function menu(){
    localStorage.setItem('origin', 'false');
    localStorage.setItem('the_artist', 'all');
    localStorage.setItem('filter_type', 'all')
    val = items[k].getAttribute('value');
    localStorage.setItem('album_id', '0');
    localStorage.setItem('menu_item', k);
    theMenu.style.transform = "translateY(50vh)";
    document.getElementById("cover").style.opacity = "1";
    for(let i=0;i<items.length;i++){
        items[i].classList.remove("active");
    }
    setTimeout(function() {
        window.location.href = val;
    }, 2500);
}


document.addEventListener('keydown', function(event) {

    if(origin == "true"){
        active();
        origin = "false";
        console.log(origin);
    }else{
        if(event.key === 'ArrowRight'){
            k = k + 1;
            if(k == items.length){
                k = 0;
            }
            active();
        }else if(event.key === 'ArrowLeft'){
            k = k - 1;
            if(k < 0){
                k = items.length - 1;
            }
            active();
        }else if(event.key === 'Enter'){
            menu();
        }
    }

});


function getDate(){

    const the_date = new Date();
    const year = the_date.getFullYear();
    const month = the_date.getMonth();
    const day = the_date.getDate();

    const today = months[month] + " " + day + ", " + year;

    document.getElementById("the-date").innerHTML = today;

}

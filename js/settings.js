const items = document.getElementsByClassName("settings-menu-item");
let k = 0;
let light;

window.onload = function() {
    
    active();
    document.getElementById("cover").style.opacity = "0";

}

function active() {

    for(let i=0;i<items.length;i++){
        if(i == k){
            items[i].classList.add("active");
        }else{
            items[i].classList.remove("active");
        }
    }

    console.log(k);

}




function action() {


    if(k == 0){
        document.getElementById("cover").style.opacity = "1";
        setTimeout(function() {
            window.location.href = "lights/index.html";
        }, 2500);
    }else if(k == 4){
        light = "end";
        api.controlLights({
            light

        });
    }else if(k == 5){
        document.getElementById("cover").style.transition = "0s";
        document.getElementById("cover").style.opacity = "1";
        light = "restart";
        api.controlLights({
            light

        });
    }

}





document.addEventListener('keydown', function(event) {

    if(event.key === 'h'){
        window.location.href = "home.html";
    }else if(event.key === 'ArrowRight'){
        if(k < (items.length - 1)){
            k = k + 1;
        }
        active();
    }else if(event.key === 'ArrowLeft'){
        if(k > 0){
            k = k - 1;
        }
        active();
    }else if(event.key === 'ArrowDown'){
        if(k < 3){
            k = k + 3;
        }
        active();
    }else if(event.key === 'ArrowUp'){
        if(k > 2){
            k = k - 3;
        }
        active();
    }else if(event.key === 'Enter'){
        action();
    }else if(event.key === 'Backspace'){
        window.location.href = "home.html";
    }

});

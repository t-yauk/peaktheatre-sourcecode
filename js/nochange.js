const v = document.getElementById("main-video");
localStorage.setItem('filter_type', 'all');

window.onload = function() {

    localStorage.setItem('menu_item', '0');
    localStorage.setItem('origin', 'true');

    setTimeout(function() {
        document.getElementById("logo").style.opacity = "1";
    }, 1500);

    setTimeout(function(){
        window.location.href = "initialize.html";
    }, 20000);

}

function navPosition() {
    document.querySelector(`.subnav`).style.top = document.querySelector(`.hero-nav ul`).offsetHeight + "px";
}

document.addEventListener('DOMContentLoaded', navPosition);
window.addEventListener(`resize`, navPosition);
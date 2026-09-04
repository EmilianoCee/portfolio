function navPosition() {
    const subnav = document.querySelector(`.subnav`);
    if (!subnav) return;

    subnav.style.top = document.querySelector(`.hero-nav ul`).offsetHeight + "px";
}

document.addEventListener('DOMContentLoaded', navPosition);
window.addEventListener(`resize`, navPosition);

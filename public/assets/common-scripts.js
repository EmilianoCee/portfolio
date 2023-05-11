document.addEventListener('DOMContentLoaded', function() {
    let heroText = document.querySelectorAll('.hero-text *');

    heroText.forEach(function(element) {
        element.classList.add('loaded');
    });

    document.querySelector(`.subnav`).style.top = document.querySelector(`.hero-nav ul`).offsetHeight + "px";
});
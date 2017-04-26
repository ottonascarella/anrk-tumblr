function Header(posts) {
    var that = this;

    var el = document.querySelector('.header');
    var toggleBtn = el.querySelector('.toggle-btn');
    // var links = [].slice.call(el.querySelectorAll('nav a'));

    function handleClick() {
        el.classList.toggle('header--closed');
        toggleBtn.classList.toggle('toggle-btn--open');
        // links.forEach(function(l) {
        //     if (l.getAttribute('tabindex') == '-1') {
        //         l.setAttribute('tabindex','0');
        //     } else {
        //         l.setAttribute('tabindex','-1');
        //     }
        // });
        posts.toggle();
    }

    toggleBtn.addEventListener('click', handleClick);

    if (window.innerWidth * window.devicePixelRatio >= 1280) {
      handleClick();
    }

}

export default Header;

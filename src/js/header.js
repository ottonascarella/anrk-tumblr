// function setCookie(name, value, days) {
//     var expires = '';
//     var date = new Date();
//     days = days || 360;
//     date.setTime(date.getTime() + (days*24*60*60*1000));
//     expires = '; expires=' + date.toUTCString();
//     document.cookie = name + '=' + value + expires + '; path=/';
// }

// function readCookie (name) {
//     var ca = document.cookie.split(';');
//     var cookies = ca.reduce(function(o, el) {
//         let cookie = el.split('=');
//         o[cookie[0].trim()] = cookie[1].trim();
//         return o;
//     },{});

//     return cookies[name];
// }


function Header(posts) {
    // var that = this;

    var el = document.querySelector('.header');
    var toggleBtn = el.querySelector('.toggle-btn');
    // var links = [].slice.call(el.querySelectorAll('nav a'));

    function handleClick() {
        el.classList.toggle('header--closed');
        toggleBtn.classList.toggle('toggle-btn--open');

        // if (toggleBtn.classList.contains('toggle-btn--open')) {
        //     setCookie('header-open', 'true');
        // } else {
        //     setCookie('header-open', 'false');
        // }

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

    // if (window.innerWidth * window.devicePixelRatio >= 1280) {
    // if (readCookie('header-open')) {
    //   handleClick();
    // }

}

export default Header;

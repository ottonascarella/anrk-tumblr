import '../styles/main.scss';
import '../styles/header.scss';
import '../styles/toggle-btn.scss';
import '../styles/posts.scss';
import '../styles/post-photo.scss';
import '../styles/post-photoset.scss';
import '../styles/post-text.scss';
    import '../styles/clients.scss';
    import '../styles/contact.scss';

import '../styles/post-quote.scss';
import '../styles/post-video.scss';

import '../styles/tumblr-overrides.scss';


import Header from './header';
import Posts from './posts';
import Pager from './pager';

document.addEventListener('DOMContentLoaded', function() {
    var posts = new Posts();
    new Header(posts);

    if (!window.isBlogMainPage) return;
    new Pager(window.blogURL);

});
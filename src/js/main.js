import '../styles/main.scss';
import '../styles/header.scss';
import '../styles/toggle-btn.scss';
import '../styles/posts.scss';
import '../styles/post-photo.scss';
import '../styles/post-text.scss';
import '../styles/post-quote.scss';
import '../styles/post-video.scss';

import '../styles/tumblr-overrides.scss';


import Header from './header';
import Posts from './posts';

document.addEventListener('DOMContentLoaded', function() {
    var posts = new Posts();
    new Header(posts);
});
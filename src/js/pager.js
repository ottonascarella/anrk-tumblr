

function Pager(blogURL) {
    this.page = 1;
    this.blogURL = blogURL;
    this.handleError = this._error.bind(this);
    this.handleLoaded = this._loaded.bind(this);
    this.postsfx = this._postfx.bind(this);
    this.pagefx = this._pagefx.bind(this);
    this.onScroll = this._scroll.bind(this);
    this.nextPostPage = this._nextPostPage.bind(this);
    this.handleLinkClick = this._linkClick.bind(this);
    this.handlePopState = this._popState.bind(this);
    this.loadURL = this._loadURL.bind(this);
    if (!this.posts) this.posts = document.getElementById('posts');

    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('popstate', this.handlePopState);
    document.addEventListener('click', this.handleLinkClick, true);
}

Pager.prototype = {
    _popState: function() {
        this.loadURL(document.location.href, false);
    },
    _linkClick: function(e) {
        if (!e.target.matches('a[target="_self"]')) return;
        e.preventDefault();
        e.stopPropagation();
        var url = e.target.href;

        if (url === document.location.href) return;


        window.history.pushState({}, '', url);
        this.loadURL(url, false);

    },
    _loadURL: function(url, isPosts) {
        var that = this;
        that.isLoading = true;
        fetch(url)
            .then(this.handleLoaded)
            .then(function(res) {

                if (window.blogURL == url) {
                    window.isBlogMainPage = true;
                } else {
                    window.isBlogMainPage = false;
                }

                return res;
            })
            .then(isPosts ? this.postsfx : this.pagefx)
            .then(function() {
                that.isLoading = false;
            })
            .catch(this.handleError);
    },
    _scroll: function() {

        var that = this;

        if (!window.isBlogMainPage) return;
        if (this.isLoading) return;
        if (this.finishedLoading) {
            window.removeEventListener('scroll', this.onScroll);
            return;
        }

        window.requestAnimationFrame(function() {
            if ( (3 * window.innerHeight) + window.scrollY >= document.body.scrollHeight ) {
                that.nextPostPage();
            }
        });

    },

    _error: function(err) {
        console.log(err);
    },

    _loaded: function(response) {
        if (!response.ok) throw new Error('Network response was not ok.');

        return response.text();
    },

    _pagefx: function(text) {
        var div = document.createElement('div');
        div.innerHTML = text;

        var posts = this.posts;
        var title = div.querySelector('title');
        var newPosts = div.querySelector('#posts');

        if (!newPosts || newPosts.children.length < 1) {
            this.finishedLoading = true;
            return;
        }

        if (title) {
            document.head.querySelector('title').textContent = title.textContent;
        }

        posts.innerHTML = newPosts.innerHTML;

    },
    _postfx: function(text) {

        var div = document.createElement('div');
        div.innerHTML = text;

        var posts = this.posts;
        var newPosts = div.querySelector('#posts');

        if (!newPosts || newPosts.children.length < 1) {
            this.finishedLoading = true;
            return;
        }

        var kids = [].slice.call(newPosts.children);

        kids.forEach(function(el) {

          if (el.tagName !== 'SCRIPT') {
            posts.appendChild(el);
            return;
          }

          var s = document.createElement('script');
          s.textContent = el.textContent;
          document.head.appendChild(s);


        });

    },

    _nextPostPage: function() {

        if (this.finishedLoading) return;

        if (!this.posts) this.posts = document.getElementById('posts');

        this.loadURL(this.blogURL + 'page/' + (this.page + 1), true);

    },

    constructor: Pager

};

export default Pager;

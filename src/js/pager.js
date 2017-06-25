
function Pager(blogURL) {
    this.page = 1;
    this.hasFinishedLoading = false;
    this.blogURL = blogURL;

    this.postsfx = this._postfx.bind(this);
    this.pagefx = this._pagefx.bind(this);
    this.onScroll = this._scroll.bind(this);
    this.nextPostPage = this._nextPostPage.bind(this);
    this.handleLinkClick = this._linkClick.bind(this);
    this.handlePopState = this._popState.bind(this);
    this.getURL = this._getURL.bind(this);

    if (!this.posts) this.posts = document.getElementById('posts');

    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('popstate', this.handlePopState);
    document.addEventListener('click', this.handleLinkClick);
}

Pager.prototype = {
    _popState: function() {
        this.getURL(document.location.href, false);
    },
    _linkClick: function(e) {
        if (!e.target.matches('a[target="_self"]')) return;
        e.preventDefault();
        e.stopPropagation();
        var url = e.target.href;

        // if clicked link to same page, do nothing
        if (url === document.location.href) return;

        window.history.pushState({}, '', url);

        // if back to homepage, reset load on scroll
        if (url === this.blogURL) {
            this.page = 1;
            this.hasFinishedLoading = false;
            window.isBlogMainPage = true;
        } else {
            // if other page, avoid loading posts content
            window.isBlogMainPage = false;
        }

        this.getURL(url, false);

    },
    _getURL: function(url, isPosts) {
        var that = this;
        that.isLoading = true;
        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.text();
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
        if (this.hasFinishedLoading) {
            window.removeEventListener('scroll', this.onScroll);
            return;
        }

        window.requestAnimationFrame(function() {
            if ( (4 * window.innerHeight) + window.scrollY >= document.body.scrollHeight ) {
                that.nextPostPage();
            }
        });

    },

    handleError: function(err) {
        console.log(err);
    },

    _pagefx: function(text) {
        var div = document.createElement('div');
        div.innerHTML = text;

        var posts = this.posts;
        var title = div.querySelector('title');
        var newPosts = div.querySelector('#posts');

        if (!newPosts || newPosts.children.length < 1) {
            return;
        }

        if (title) {
            document.head.querySelector('title').textContent = title.textContent;
        }

        // if (this.blogURL === this.url)
        posts.innerHTML = newPosts.innerHTML;

    },
    _postfx: function(text) {

        var div = document.createElement('div');
        div.innerHTML = text;

        var posts = this.posts;
        var newPosts = div.querySelector('#posts');

        if (!newPosts || newPosts.children.length < 1) {
            this.hasFinishedLoading = true;
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

        if (this.hasFinishedLoading) return;

        if (!this.posts) this.posts = document.getElementById('posts');

        this.page += 1;

        this.getURL(this.blogURL + 'page/' + this.page, true);

    },

    constructor: Pager

};

export default Pager;

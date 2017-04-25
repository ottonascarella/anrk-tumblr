

function Pager(blogURL) {
    this.page = 1;
    this.blogURL = blogURL;
    this.handleError = this._error.bind(this);
    this.handleLoaded = this._loaded.bind(this);
    this.sideEffects = this._fx.bind(this);
    this.onScroll = this._scroll.bind(this);
    this.nextPage = this._nextPage.bind(this);

    window.addEventListener('scroll', this.onScroll);
}

Pager.prototype = {

    _scroll: function() {

        var that = this;

        if (this.isLoading) return;
        if (this.finishedLoading) {
            window.removeEventListener('scroll', this.onScroll);
            return;
        }

        window.requestAnimationFrame(function() {
            if ( (2.5 * window.innerHeight) + window.scrollY >= document.body.scrollHeight ) {
                that.nextPage();
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

    _fx: function(text) {

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
            posts.appendChild(el);
        });

        this.page = this.page + 1;

        this.isLoading = false;

    },

    _nextPage: function() {

        if (this.finishedLoading) return;

        this.isLoading = true;

        if (!this.posts) this.posts = document.getElementById('posts');

        fetch(this.blogURL + 'page/' + (this.page + 1))
            .then(this.handleLoaded)
            .then(this.sideEffects)
            .catch(this.handleError);

    },

    constructor: Pager

};

export default Pager;
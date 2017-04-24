    function Posts() {
        this.el = document.querySelector('#posts');
    }
    Posts.prototype.toggle = function() {
        this.el.classList.toggle('posts--large');
    };

    export default Posts;
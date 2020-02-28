var CommentBox = React.createClass({ displayName: "CommentBox",
    getInitialState: function getInitialState() {
        return {
            data: this.props.data };

    },

    handleCommentSubmit: function handleCommentSubmit(comment) {
        var data = this.state.data.concat(comment);
        this.setState({ data: data });
    },

    render: function render() {
        return (
            React.createElement("div", { className: "comment-box" },
                React.createElement("h1", null, "Commnets"),
                React.createElement(CommentList, { data: this.state.data }),
                React.createElement(CommentForm, { commentSubmitHandler: this.handleCommentSubmit })));


    } });



var CommentList = React.createClass({ displayName: "CommentList",
    render: function render() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                React.createElement(Comment, { id: comment.id, author: comment.author }, comment.text));

        });

        return (
            React.createElement("div", { className: "comment-list" },
                commentNodes));


    } });



var Comment = React.createClass({ displayName: "Comment",

    rawHtml: function rawHtml(text) {
        return { __html: text };
    },

    render: function render() {
        return (
            React.createElement("div", { className: "comment", id: "comment_" + this.props.id },
                React.createElement("b", null, this.props.author), React.createElement("br", null),
                React.createElement("span", { dangerouslySetInnerHTML: this.rawHtml(this.props.children) })));


    } });


var CommentForm = React.createClass({ displayName: "CommentForm",
    getInitialState: function getInitialState() {
        return { author: '', text: '' };
    },
    handleAuthorChange: function handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    },
    handleTextChange: function handleTextChange(e) {
        this.setState({ text: e.target.value });
    },

    handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        this.props.commentSubmitHandler({
            id: 128,
            author: this.state.author,
            text: this.state.text });


        this.setState({ author: this.state.author, text: '' });
    },

    render: function render() {
        return (
            React.createElement("div", { className: "comment-form" },
                React.createElement("form", { onSubmit: this.handleSubmit },
                    React.createElement("input", { type: "text", value: this.state.author, placeholder: "Your name", onChange: this.handleAuthorChange }), React.createElement("br", null),
                    React.createElement("input", { value: this.state.text, placeholder: "Your thoughts", onChange: this.handleTextChange }), React.createElement("br", null),
                    React.createElement("button", { type: "submit" }, "Send"))));



    } });



var commentsData = [
{ id: 123, author: 'John', text: 'Hey there!' },
{ id: 124, author: 'Alice', text: 'Hi, how are you?' }];


ReactDOM.render(
React.createElement(CommentBox, { data: commentsData }),
document.getElementById('content'));
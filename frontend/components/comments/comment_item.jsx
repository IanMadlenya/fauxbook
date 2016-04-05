var React = require( 'react' );
var ProfilePicture = require( '../profile_picture' );
var SessionStore = require( '../../stores/session_store' );

var CommentItem = React.createClass({
  getInitialState: function () {
    return { deleting: false };
  },

  render: function () {
    return (
      <div className='comment-container'>
        <ProfilePicture
          targetUser={ this.props.comment.author_id }
          image={ this.props.comment.author.image }
        />
      <a
        className='comment-author'
        href={ '/#/users/' + this.props.comment.author_id }
      >
        { this.props.comment.author.name }
      </a>
      <span className='comment-body'>{ this.props.comment.body }</span>
      { this._commentDeleteButton() }
      </div>
    );
  },

  _commentDeleteButton: function () {
    if ( SessionStore.currentUserId() === this.props.comment.author_id ) {
      var buttonText = this.state.deleting ? 'Are You Sure?' : 'Delete';
      var activeClass = this.state.deleting ? '' : ' transparent';
      var buttonClass = 'comment-delete-button' + activeClass;

      return (
        <button className={ buttonClass } onClick={ this._deleteComment }>
          { buttonText }
        </button>
      );
    }
  },

  _deleteComment: function () {
    if ( this.state.deleting ) {
      // delete comment
    } else {
      this.setState( { deleting: true } );
    }
  }
});

module.exports = CommentItem;

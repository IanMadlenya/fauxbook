var AppDispatcher = require( '../dispatcher/app_dispatcher' );
var PostConstants = require( '../constants/post_constants' );
var FeedConstants = require( '../constants/feed_constants' );

var Store = require( 'flux/utils' ).Store;

var PostStore = new Store( AppDispatcher );

var _posts = [];
var _postIds = [];
var _hasPosts = false;

PostStore.all = function () {
  if ( _hasPosts ) {
    return _posts.slice();
  } else {
    return null;
  }
};

PostStore.postIds = function () {
  if ( _hasPosts ) {
    return _postIds.slice();
  } else {
    return null;
  }
};

PostStore.destroy = function () {
  _posts = [];
  _hasPosts = false;
};

PostStore.hasPosts = function () {
  return _hasPosts;
};

PostStore.__onDispatch = function ( payload ) {
  switch ( payload.actionType ) {
  case PostConstants.POSTS_RECEIVED:
    _receivePosts( payload.posts );
    break;
  case PostConstants.POST_RECEIVED:
    _receivePost( payload.post );
    break;
  case PostConstants.POST_REMOVED:
    _removePost( payload.post );
    break;
  case FeedConstants.FEED_POSTS_RECEIVED:
    _receivePosts( payload.posts );
    break;
  default:
    // no-op
  }
};

var _receivePost = function ( post ) {
  _posts = [post].concat( _posts );
  _hasPosts = true;
  _postIds.push( post.id );
  PostStore.__emitChange();
};

var _receivePosts = function ( posts ) {
  _posts = posts.posts;
  _postIds = posts.ids;
  _hasPosts = true;
  PostStore.__emitChange();
};

var _removePost = function ( post ) {
  for ( var i = 0; i < _posts.length; i++ ) {
    if ( post.id === _posts[i].id ) {
      _posts.splice( i, 1 );
      PostStore.__emitChange();
      return;
    }
  }
};

module.exports = PostStore;

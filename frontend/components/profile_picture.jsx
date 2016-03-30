var React = require( 'react' );
var APIUtil = require( '../utils/api_util' );
var ProfilePhotoUploadTool = require( './profile_photo_upload_tool' );

var ProfilePicture = React.createClass({
  render: function () {
    if ( this.props.profile ) {
      return (
        <div className='profile-picture'>
          <ProfilePhotoUploadTool callback={ this._onDrop } className='profile-picture-upload' promptMessage='Update Profile Picture' />
          <img src={ this.props.profile.profile_picture } />
        </div>
      );
    } else {
      return <div className='profile-picture'></div>;
    }
  },

  _onDrop: function ( files ) {
    APIUtil.uploadProfilePicture( files );
  }
});

module.exports = ProfilePicture;
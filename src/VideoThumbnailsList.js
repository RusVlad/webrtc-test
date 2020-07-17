import React from "react";

const VideoThumbnailsList = props => {
  console.log(props, "test props");

  return (
    <div id='video-thumbnails'>
      {props.videos.map(video => (
        <div key={video.props.id} className='video-thumbnail'>
          {video}
          <span>{video.props.username}</span>
        </div>
      ))}
    </div>
  );
};

export default VideoThumbnailsList;

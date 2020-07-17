import React, { useState } from "react";
import connection from "./RtcConnection";
import localVideoThumbnailsArr from "./VideoThumbnailsClass";
import VideoThumbnailsList from "./VideoThumbnailsList";
import Video from "./Video";

const VideoContainer = () => {
  const [mainVideo, setMainVideo] = useState(null);
  const [videoThumbnailsArr, setVideoThumbnailsArr] = useState([]);
  console.log(videoThumbnailsArr, "TEST INTRO");

  connection.onstream = function (event) {
    console.log("ON STREAM TEST");
    alert("ON STREAM TEST");
    if (event.type === "local") {
      console.log(localVideoThumbnailsArr.get(), "ON STREAM - ADD LOCAL STREAM");

      setMainVideo(event);
    } else if (event.type === "remote") {
      localVideoThumbnailsArr.addVideo(
        <Video srcObject={event.stream} keyvalue={event.streamid} id={event.streamid} username={event.extra.username} />
      );
      console.log(localVideoThumbnailsArr.get(), "ON STREAM - ADD REMOTE STREAM");

      setVideoThumbnailsArr([...localVideoThumbnailsArr.get()]);
    }
  };

  connection.onstreamended = event => {
    console.log("ON STREAM END TEST", event);
    if (event.type === "local") {
      setMainVideo(null);
      localVideoThumbnailsArr.set([]);
      setVideoThumbnailsArr([]);
      console.log("LOCAL STREAM CLOSING. CLOSING ALL VIDEOS - TEST");
    }

    if (event.type === "remote") {
      localVideoThumbnailsArr.findAndRemove(event.streamid);
      setVideoThumbnailsArr([...localVideoThumbnailsArr.get()]);
      console.log(`REMOTE STREAM CLOSING. CLOSING REMOTE STREAM VIDEO - TEST`, event, connection.isOnline, connection.isOffline);

      notifyRemoteUserLeft(event.extra.username);
    }
  };

  const notifyRemoteUserLeft = name => {
    alert(name + " left.");
  };

  const closeSocket = function () {
    console.log("START CLOSE SOCKET TEST");

    connection.getAllParticipants().forEach(function (pid) {
      console.log("TEST DISCONECT WITH PEERS", pid);
      connection.disconnectWith(pid);
    });

    // stop all local cameras
    connection.attachStreams.forEach(function (localStream) {
      console.log(localStream, "CLOSE LOCAL STREAM - TEST");
      localStream.stop();
    });

    // find a way to close socket if user is the only one left.
    // close socket.io connection
    // connection.closeSocket();
  };

  // connection.onUserStatusChanged = function (event) {
  //   console.log("USER STATUS CHANGED TEST", event);
  //   var isOffline = event.status === "offline";

  //   var targetUsername = event.extra.username;

  //   if (isOffline) {
  //     alert(targetUsername + " left.");
  //   }
  // };

  const staticId = "qwe123";

  const openOrJoin = () => {
    alert("TRYIN TO JOIN" + staticId);
    connection.openOrJoin(staticId);
  };
  return (
    <div>
      <div id='video-container'>
        <div id='main-video'>
          {mainVideo && <Video srcObject={mainVideo.stream} mainvideo='true' keyvalue={mainVideo.streamid} />}
          {mainVideo && mainVideo.extra.username}
        </div>
        <VideoThumbnailsList videos={videoThumbnailsArr} />
      </div>
      <div className='action-buttons'>
        {!mainVideo && (
          <button className='btn' onClick={() => openOrJoin()}>
            Join
          </button>
        )}
        {mainVideo && (
          <button className='btn' onClick={() => closeSocket()}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoContainer;

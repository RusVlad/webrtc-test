import * as io from "socket.io-client";
import * as RTCMultiConnection from "rtcmulticonnection/dist/RTCMultiConnection.min.js";

window.io = io;

class ConnectionClass {
  constructor() {
    this.rtc = new RTCMultiConnection();
    this.rtc.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";
    this.rtc.session = {
      audio: true,
      video: true
    };
    this.rtc.codecs.video = "H264";
    this.rtc.autoCreateMediaElement = false;

    this.rtc.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    };

    // add user data here
    const user = {
      username: "Test user" + (Math.random() * 10).toString().slice(2, 10)
    };

    // info about the user: name, email, etc
    this.rtc.extra = {
      username: user.username
    };

    console.log(this.rtc.DetectRTC, "test");

    // if (this.rtc.DetectRTC === false) {
    //   alert("Please attach a camera device.");
    // }

    var bitrates = 512;
    var resolutions = "Ultra-HD";
    var videoConstraints = {};
    const CodecsHandler = this.rtc.CodecsHandler;

    if (resolutions === "HD") {
      videoConstraints = {
        width: {
          ideal: 1280
        },
        height: {
          ideal: 720
        },
        frameRate: 30
      };
    }

    if (resolutions === "Ultra-HD") {
      videoConstraints = {
        width: {
          ideal: 1920
        },
        height: {
          ideal: 1080
        },
        frameRate: 30
      };
    }

    this.rtc.mediaConstraints = {
      video: videoConstraints,
      audio: true
    };

    this.rtc.processSdp = function (sdp) {
      var codecs = "vp8";

      if (codecs.length) {
        sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
      }

      if (resolutions === "HD") {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
          audio: 128,
          video: bitrates,
          screen: bitrates
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
          min: bitrates * 8 * 1024,
          max: bitrates * 8 * 1024
        });
      }

      if (resolutions === "Ultra-HD") {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
          audio: 128,
          video: bitrates,
          screen: bitrates
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
          min: bitrates * 8 * 1024,
          max: bitrates * 8 * 1024
        });
      }

      return sdp;
    };
  }
}

const connection = new ConnectionClass().rtc;

export default connection;

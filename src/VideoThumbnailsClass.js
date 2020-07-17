class VideoThumbnailsClass {
  constructor() {
    this.thumbnailsArray = [];
  }
  set(val) {
    this.thumbnailsArray = val;
  }
  addVideo(val) {
    this.thumbnailsArray.push(val);
  }
  findAndRemove(id) {
    if (this.thumbnailsArray.length) {
      console.log(this.thumbnailsArray, "ARRAY TEST");

      let indexToDelete = this.thumbnailsArray.findIndex(item => item.props.id === id);
      console.log(this.thumbnailsArray, indexToDelete, "LENGTH AND INDEX POSITION TEST");
      console.log(this.thumbnailsArray, "BEFORE TEST");
      if (indexToDelete > -1) {
        this.thumbnailsArray.splice(indexToDelete, 1);
      }
      console.log(this.thumbnailsArray, "AFTER TEST");
    }
  }
  get() {
    return this.thumbnailsArray;
  }
}

const VideoThumbnails = new VideoThumbnailsClass();

export default VideoThumbnails;

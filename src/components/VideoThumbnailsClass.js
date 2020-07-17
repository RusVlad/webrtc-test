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
      let indexToDelete = this.thumbnailsArray.findIndex(item => item.props.id === id);
      if (indexToDelete > -1) {
        this.thumbnailsArray.splice(indexToDelete, 1);
      }
    }
  }
  get() {
    return this.thumbnailsArray;
  }
}

const VideoThumbnails = new VideoThumbnailsClass();

export default VideoThumbnails;

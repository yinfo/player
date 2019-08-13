import { observable, autorun, runInAction, action, computed, observe } from 'mobx';
import { initialPlaylist, PlayerState } from '../constants';

class VideoStore {
  autoPlay = initialPlaylist.autoPlay;
  videos = [...initialPlaylist.videos];
  player = null;
  @observable videoId = '';
  @observable currentIndex = 0;
  @observable selectedVideo = null;
  @action playVideoById = (id) => {

    const video = id <= this.videos.length ? this.videos[id-1]: null
    if(video){
      if(video.videoId === this.videoId){
         if(this.player.getPlayerState() === PlayerState.PLAYING){
           this.player.seekTo(video.startSeconds)
         } else {
           this.player.seekTo(video.startSeconds)
           this.player.playVideo()
         }
      } else {
        console.error('Загрузить другое видео... ')
      }
      this.currentIndex = id
    }

    // runInAction(() => this.opts.playerVars.controls = this.opts.playerVars.controls  === 1 ? 0:1);

  };


  getPlayerConfig() {
    return {
      width: 480,
      height: 360,
      // videoId: this.videoId,
      playerVars: {
        autoplay: this.autoPlay, // Auto-play the video on load
        controls: 1, // Show pause/play buttons in player
        // showinfo: 0, // Hide the video title
        // modestbranding: 1, // Hide the Youtube Logo
        // fs: 1, // Hide the full screen button
        // cc_load_policy: 0, // Hide closed captions
        // iv_load_policy: 3, // Hide the Video Annotations
        // autohide: 0 // Hide video controls when playing
      },
      events: {
        onStateChange: this.onStateChange,
        onError: this.onError,
        onReady: this.onReady,
      },
    };
  }

  constructor() {

    // observe(this, (change) => {
    //   if (change.name === 'selectedVideo') {
    //     // Put your logic for changing the city here
    //     console.log('selected video change')
    //   }
    //   // console.log(change.type, change.name, "from", change.oldValue, "to", change.object[change.name]);
    // });



    autorun(() => {
      // console.log('this.currentIndex',this.currentIndex)
      if (this.currentIndex === 0) {
        if (this.videos && this.videos.length > 0) {
          runInAction(() => this.selectedVideo = this.videos[0]);
        }
      } else {

      }
    });
    autorun(() => {
      if (this.selectedVideo) {
        this.videoId = this.selectedVideo.videoId;
      } else {
      }
    });

  }


  onStateChange = (event) => {
    // console.log(`onStateChange: ${event.data}`);
  };

  onReady = (event) => {
    this.player = event.target;
    if (this.autoPlay) {
      this.player.loadVideoById(this.selectedVideo);
    } else {
      this.player.cueVideoById(this.selectedVideo);
    }
  };
  onError = (event) => {
    console.error(event);
  };
  playVideo = () => {
    this.player.playVideo();
  };
  pauseVideo = () => {
    this.player.pauseVideo();
  };

}

export default new VideoStore();

import { observable, autorun, runInAction, action, computed, observe } from 'mobx';
import { initialPlaylist, PlayerState } from '../constants';
import {queryToVideo} from './VideoConverter'

class VideoStore {
  playList = null;
  autoPlay = initialPlaylist.autoPlay;
  videos = [...initialPlaylist.videos];
  player = null;
  @observable videoId = '';
  @observable currentIndex = 0;
  @observable selectedVideo = null;
  @action playVideoById = (id) => {

    const video = id <= this.videos.length ? this.videos[id - 1] : null;
    if (this.selectedVideo) {
      if (video) {
        if (video.videoId === this.videoId) {
          const playerState = this.player.getPlayerState();
          switch (playerState) {
            case PlayerState.PLAYING:
              this.player.seekTo(video.startSeconds);
              break;
            case PlayerState.CUED:
              this.player.loadVideoById(video);
              // this.player.playVideo();
              // this.player.seekTo(video.startSeconds);
              break;
            default:
              this.player.playVideo();
              this.player.seekTo(video.startSeconds);
          }
        } else {
          console.error('Загрузить другое видео... ');
        }
        this.currentIndex = id;
        this.selectedVideo = video;
      }
    } else {// first time
      if (this.autoPlay) {
        this.player.loadVideoById(video);
      } else {
        this.player.cueVideoById(video);
      }
      this.selectedVideo = video;
      this.videoId = video.videoId;
    }


    // runInAction(() => this.opts.playerVars.controls = this.opts.playerVars.controls  === 1 ? 0:1);

  };

  @action  setQueryParams = (val) => {
      this.playList = queryToVideo(val)
      this.autoPlay = this.playList.autoPlay
  };

  getPlayerConfig() {
    return {
      width: 640,
      height: 480,
      // videoId: this.videoId,
      host: 'https://www.youtube.com',
      playerVars: {
        autoplay: this.autoPlay, // Auto-play the video on load
        controls: 1, // Show pause/play  buttons in player
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

    // autorun(() => {
    //   // console.log('this.currentIndex',this.currentIndex)
    //   if (this.currentIndex === 0) {
    //     if (this.videos && this.videos.length > 0) {
    //       runInAction(() => this.selectedVideo = this.videos[0]);
    //     }
    //   } else {
    //
    //   }
    // });
    // autorun(() => {
    //   if (this.selectedVideo) {
    //     this.videoId = this.selectedVideo.videoId;
    //   } else {
    //   }
    // });

  }


  onStateChange = (event) => {
    // console.log(`onStateChange: ${event.data}`);
  };

  onReady = (event) => {
    this.player = event.target;
    this.playVideoById(1);

    // if (this.autoPlay) {
    //   this.player.loadVideoById(this.selectedVideo);
    // } else {
    //   this.player.cueVideoById(this.selectedVideo);
    // }
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

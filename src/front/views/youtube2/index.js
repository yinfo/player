import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PlayerButtons from './components/PlayerButtons';
import VideoList from './components/VideoList';

let loadYT;

class YouTube extends Component {
  constructor(props) {
    super(props);
    this.videoStore = props.videoStore;
    this.youtubePlayerAnchor = 'ytPlayer1';
  }

  componentDidMount() {
    // if(!this.videoStore.player){
      // console.log('create player!!')
      if (!loadYT) {
        loadYT = new Promise((resolve) => {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          window.onYouTubeIframeAPIReady = () => resolve(window.YT);
        });
      }

      loadYT.then((YT) => {
        new YT.Player(this.youtubePlayerAnchor, this.videoStore.getPlayerConfig());
      });
    // }

  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-8'>
          <div id={this.youtubePlayerAnchor}></div>
        </div>
        <div className='col-md-4'>
          {/*<PlayerButtons/>*/}
          <VideoList/>
        </div>
      </div>
    );
  }
}

export default inject('videoStore')(observer(YouTube));

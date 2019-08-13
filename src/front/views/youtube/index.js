import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import VideoList from './components/VideoList';
const queryString = require('query-string');
let loadYT;

class YouTube extends Component {
  constructor(props) {
    super(props);
    this.videoStore = props.videoStore;
    this.youtubePlayerAnchor = 'ytPlayer1';
  }

  componentDidMount() {
    // window.history.replaceState( {} , 'youtube', 'youtube?p=1' );
    const parsed = queryString.parse(location.search);
    this.videoStore.setQueryParams(parsed);

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
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-7'>
          <div id={this.youtubePlayerAnchor}></div>
        </div>
        <div className='col-md-5'>
          <VideoList/>
        </div>
      </div>
    );
  }
}

export default inject('videoStore')(observer(YouTube));

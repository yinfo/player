import React from 'react';
import { AnimatedView } from '../../../components';
import { observer, inject } from 'mobx-react';

const PlayerButtons = ({ videoStore }) => (

    <div className="row">
      <div className="col-md-12">
        <section className="panel">
          {/*<header className="panel-heading">Inline form</header>*/}
          <div className="panel-body">
            <button
              type="submit"
              className="btn btn-success"
              onClick={videoStore.playVideo}
            >Play
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={videoStore.pauseVideo}
            >Pause
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={videoStore.test}
            >Test
            </button>
          </div>
        </section>
      </div>
    </div>


);
PlayerButtons.displayName = 'Youtube Player';
export default inject('videoStore')(observer(PlayerButtons));






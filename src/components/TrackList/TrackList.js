import React from 'react';

import './TrackList.css';

import Track from '../Track/Track';

function TrackList(props) {
    return (
        <div className="TrackList">
            {/* <Track /> */}
            {/* <Track track={track} isRemoval={false} /> */}
            {props.tracks.map ((track) => (
                <Track track ={track}
                                key = {track.id}
                                onAdd ={props.onAdd}
                                onRemove = {props.onRemove} 
                                isRemoval={props.isRemoval} />
                ))
            }

        </div>
    )
}

export default TrackList;
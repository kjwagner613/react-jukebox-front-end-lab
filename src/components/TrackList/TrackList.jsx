function TrackList(props) {
    const { tracks, handlePlayTrack, handleEditTrack, handleDeleteTrack } = props;
    return (
      <div className="track-list">
        <h2>Track List</h2>
        <ul>
          {tracks.map((track) => (
            <li key={track._id}>
              <p>
                {track.title} by <span>{track.artist}</span>
              </p>
              <div>
                <button onClick={() => handlePlayTrack(track)}>
                  Play
                </button>
                <button onClick={() => handleEditTrack(track)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTrack(track._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TrackList;
  
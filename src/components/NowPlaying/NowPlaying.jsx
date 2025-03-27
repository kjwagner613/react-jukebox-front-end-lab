function NowPlaying({ track }) {
    return (
      <div className='track-details'>
        <h2>Now Playing:</h2>
        <p>
          <strong>Title:</strong> {track.title}
        </p>
        <p>
          <strong>Artist:</strong> {track.artist}
        </p>
      </div>
    );
  }
  
  export default NowPlaying;
  
import { useState, useEffect } from 'react';

import './App.css';

import * as trackService from './services/trackService';

import NowPlaying from './components/NowPlaying/NowPlaying';
import TrackForm from './components/TrackForm/TrackForm';
import TrackList from './components/TrackList/TrackList';

function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();

        if (fetchedTracks.err) {
          throw new Error(fetchedTracks.err);
        }

        setTracks(fetchedTracks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTracks();
  }, []);

  const handlePlayTrack = (track) => {
    setCurrentlyPlaying(track);
  };

  const handleNewTrack = () => {
    setIsFormOpen(true);
    setEditMode(false);
    setSelectedTrack(null);
  };

  const handleCreateTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.err) {
        throw new Error(newTrack.err);
      }

      setTracks([...tracks, newTrack]);
      setIsFormOpen(false);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditTrack = (track) => {
    setIsFormOpen(true);
    setEditMode(true);
    setSelectedTrack(track);
  };

  const handleUpdateTrack = async (formData) => {
    try {
      const updatedTrack = await trackService.update(
        formData,
        selectedTrack._id
      );

      if (updatedTrack.err) {
        throw new Error(updatedTrack.err);
      }

      if (currentlyPlaying && currentlyPlaying._id === updatedTrack._id) {
        setCurrentlyPlaying(updatedTrack);
      }

      setTracks(
        tracks.map((track) =>
          track._id === updatedTrack._id ? updatedTrack : track
        )
      );
      setIsFormOpen(false);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);

      if (deletedTrack.err) {
        throw new Error(deletedTrack.err);
      }

      setTracks((prevTracks) => (
        prevTracks.filter((track) => track._id !== trackId)
      ));

      if (currentlyPlaying && currentlyPlaying._id === trackId) {
        setCurrentlyPlaying(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      {isFormOpen ? (
        <TrackForm
          track={editMode ? selectedTrack : null}
          editMode={editMode}
          setIsFormOpen={setIsFormOpen}
          handleCreateTrack={handleCreateTrack}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <>
          <button onClick={() => handleNewTrack()}>Add New Track</button>
          <TrackList
            tracks={tracks}
            handlePlayTrack={handlePlayTrack}
            handleEditTrack={handleEditTrack}
            handleDeleteTrack={handleDeleteTrack}
          />
          {currentlyPlaying && <NowPlaying track={currentlyPlaying} />}
        </>
      )}
    </div>
  );
};

export default App;

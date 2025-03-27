import { useState } from 'react';

function TrackForm(props) {
  const {
    track,
    editMode,
    setIsFormOpen,
    handleCreateTrack,
    handleUpdateTrack,
  } = props
  const initialState = {
    title: '',
    artist: '',
  };

  const [formData, setFormData] = useState(
    track ? track : initialState
  );

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (editMode) {
      await handleUpdateTrack(formData);
    } else {
      await handleCreateTrack(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setIsFormOpen(false)}>
        Cancel
      </button>
    </form>
  );
}

export default TrackForm;

import React, {useState, useEffect} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../utils/Spotify';

function App() {

  const [searchResults, setSearchResults] = useState ([]);
  const [playlistName, setPlaylistName] = useState ("My playlist");
  const [playlistTracks, setPlaylistTracks] = useState ([]);
  
  useEffect(() => {
    Spotify.getAccessToken()
  
  }, []);
  

  const addTrack = (track) => {
    let tracks = [...playlistTracks];
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    setPlaylistTracks (tracks)
  }

  const removeTrack = (track) => {
    let tracks = [...playlistTracks];
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)

    setPlaylistTracks (tracks)
  }

  const updatePlaylistName  = (name) => {
    setPlaylistName (name);
  }

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    // const trackURIs = playlistTracks.uri;
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName ('My playlist');
      setPlaylistTracks ([]);
      })
  }

  const search = (term) => {
    Spotify.search(term).then ( searchResults => setSearchResults(searchResults) )
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>

      <div className="App">

            <SearchBar onSearch = {search} />

        <div className="App-playlist">
          
            <SearchResults searchResults = {searchResults} onAdd={addTrack} />
          
            <Playlist playlistName = {playlistName} 
                      playlistTracks = {playlistTracks} 
                      onRemove = {removeTrack} 
                      onNameChange = {updatePlaylistName} 
                      onSave = {savePlaylist} />
        </div>

      </div>

    </div>
  );
}

export default App;

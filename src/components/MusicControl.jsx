import React, { useState, useEffect, useRef } from 'react';
import './MusicControl.css';

const MusicControl = ({ scrollProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  // Adjust music intensity based on scroll
  useEffect(() => {
    if (!audioRef.current || !isPlaying) return;
    
    // Calm at start (0-25%)
    if (scrollProgress < 25) {
      audioRef.current.volume = volume * 0.5;
    }
    // Build up (25-50%)
    else if (scrollProgress < 50) {
      audioRef.current.volume = volume * 0.7;
    }
    // Dramatic at fight (50-75%)
    else if (scrollProgress < 75) {
      audioRef.current.volume = volume * 1;
    }
    // Romantic at end (75-100%)
    else {
      audioRef.current.volume = volume * 0.6;
    }
  }, [scrollProgress, volume, isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-control">
      
      {<audio ref={audioRef} loop>
        <source src="/valentine.mp3" type="audio/mp3" />
      </audio>}
      
      <button 
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
      
      {isPlaying && (
        <div className="music-visualizer">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
    </div>
  );
};

export default MusicControl;
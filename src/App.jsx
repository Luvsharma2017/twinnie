import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Timeline from './components/Timeline';
import MusicControl from './components/MusicControl';
import ChatSimulation from './components/ChatSimulation';
import FirstFight from './components/FirstFight';
import FinalProposal from './components/FinalProposal';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showSlowDown, setShowSlowDown] = useState(false);
  const cursorRef = useRef(null);
  const heartTrails = useRef([]);
  const lastScrollTime = useRef(Date.now());

  // Custom cursor movement
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Create heart trail
      if (Math.random() > 0.9) {
        const heart = document.createElement('div');
        heart.className = 'heart-trail';
        heart.textContent = '❤️';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.classList.contains('card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const scrollSpeed = currentTime - lastScrollTime.current;
      
      if (scrollSpeed < 50) {
        setShowSlowDown(true);
        setTimeout(() => setShowSlowDown(false), 1500);
      }
      
      lastScrollTime.current = currentTime;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating hearts background
  useEffect(() => {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    document.body.appendChild(heartsContainer);

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = '💕';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = Math.random() * 100 + '%';
      heart.style.animationDelay = Math.random() * 10 + 's';
      heartsContainer.appendChild(heart);
    }

    return () => heartsContainer.remove();
  }, []);

  return (
    <div className="App">
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ 
          left: cursorPos.x + 'px', 
          top: cursorPos.y + 'px' 
        }}
        ref={cursorRef}
      />

      {/* Music Control */}
      <MusicControl scrollProgress={scrollProgress} />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="title">Our Love Story</h1>
          <p className="subtitle">A journey worth remembering ❤️</p>
          <div className="scroll-indicator">
            <span>Scroll to begin</span>
            <div className="arrow-down">↓</div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline scrollProgress={scrollProgress} />

      {/* Chat Simulation */}
      <ChatSimulation />

      {/* First Fight */}
      <FirstFight />

      {/* Perspective Switch */}
      <section className="perspective-switch">
        <div className="container">
          <h2 className="section-title fade-in">This is my version of the story...</h2>
          <div className="memories-grid">
            <div className="memory-card polaroid">
              <div className="polaroid-image">
                <img src="/images/photo1.jpg" alt="Memory" style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                     }} />
                </div>
              <p className="polaroid-caption">Your smile makes everything better</p>
            </div>
            <div className="memory-card polaroid">
              <div className="polaroid-image">
                <img src="/images/photo2.jpg" alt="Memory" style={{
                   width: '100%',
                   height: '100%',
                     objectFit: 'cover'
                     }} />
                  </div>
              <p className="polaroid-caption">You light up my darkest days</p>
            </div>
            <div className="memory-card polaroid">
              <div className="polaroid-image">
                  <img src="/images/photo3.jpg" alt="Memory" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                    }} />
                  </div>
              <p className="polaroid-caption">Your strength inspires me</p>
            </div>
          </div>
          
          <h2 className="section-title fade-in" style={{marginTop: '100px'}}>Now... here's how I see YOU</h2>
          <div className="appreciation-notes">
            <div className="note">
              <p>"You are the most amazing person I've ever met. Your kindness, your laugh, your way of seeing the world... everything about you is magical."</p>
            </div>
            <div className="note">
              <p>"Thank you for being patient with me, for understanding me, and for choosing to stay even when things got tough."</p>
            </div>
            <div className="note">
              <p>"Every day with you is a gift I never want to take for granted."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Easter Eggs Section */}
      <section className="easter-eggs">
        <div className="container">
          <h2 className="section-title">Hidden Treasures 💎</h2>
          <div className="secret-hearts">
            {[1, 2, 3, 4, 5].map((num) => (
              <button 
                key={num}
                className="secret-heart"
                onClick={(e) => {
                  const messages = [
                    "You're my favorite notification ❤️",
                    "I fall for you more every day 💕",
                    "You make ordinary moments extraordinary ✨",
                    "My heart beats your name 💗",
                    "Forever isn't long enough with you 💖"
                  ];
                  const msg = document.createElement('div');
                  msg.className = 'secret-message';
                  msg.textContent = messages[num - 1];
                  msg.style.left = e.clientX + 'px';
                  msg.style.top = e.clientY + 'px';
                  document.body.appendChild(msg);
                  setTimeout(() => msg.remove(), 3000);
                }}
              >
                💝
              </button>
            ))}
          </div>
          <p className="hint">Click the hearts for secret messages 💌</p>
        </div>
      </section>

      {/* Days Counter */}
      <section className="days-counter">
        <div className="container">
          <div className="counter-box">
            <h3>We've been creating memories for</h3>
            <div className="days-number">
              {Math.floor((new Date() - new Date('2023-08-12')) / (1000 * 60 * 60 * 24))}
            </div>
            <p>beautiful days ❤️</p>
          </div>
        </div>
      </section>

      {/* Final Proposal */}
      <FinalProposal />

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ and lots of memories</p>
      </footer>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './FirstFight.css';

const FirstFight = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [heartBroken, setHeartBroken] = useState(false);
  const [isHealed, setIsHealed] = useState(false);
  const [showHug, setShowHug] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          triggerSequence();
        }
      },
      { 
        threshold: 0.3, // Changed from 0.6 to work better on laptop
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const section = document.querySelector('.first-fight');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [hasTriggered]);

  const triggerSequence = () => {
    // Shake screen
    setTimeout(() => setIsShaking(true), 500);
    setTimeout(() => setIsShaking(false), 1000);
    
    // Break heart
    setTimeout(() => setHeartBroken(true), 1500);
    
    // Heal heart
    setTimeout(() => {
      setHeartBroken(false);
      setIsHealed(true);
    }, 3500);
    
    // Show hug
    setTimeout(() => setShowHug(true), 4500);
  };

  return (
    <section className={`first-fight ${isShaking ? 'shake' : ''}`}>
      <div className="container">
        <h2 className="section-title">Our First Fight 😅</h2>
        <p className="fight-date">September 15, 2023</p>
        
        <div className="fight-content">
          <div className="fight-emoji-container">
            <div className={`heart-emoji ${heartBroken ? 'broken' : ''} ${isHealed ? 'healed' : ''}`}>
              {heartBroken ? '💔' : isHealed ? '❤️' : '❤️'}
            </div>
            
            {heartBroken && (
              <div className="crack-animation">
                <div className="crack"></div>
              </div>
            )}
          </div>
          
          <div className="fight-messages">
            <div className="fight-message angry">
              <p>"I thought you understood..."</p>
            </div>
            <div className="fight-message sad">
              <p>"Kya understood, aap bdo ho ki m?"</p>
            </div>
            <div className="fight-message regret">
              <p>"chota kon h"</p>
            </div>
            <div className="fight-message hope">
              <p>"aap bde ho mtlb aap galat ho"</p>
            </div>
          </div>
          
          {isHealed && (
            <div className="resolution">
              <h3>We fought. We misunderstood. But we stayed.</h3>
              <p>Because what we have is worth fighting for. 💪❤️</p>
            </div>
          )}
          
          {showHug && (
            <div className="hug-animation">
              <div className="hug-emoji">🤗</div>
              <p className="hug-text">And then we hugged it out</p>
            </div>
          )}
        </div>
        
        <div className="lesson-box">
          <h4>What We Learned:</h4>
          <ul>
            <li>1.5 foot wala twinnie is always right 💬</li>
            <li>It's okay to bde twinnie pr saara ilzam lga dena 🤝</li>
            <li>Love means "Us Together" 💕</li>
            <li>Daily Ilu Ilu bolege 💪</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FirstFight;

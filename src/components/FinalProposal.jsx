import React, { useState, useEffect } from 'react';
import './FinalProposal.css';

const FinalProposal = () => {
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [noButtonPos, setNoButtonPos] = useState({ top: '50%', left: '30%' });
  const [noClickCount, setNoClickCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  const fullText = "After everything we've been through... all the laughs, the tears, the memories we've created together...";
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          startSequence();
        }
      },
      { threshold: 0.8 }
    );

    const section = document.querySelector('.final-proposal');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [hasTriggered]);

  const startSequence = () => {
    setTimeout(() => setShowText(true), 500);
    
    // Typing effect
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowQuestion(true), 1000);
      }
    }, 50);
  };

  const handleNoClick = () => {
    const messages = [
      "Are you sure? 🥺",
      "Really? 💔",
      "Please reconsider 🙏",
      "You're breaking my heart 😢",
      "One more chance? 💕"
    ];
    
    if (noClickCount < messages.length) {
      alert(messages[noClickCount]);
      setNoClickCount(noClickCount + 1);
    }
    
    // Move button to random position
    const randomTop = Math.random() * 60 + 20;
    const randomLeft = Math.random() * 60 + 20;
    setNoButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  const handleYesClick = () => {
    setAnswer('yes');
  };

  if (answer === 'yes') {
    return (
      <section className="final-proposal celebration">
        <div className="fireworks">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="firework" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}>
              🎆
            </div>
          ))}
        </div>
        
        <div className="celebration-content">
          <h1 className="celebration-title">YES! 🎉</h1>
          <p className="celebration-text">
            You've made me the happiest person alive! ❤️
          </p>
          <div className="hearts-explosion">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="heart-particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}>
                ❤️
              </div>
            ))}
          </div>
          <p className="valentine-message">
            Happy Valentine's Day, my love! 💖<br/>
            Here's to many more memories together ✨
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="final-proposal">
      <div className="proposal-container">
        {showText && (
          <div className="proposal-text">
            <p className="typed-text">{typedText}<span className="cursor">|</span></p>
          </div>
        )}
        
        {showQuestion && (
          <div className="proposal-question">
            <h1 className="big-question">
              Will you be my Valentine? ❤️
            </h1>
            
            <div className="button-container">
              <button 
                className="yes-btn"
                onClick={handleYesClick}
              >
                Yes! 💕
              </button>
              
              <button 
                className="no-btn"
                onClick={handleNoClick}
                style={{ 
                  position: 'absolute',
                  top: noButtonPos.top,
                  left: noButtonPos.left,
                  transition: 'all 0.3s ease'
                }}
              >
                No 😢
              </button>
            </div>
            
            <p className="hint-text">
              (Hint: There's only one right answer 😏)
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalProposal;
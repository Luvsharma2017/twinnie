import React, { useState, useEffect } from 'react';
import './ChatSimulation.css';

const ChatSimulation = () => {
  const [messages, setMessages] = useState([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const conversation = [
    { sender: 'them', text: 'Hey! 👋', delay: 1000 },
    { sender: 'me', text: 'Hi! How are you?', delay: 1500 },
    { sender: 'them', text: 'I\'m good! Just wanted to say hi 😊', delay: 2000 },
    { sender: 'me', text: 'That made my day ❤️', delay: 1800 },
    { sender: 'them', text: 'Really? 🥺', delay: 1200 },
    { sender: 'me', text: 'Yeah... I really like talking to you', delay: 2200 },
    { sender: 'them', text: 'Me too... like, a lot 💕', delay: 2000 },
    { sender: 'me', text: 'So... what are we doing here? 😅', delay: 1800 },
    { sender: 'them', text: 'I don\'t know... but I don\'t want to stop', delay: 2500 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          startConversation();
        }
      },
      { threshold: 0.5 }
    );

    const section = document.querySelector('.chat-simulation');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [hasStarted]);

  const startConversation = () => {
    let index = 0;
    
    const showNextMessage = () => {
      if (index >= conversation.length) return;
      
      const currentMsg = conversation[index];
      
      // Show typing indicator
      setShowTyping(true);
      
      setTimeout(() => {
        // Hide typing and show message
        setShowTyping(false);
        setMessages(prev => [...prev, { ...currentMsg, id: index }]);
        
        // Play sound effect (optional)
        // new Audio('/message-sound.mp3').play();
        
        index++;
        if (index < conversation.length) {
          setTimeout(showNextMessage, currentMsg.delay);
        }
      }, 1000);
    };
    
    showNextMessage();
  };

  return (
    <section className="chat-simulation">
      <div className="container">
        <h2 className="section-title">Where It All Began 💬</h2>
        <p className="chat-subtitle">Our First Chat — August 12, 2023, 11:47 PM</p>
        
        <div className="phone-mockup">
          <div className="phone-header">
            <div className="status-bar">
              <span>11:47 PM</span>
              <div className="signal-icons">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            <div className="chat-header">
              <div className="back-btn">←</div>
              <div className="contact-info">
              <div className="avatar">
                <img src="/images/profile.jpg" alt="You" style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              </div>                <div className="contact-name">
                  <h4>You</h4>
                  <span className="status">online</span>
                </div>
              </div>
              <div className="menu-btn">⋮</div>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={msg.id} 
                className={`message ${msg.sender}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span className="message-time">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                    {msg.sender === 'me' && <span className="check-marks">✓✓</span>}
                  </span>
                </div>
              </div>
            ))}
            
            {showTyping && (
              <div className="message them">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-input">
            <button className="emoji-btn">😊</button>
            <input type="text" placeholder="Type a message..." disabled />
            <button className="send-btn">➤</button>
          </div>
        </div>
        
        <p className="chat-memory">
          "I stayed up till 3 AM that night... I couldn't stop smiling 😊"
        </p>
      </div>
    </section>
  );
};

export default ChatSimulation;
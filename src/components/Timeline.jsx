import React, { useEffect, useState } from 'react';
import './Timeline.css';

const Timeline = ({ scrollProgress }) => {
  const [activeCard, setActiveCard] = useState(null);

  const memories = [
    {
      id: 1,
      title: "First Meeting",
      date: "16 Aug 2020",
      time: "3:30 PM",
      emoji: "👋",
      image: "/images/first-meeting.jpg",
      description: "The day everything changed",
      color: "#ff6b9d"
    },
    {
      id: 2,
      title: "First Date",
      date: "22 Feb 2021",
      time: "1:06 AM",
      emoji: "☕",
      image:"/images/first-date.jpg",
      description: "Yhi hmari first date thi ese hi ek sath thy",
      color: "#c44569"
    },
    {
      id: 3,
      title: "First Call",
      date: "17 Mar 2021",
      time: "09:00 AM",
      emoji: "📞",
      description: "when i get to know my twinnie has beautiful voice",
      color: "#f39c12"
    },
    {
      id: 4,
      title: "Made It Official",
      date: "9 April 2005",
      time: "6:15 PM",
      emoji: "💑",
      description: "By Birth mere hi ho, wtf is 2020 m baat kri",
      color: "#e74c3c"
    }
  ];

  return (
    <section className="timeline-section">
      <div className="container">
        <h2 className="section-title">Our Journey Together</h2>
        
        {/* Timeline Path */}
        <div className="timeline-path">
          <div 
            className="timeline-progress" 
            style={{ height: `${Math.min(scrollProgress * 2, 100)}%` }}
          />
          
          {/* Avatar moving along path */}
          <div 
            className="timeline-avatar"
            style={{ top: `${Math.min(scrollProgress * 2, 95)}%` }}
          >
            ❤️
          </div>

          {/* You are here indicator */}
          {scrollProgress > 10 && scrollProgress < 40 && (
            <div 
              className="you-are-here"
              style={{ top: `${Math.min(scrollProgress * 2, 95)}%` }}
            >
              You are here ❤️
            </div>
          )}
          
          {/* Timeline Cards */}
          {memories.map((memory, index) => (
            <div 
              key={memory.id}
              className={`timeline-card ${activeCard === memory.id ? 'active' : ''} ${index % 2 === 0 ? 'left' : 'right'}`}
              style={{ 
                top: `${(index + 1) * 25}%`,
                animationDelay: `${index * 0.2}s`
              }}
              onClick={() => setActiveCard(activeCard === memory.id ? null : memory.id)}
            >
              <div className="card-dot" style={{ background: memory.color }}>
                {memory.image ? (
                  <img src={memory.image} alt={memory.title} style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />
                ) : (
                    <span className="card-emoji">{memory.emoji}</span>
                  )}
              </div>
              
              <div className="card-content" style={{ borderLeftColor: memory.color }}>
                <h3>{memory.title}</h3>
                <p className="card-date">{memory.date} — {memory.time}</p>
                <p className="card-description">{memory.description}</p>
                {activeCard === memory.id && (
                  <div className="card-detail">
                    <p>Every moment with you is a treasure I hold close to my heart. 💕</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
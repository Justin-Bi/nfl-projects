import React, { useEffect, useState } from 'react';
import './App.css';

function About() {
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      console.log(data);
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      <p>The current time is {currentTime}</p>
    </div>
  );
}

export default About;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Auction App</h1>
        <p>Bid on the best deals and win amazing products!</p>
      
      </div>

      

     


      {/* Call to Action */}
      <div className="cta-section">
        <button onClick={() => navigate('/signup')} className="cta-button">Join Now</button>
      </div>
    </div>
  );
}

export default Landing;

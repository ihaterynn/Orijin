import React from 'react';
import Navbar from '../components/navbar';
import './homepage.css';

const Homepage = () => {
  return (
    <main>
      <Navbar />
      <section className="hero">
        {/* Hologram Container for the 3D rotating card */}
        <div className="hologram-container">
          <div className="card-container">
            <div className="card">
              <div className="card-face front">
                <div className="card-header">
                  <span>Orijin</span>
                  <span>Identity Card</span>
                </div>
                <div className="card-content">
                  <h2 id="card-name">ORIJIN Marketplace</h2>
                  <p id="card-define">Explore and Trade Games</p>
                </div>
                <div className="card-footer">
                  <span></span>
                </div>
              </div>
              <div className="card-face back">
                <div className="card-header">
                  <span>Rynn</span>
                </div>
                <div className="card-content">
                  <p>Chain: Solana</p>
                  <ul>
                    <li>Games Owned: 1</li>
                    <li>Games Sold: 5</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <span>ID: 010002947192001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-content container">
          <h1>Game Trading Platform</h1>
          <p className="intro">
            Explore, mint, and trade your unique Games in the Orijin marketplace
          </p>
          <button className="explore-button">Explore Now</button>
        </div>
      </section>

      <section className="features-section">
        <div className="features container">
          <div className="feature">
            <h3>Your Unique Games</h3>
            <p>Mint one-of-a-kind NFTs that represent your assets or games.</p>
          </div>
          <div className="feature">
            <h3>Secure Transactions</h3>
            <p>Trade your NFTs securely with blockchain technology ensuring transparency and safety.</p>
          </div>
          <div className="feature">
            <h3>Join the Community</h3>
            <p>Become part of a vibrant community of gamers and collectors.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;

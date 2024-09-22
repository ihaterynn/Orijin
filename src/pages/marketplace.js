import React, { useState } from 'react';
import Navbar from '../components/navbar';
import './marketplace.css';

import aevitas from '../graphics/aevitas.png';
import eldenring from '../graphics/eldenring.jpg';
import delysium from '../graphics/delysium.jpg';
import sekiro from '../graphics/sekiro.jpg';
import angelic from '../graphics/angelic.png';
import halo from '../graphics/halo.jpg'; 
import infamous from '../graphics/infamous.jpg';
import dmc5 from '../graphics/dmc5.jpg';
import ghostoftsushima from '../graphics/ghostoftsushima.jpg';
import theWitcher from '../graphics/theWitcher.jpg';

const Marketplace = () => {
  const [genre, setGenre] = useState('All');

  const games = [
    { name: 'Halo Infinite', id: Math.random().toString(36).substring(7), price: '0.5', banner: halo, genre: 'Action' },
    { name: 'Infamous Second Son', id: Math.random().toString(36).substring(7), price: '0.2', banner: infamous, genre: 'Action' },
    { name: 'Devil May Cry V', id: Math.random().toString(36).substring(7), price: '0.4', banner: dmc5, genre: 'Adventure' },
    { name: 'Ghost of Tsushima', id: Math.random().toString(36).substring(7), price: '0.3', banner: ghostoftsushima, genre: 'Adventure' },
    { name: 'The Witcher', id: Math.random().toString(36).substring(7), price: '0.2', banner: theWitcher, genre: 'RPG' },
    { name: 'Aevitas', id: Math.random().toString(36).substring(7), price: '0.1', banner: aevitas, genre: 'Action' },
    { name: 'Elden Ring', id: Math.random().toString(36).substring(7), price: '0.4', banner: eldenring, genre: 'RPG' },
    { name: 'Delysium', id: Math.random().toString(36).substring(7), price: '0.2', banner: delysium, genre: 'MMORPG' },
    { name: 'Sekiro', id: Math.random().toString(36).substring(7), price: '0.3', banner: sekiro, genre: 'Adventure' },
    { name: 'Angelic', id: Math.random().toString(36).substring(7), price: '0.2', banner: angelic, genre: 'Puzzles' }
  ];

  // Filter games based on selected genre
  const filteredGames = genre === 'All' ? games : games.filter(game => game.genre === genre);

  return (
    <div className="marketplace-page">
      <Navbar />
      <div className="marketplace-container">
        <div className="marketplace-header-container">
          <h1 className="marketplace-header">ORIJIN Marketplace</h1>
          <button className="publish-button">Publish a Game</button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search games..." />
          <button className="search-button">🔍</button>
        </div>

        {/* Genre Buttons */}
        <div className="genre-buttons">
          <button onClick={() => setGenre('All')}>All</button>
          <button onClick={() => setGenre('Action')}>Action</button>
          <button onClick={() => setGenre('RPG')}>RPG</button>
          <button onClick={() => setGenre('MMORPG')}>MMORPG</button>
          <button onClick={() => setGenre('Adventure')}>Adventure</button>
          <button onClick={() => setGenre('Puzzles')}>Puzzles</button>
        </div>

        {/* Game Listings */}
        <div className="games-list">
          {filteredGames.map((game, index) => (
            <div className="game-card" key={index}>
              <img src={game.banner} alt={game.name} className="game-banner" />
              <p><strong>{game.name}</strong></p>
              <p><strong>ID:</strong> {game.id}</p>
              <p><strong>Price:</strong> {game.price} sol</p>
              <button className="buy-button">Buy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

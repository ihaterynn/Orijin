import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import './profile.css';

import aevitas from '../graphics/aevitas.png';
import eldenring from '../graphics/eldenring.jpg';
import delysium from '../graphics/delysium.jpg';
import sekiro from '../graphics/sekiro.jpg';
import angelic from '../graphics/angelic.png';
import halo from '../graphics/halo.jpg'; // Halo game image
import profilePic from '../graphics/gangshi.jpg'; // New profile picture

const Profile = () => {
  const [ownedGames] = useState([
    { name: 'Aevitas', id: Math.random().toString(36).substring(7), price: '0.1', banner: aevitas },
    { name: 'Elden Ring', id: Math.random().toString(36).substring(7), price: '0.4', banner: eldenring },
    { name: 'Delysium', id: Math.random().toString(36).substring(7), price: '0.2', banner: delysium },
    { name: 'Sekiro', id: Math.random().toString(36).substring(7), price: '0.3', banner: sekiro }
  ]);

  const [soldGames] = useState([
    { name: 'Angelic', id: Math.random().toString(36).substring(7), price: '0.2', banner: angelic },
    { name: 'Halo', id: Math.random().toString(36).substring(7), price: '0.3', banner: halo } // Add Halo to soldGames
  ]);

  // Retrieve saved name and role from localStorage or use default values
  const [name, setName] = useState(() => localStorage.getItem('profileName') || 'Satoshi Nakamoto');
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState(() => localStorage.getItem('profileRole') || 'Trader');

  // Handle name change and save to localStorage
  const handleNameChange = (e) => {
    if (e.target.value.length <= 20) { // Limit to 20 characters
      const newName = e.target.value;
      setName(newName);
      localStorage.setItem('profileName', newName); // Save name to localStorage
    }
  };

  // Handle role change and save to localStorage
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    localStorage.setItem('profileRole', newRole); // Save role to localStorage
  };

  const toggleEditName = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="container">
        <aside className="profile-card">
          <img src={profilePic} alt="Profile" className="profile-picture" />

          {/* Editable Name */}
          <div className="profile-name-container">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="editable-name"
              />
            ) : (
              <h2 className="profile-name">{name}</h2>
            )}
            <span className="edit-icon" onClick={toggleEditName}>✏️</span>
          </div>

          {/* Role Dropdown */}
          <select
            value={role}
            onChange={handleRoleChange}
            className="role-select"
          >
            <option value="Gamer">Gamer</option>
            <option value="Trader">Trader</option>
            <option value="Developer">Developer</option>
          </select>

          {/* Static ID */}
          <div className="profile-id">
            <strong>ID:</strong> 010002947192001
          </div>

          <div className="profile-stats">
            <div><strong>0</strong><div>Followers</div></div>
            <div><strong>0</strong><div>Following</div></div>
          </div>
        </aside>

        <div className="main-content">
          <div className="section-card">
            <h2 className="section-title">Owned Games</h2>
            <div className="games-list">
              {ownedGames.map((game, index) => (
                <div className="game-card" key={index}>
                  <img src={game.banner} alt={game.name} className="game-banner" />
                  <p><strong>{game.name}</strong></p>
                  <p><strong>ID:</strong> {game.id}</p>
                  <p><strong>Price:</strong> {game.price} sol</p>
                  <button className="resell-button">Resell</button>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-title">Games Sold</h2>
            <div className="games-list">
              {soldGames.map((game, index) => (
                <div className="game-card" key={index}>
                  <img src={game.banner} alt={game.name} className="game-banner" />
                  <p><strong>{game.name}</strong></p>
                  <p><strong>ID:</strong> {game.id}</p>
                  <p><strong>Price:</strong> {game.price} sol</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

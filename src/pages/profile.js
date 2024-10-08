import React from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to Resell page
import Navbar from '../components/navbar';
import './profile.css';

import profilePic from '../graphics/gangshi.jpg'; 

const Profile = ({ ownedGames, soldGames }) => {
  const navigate = useNavigate();

  // Retrieve saved name and role from localStorage or use default values
  const [name, setName] = React.useState(() => localStorage.getItem('profileName') || 'Enter Name');
  const [isEditing, setIsEditing] = React.useState(false);
  const [role, setRole] = React.useState(() => localStorage.getItem('profileRole') || 'Role');

  // Handle name change and save to localStorage
  const handleNameChange = (e) => {
    if (e.target.value.length <= 20) {
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

  // Function to handle resell button click
  const handleResellClick = (game) => {
    navigate('/resell', { state: { game } }); // Navigate to Resell page, passing the game as state
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

          {/* Dropdown */}
          <select
            value={role}
            onChange={handleRoleChange}
            className="role-select"
          >
            <option value="Gamer">Gamer</option>
            <option value="Trader">Trader</option>
            <option value="Developer">Developer</option>
          </select>

          <div className="profile-id">
            <strong>ID:</strong> 010002947192001
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
                  <button
                    className="resell-button"
                    onClick={() => handleResellClick(game)}
                  >
                    Resell
                  </button>
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

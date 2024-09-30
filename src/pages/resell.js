import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './resell.css'; // Import the Resell CSS for styling
import Navbar from '../components/navbar';

const Resell = ({ ownedGames, setOwnedGames, soldGames, setSoldGames }) => {
  const [sellingPrice, setSellingPrice] = useState('');
  const [recipientID, setRecipientID] = useState(''); // Recipient ID input
  const location = useLocation(); // To access the game passed from the profile
  const game = location.state.game;
  const navigate = useNavigate();

  const developerRoyaltyFee = 0.05; // 5% developer royalty fee
  const transactionFee = 0.01; // 1% transaction fee

  // Calculate the amount seller receives after deducting fees
  const calculateYouReceive = () => {
    if (!sellingPrice) return 0;
    const totalFee = (developerRoyaltyFee + transactionFee) * parseFloat(sellingPrice);
    return (parseFloat(sellingPrice) - totalFee).toFixed(2);
  };

  const handleProceed = () => {
    if (!sellingPrice || !recipientID) {
      alert('Please enter both selling price and recipient ID.');
      return;
    }

    // Move the game to the Sold Games list
    const updatedOwnedGames = ownedGames.filter((g) => g.id !== game.id);
    setOwnedGames(updatedOwnedGames);
    setSoldGames([...soldGames, game]);

    // After completing the transaction, return to the profile page
    navigate('/profile');
  };

  return (
    <div className="resell-page">
      <Navbar />
      <div className="resell-container">
        <h2 className="resell-header">Confirm Resell</h2>

        <div className="input-container">
          <label htmlFor="sellingPrice">Selling Price (sol):</label>
          <input
            type="number"
            id="sellingPrice"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="Enter selling price"
            className="selling-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="recipientID">Recipient ID:</label>
          <input
            type="text"
            id="recipientID"
            value={recipientID}
            onChange={(e) => setRecipientID(e.target.value)}
            placeholder="Enter recipient account ID"
            className="recipient-input"
          />
        </div>

        <div className="buyer-info">
          <p><strong>Buyer Pays:</strong> {sellingPrice || 0} SOL</p>
          <p><strong>You Receive:</strong> {calculateYouReceive()} SOL</p>
        </div>

        <div className="fees-info">
          <p><strong>Developer Royalty Fee:</strong> 5%</p>
          <p><strong>Transaction Fee:</strong> 1%</p>
        </div>

        <button className="proceed-button" onClick={handleProceed}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Resell;

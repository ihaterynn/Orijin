import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, SystemProgram, Transaction, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey } from '@solana/web3.js';
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

// Fetch the recipient public key from environment variables
const connectRecipientPublicKey = (address) => {
  try {
    return new PublicKey(address);
  } catch (error) {
    console.error("Invalid recipient public key:", error);
    alert("Invalid recipient address. Please contact support.");
    return null;
  }
};

const Marketplace = ({ ownedGames, setOwnedGames }) => {
  const [genre, setGenre] = useState('All');
  const { publicKey, sendTransaction, connected } = useWallet();
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const games = [
    { name: 'Halo Infinite', studio: '343 Industries', price: '0.5', banner: halo, genre: 'Action' },
    { name: 'Infamous Second Son', studio: 'Sucker Punch Productions', price: '0.2', banner: infamous, genre: 'Action' },
    { name: 'Devil May Cry V', studio: 'Capcom', price: '0.4', banner: dmc5, genre: 'Adventure' },
    { name: 'Ghost of Tsushima', studio: 'Sucker Punch Productions', price: '0.3', banner: ghostoftsushima, genre: 'Adventure' },
    { name: 'The Witcher', studio: 'CD Projekt Red', price: '0.2', banner: theWitcher, genre: 'RPG' },
    { name: 'Aevitas', studio: 'Alchemist Pictures', price: '0.1', banner: aevitas, genre: 'Action' },
    { name: 'Elden Ring', studio: 'FromSoftware', price: '0.4', banner: eldenring, genre: 'RPG' },
    { name: 'Delysium', studio: 'RCT AI', price: '0.2', banner: delysium, genre: 'MMORPG' },
    { name: 'Sekiro', studio: 'FromSoftware', price: '0.3', banner: sekiro, genre: 'Adventure' },
    { name: 'Angelic', studio: 'Metaverse Games Studio', price: '0.2', banner: angelic, genre: 'Puzzles' }
  ];

  // Filter games based on selected genre
  const filteredGames = genre === 'All' ? games : games.filter(game => game.genre === genre);

  // Handle game purchase
  const handleBuyGame = async (game) => {
    console.log("Buy button clicked. Wallet connected:", connected);
    if (!connected) {
      alert("Please connect your wallet before making a purchase.");
      return;
    }

    try {
      // Fetch the recipient public key from environment variables
      const RECIPIENT_PUBLIC_KEY = process.env.REACT_APP_RECIPIENT_PUBLIC_KEY;
      if (!RECIPIENT_PUBLIC_KEY) {
        alert("Recipient public key is not set. Please contact support.");
        return;
      }

      const recipientPublicKey = connectRecipientPublicKey(RECIPIENT_PUBLIC_KEY);
      if (!recipientPublicKey) return;

      // Connect to the Solana blockchain
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

      // Get the latest blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');

      // Create a transaction to transfer game price
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,  // Wallet paying for the game
          toPubkey: recipientPublicKey,  // The recipient (seller/marketplace)
          lamports: game.price * LAMPORTS_PER_SOL,  // Convert SOL price to lamports
        })
      );

      // Set recent blockhash and fee payer
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Estimate the transaction fee
      const estimatedTransactionFee = await connection.getFeeForMessage(
        transaction.compileMessage(),
        'confirmed'
      );

      if (!estimatedTransactionFee || estimatedTransactionFee.value === undefined) {
        throw new Error('Failed to estimate transaction fee');
      }

      console.log(`Estimated Transaction Fee: ${estimatedTransactionFee.value / LAMPORTS_PER_SOL} SOL`);

      // Check if user has sufficient funds
      const userBalance = await connection.getBalance(publicKey);
      if (userBalance < game.price * LAMPORTS_PER_SOL + estimatedTransactionFee.value) {
        alert("Insufficient funds to cover the game price and transaction fee.");
        return;
      }

      // Confirm the transaction with the user
      const confirmed = window.confirm(
        `This game purchase will cost ${game.price} SOL plus an estimated transaction fee of ${(estimatedTransactionFee.value / LAMPORTS_PER_SOL).toFixed(4)} SOL. Do you want to proceed?`
      );
      if (!confirmed) {
        return;
      }

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction sent, signature:", signature);

      // Confirm the transaction
      const confirmation = await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature
      }, 'confirmed');

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
      }

      console.log("Transaction successful, signature:", signature);

      // Add purchased game to the owned games list
      const newGame = { ...game, id: Math.random().toString(36).substring(7) }; // Generate random ID
      setOwnedGames((prevOwnedGames) => [...prevOwnedGames, newGame]);

      alert("Thanks for purchasing the game!");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert(`Transaction failed: ${error.message}`);
    }
  };

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
              <p><small>{game.studio}</small></p>
              <p><strong>Price:</strong> {game.price} SOL</p>
              <button className="buy-button" onClick={() => handleBuyGame(game)}>Buy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

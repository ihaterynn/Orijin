import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Homepage from './pages/homepage';
import Profile from './pages/profile';
import Marketplace from './pages/marketplace';
import Resell from './pages/resell';  // Import the Resell component
import '@solana/wallet-adapter-react-ui/styles.css';

// Import the images from the src/graphics directory
import aevitasImg from './graphics/aevitas.png';
import eldenringImg from './graphics/eldenring.jpg';
import delysiumImg from './graphics/delysium.jpg';
import sekiroImg from './graphics/sekiro.jpg';
import angelicImg from './graphics/angelic.png';
import haloImg from './graphics/halo.jpg';

function App() {
  // Initialize with default owned games and sold games, using imported images
  const [ownedGames, setOwnedGames] = useState([
    { name: 'Aevitas', id: Math.random().toString(36).substring(7), price: '0.1', banner: aevitasImg },
    { name: 'Elden Ring', id: Math.random().toString(36).substring(7), price: '0.4', banner: eldenringImg },
    { name: 'Delysium', id: Math.random().toString(36).substring(7), price: '0.2', banner: delysiumImg },
    { name: 'Sekiro', id: Math.random().toString(36).substring(7), price: '0.3', banner: sekiroImg }
  ]);

  const [soldGames, setSoldGames] = useState([
    { name: 'Angelic', id: Math.random().toString(36).substring(7), price: '0.2', banner: angelicImg },
    { name: 'Halo', id: Math.random().toString(36).substring(7), price: '0.3', banner: haloImg }
  ]);

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="App">
            <Router basename="/Orijin">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route 
                  path="/profile" 
                  element={<Profile 
                    ownedGames={ownedGames} 
                    setOwnedGames={setOwnedGames} 
                    soldGames={soldGames} 
                    setSoldGames={setSoldGames} 
                  />} 
                />
                <Route 
                  path="/marketplace" 
                  element={<Marketplace 
                    ownedGames={ownedGames} 
                    setOwnedGames={setOwnedGames} 
                  />} 
                />
                <Route 
                  path="/resell" 
                  element={<Resell 
                    ownedGames={ownedGames} 
                    setOwnedGames={setOwnedGames} 
                    soldGames={soldGames} 
                    setSoldGames={setSoldGames} 
                  />} 
                />
              </Routes>
            </Router>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;

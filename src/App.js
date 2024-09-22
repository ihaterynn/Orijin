// src/App.js
import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Homepage from './pages/homepage';
import Profile from './pages/profile';
import Marketplace from './pages/marketplace';  
import '@solana/wallet-adapter-react-ui/styles.css'; 

function App() {
  const network = WalletAdapterNetwork.Devnet; // Change to mainnet or testnet if needed
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
                <Route path="/profile" element={<Profile />} />
                <Route path="/marketplace" element={<Marketplace />} />
              </Routes>
            </Router>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;

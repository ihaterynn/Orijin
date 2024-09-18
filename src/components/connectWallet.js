// src/components/ConnectWallet.js
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './connectWallet.css';

function ConnectWallet() {
    return (
        <div>
            <WalletMultiButton className="connect-wallet">CONNECT WALLET</WalletMultiButton> 
        </div>
    );
}

export default ConnectWallet;

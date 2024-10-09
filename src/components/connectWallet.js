import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react'; // Import the useWallet hook
import './connectWallet.css';

function ConnectWallet() {
    const { connected } = useWallet(); // Destructure the 'connected' state

    return (
        <div>
            <WalletMultiButton className="connect-wallet">
                {connected ? "CONNECTED" : "CONNECT WALLET"} {/* Conditional rendering */}
            </WalletMultiButton>
        </div>
    );
}

export default ConnectWallet;

// ProducerPage.js

import React from 'react';
import ProducerContract from '../components/ProducerContract';
import './styles/ConsumerPage.css'; // Import the CSS file for styling

const ProducerPage = () => {
    const contractAddress = "0xbee7ddD295b11b421c849ba060941bD1E17E0435";
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "units",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_prosumer",
                    "type": "address"
                }
            ],
            "name": "consumeUnits",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "units",
                    "type": "uint256"
                }
            ],
            "name": "generateUnits",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_prosumer",
                    "type": "address"
                }
            ],
            "name": "showGeneratedUnits",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    return (
        <div className="producer-page-container">
            <h1 className="page-title">Producer Page</h1>
            <div className="contract-container">
                <h2 className="section-title">Smart Contract Interaction</h2>
                <div className="input-container"> {/* Add container for inputs */}
                    <ProducerContract contractAddress={contractAddress} contractABI={contractABI} />
                </div>
            </div>
        </div>
    );
};

export default ProducerPage;

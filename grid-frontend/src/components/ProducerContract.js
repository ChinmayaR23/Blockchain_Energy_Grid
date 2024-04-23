// ProducerContract.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ProducerContract = ({ contractAddress, contractABI }) => {
    const [units, setUnits] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    useEffect(() => {
        async function fetchSelectedAccount() {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setSelectedAccount(accounts[0]);
                }
            }
        }
        fetchSelectedAccount();
    }, []);

    const generateUnits = async () => {
        const tx = await contract.generateUnits(units);
        await tx.wait();
        console.log("Electricity generated successfully");
        setUnits('');
    };

    const showGeneratedUnits = async () => {
        const units = await contract.showGeneratedUnits(selectedAccount);
        console.log("Generated units:", units.toString());
    };

    return (
        <div>
            <h2>Producer Contract Interaction</h2>
            <p>Currently connected MetaMask account: {selectedAccount}</p>
            <label htmlFor="units">Enter Units to Generate:</label><br/><br/>
            <input type="number" id="units" value={units} onChange={(e) => setUnits(e.target.value)} min="1" step="1" required /><br/><br/>
            <button onClick={generateUnits}>Generate Electricity</button><br/><br/>
            <button onClick={showGeneratedUnits}>Generated Units</button>
        </div>
    );
};

export default ProducerContract;

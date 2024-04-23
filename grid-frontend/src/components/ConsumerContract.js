// ConsumerContract.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ConsumerContract = ({ contractAddress, contractABI }) => {
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
                    setSelectedAccount(accounts[1]);
                }
            }
        }
        fetchSelectedAccount();
    }, []);

    const consumeUnits = async () => {
        // Calculate the total amount of Ether to transfer
        const etherPerUnit = ethers.utils.parseEther('0.01'); // 0.01 Ether per unit
        let totalEther = ethers.utils.parseUnits(units, 'wei').mul(etherPerUnit);
    
        // Add 0.002 ether to the totalEther value
        const additionalEther = ethers.utils.parseEther('0.002');
        totalEther = totalEther.add(additionalEther);
    
        // Create options object with gasLimit and value
        const options = {
            gasLimit: ethers.utils.hexlify(6000000), // Increase gas limit
            value: totalEther // Set the value in wei
        };
    
        // Call consumeUnits function with the calculated totalEther
        const tx = await contract.consumeUnits(units, selectedAccount, options);
        await tx.wait();
        console.log("Electricity consumed successfully");
        setUnits('');
    };
    
    
    
    
    
    
    


    return (
        <div>
            <h2>Consumer Contract Interaction</h2>
            <p>Currently connected MetaMask account: {selectedAccount}</p>
            <label htmlFor="units">Enter Units to Consume:</label><br/><br/>
            <input type="number" id="units" value={units} onChange={(e) => setUnits(e.target.value)} min="1" step="1" required /><br/><br/>
            <button onClick={consumeUnits}>Consume Electricity</button>
        </div>
    );
};

export default ConsumerContract;

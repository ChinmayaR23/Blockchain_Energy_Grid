import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Producer from './Producer';
import Consumer from './Consumer';
import './App.css';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        // Modern dapp browsers
        if (window.ethereum) {
          const _web3 = new Web3(window.ethereum);
          setWeb3(_web3);
          // Request account access if needed
          await window.ethereum.enable();
        }
        // Legacy dapp browsers
        else if (window.web3) {
          const _web3 = new Web3(web3.currentProvider);
          setWeb3(_web3);
        }
        // Non-dapp browsers
        else {
          setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
      } catch(error){
        console.log("some error")
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (web3) {
        const _accounts = await web3.eth.getAccounts();
        setAccounts(_accounts);
      }
    };

    fetchAccounts();
  }, [web3]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <header>
        <h1>Welcome to Smart Grid!</h1>
      </header>
      <main>
        <section className="intro-section">
          <h2>About Smart Grid</h2>
          <p>
            Smart Grid is a decentralized energy management system built on blockchain technology.
            It enables efficient energy distribution, consumption tracking, and renewable energy integration.
          </p>
        </section>
        <section className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Decentralized energy management</li>
            <li>Real-time consumption tracking</li>
            <li>Integration of renewable energy sources</li>
            <li>Secure transactions with blockchain</li>
          </ul>
        </section>
      </main>
      {accounts.length > 0 && (
        <div>
         
        </div>
      )}
    </div>
  );
};

export default App;

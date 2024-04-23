import React, { useState } from 'react';
import Web3 from 'web3';
import './stylesPages/Consumer.css'
const Consumer = ({ consumerContractAddress, consumerAbi }) => {
  const [prosumerAddress, setProsumerAddress] = useState('0xProsumerAddress');
  const [units, setUnits] = useState('');
  
  const handleConsumeUnits = async (event) => {
    event.preventDefault();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const consumerContract = new web3.eth.Contract(consumerAbi, consumerContractAddress);
    try {
      await consumerContract.methods.consumeUnits(units, prosumerAddress).send({
        from: accounts[1],
        value: units * 100000000000000000,
      });
      console.log('Units consumed successfully!');
    } catch (error) {
      console.error('Error consuming units:', error);
    }
  };

  return (
    <div className='consumerContainer'>
      <h2>Consumer</h2>
      <form onSubmit={handleConsumeUnits}>
        <input
          type="text"
          value={prosumerAddress}
          onChange={(e) => setProsumerAddress(e.target.value)}
          placeholder="Enter prosumer address"
          required
        /><br/>
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Enter units to consume"
          required
        /><br/><br/>
        <button type="submit">Consume Units</button>
      </form>
    </div>
  );
};

export default Consumer;

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './stylesPages/Producer.css'
const Producer = ({ producerContractAddress, producerAbi }) => {
  const [units, setUnits] = useState('');
  const [totalUnits, setTotalUnits] = useState({ account: '', units: 0 });
// State variable to store total units

  // Function to fetch total units from the fcontract
  const fetchTotalUnits = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const producerContract = new web3.eth.Contract(producerAbi, producerContractAddress);
    const fetchedTotalUnits = parseInt(await producerContract.methods.showGeneratedUnits(accounts[0]).call(), 10);
console.log(fetchedTotalUnits);

    setTotalUnits({ account: accounts[0], units: fetchedTotalUnits });
};


  useEffect(() => {
    fetchTotalUnits(); // Fetch total units when component mounts
  }, []); // Empty dependency array ensures it only runs once on component mount

  const handleGenerateUnits = async (event) => {
    event.preventDefault();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const producerContract = new web3.eth.Contract(producerAbi, producerContractAddress);
    try {
      await producerContract.methods.generateUnits(units).send({ from: accounts[0] });
      console.log('Units generated successfully!');
      fetchTotalUnits(); // Update total units after generating units
    } catch (error) {
      console.error('Error generating units:', error);
    }
  };

  const handleTotal = async () => {
    fetchTotalUnits(); // Fetch total units when button is clicked
  };

  return (
    <div className='Prodmodule'>
      <h2>Producer</h2>
      <form onSubmit={handleGenerateUnits}>
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Enter units to generate"
          required
        /><br/><br/>
        <button type="submit">Generate Units</button>
      </form>
      <h2>Total Units Produced</h2>
    <p>Account: {totalUnits.account}</p><br/>
    <p>Units: {totalUnits.units}</p><br/>
    <button onClick={fetchTotalUnits}>Fetch Total Units</button>
    </div>
  );
};

export default Producer;

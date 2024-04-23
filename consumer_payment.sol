// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;
import "./grid_producer.sol";

contract consumer{
    Producer public producerContract;
    constructor(address _producerContract){
        producerContract = Producer(_producerContract);
    }
    function consumeUnits(uint units , address payable _prosumer)external  payable {
        producerContract.consumeUnits(units, _prosumer);
        _prosumer.transfer(units * 100000000000000000 wei);
    }
    
}


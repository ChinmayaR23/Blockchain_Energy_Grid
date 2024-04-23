// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Producer{
    address payable private producer;
    address payable private consumer;
    mapping (address => uint) units_produced;
   
    function generateUnits(uint units) public {
        units_produced[msg.sender] += units;
    }

    mapping (address => uint) units_consumed;

    function consumeUnits(uint units , address _prosumer)   public {
        require(units_produced[_prosumer] - units >= 0 , "You are demanding more than produced");
        units_produced[_prosumer] = units_produced[_prosumer] - units;
        units_consumed[_prosumer] += units;
    }
    function showGeneratedUnits(address _prosumer) view  public returns(uint){
        return units_produced[_prosumer];
    }
    


}

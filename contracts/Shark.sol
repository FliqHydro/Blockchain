pragma solidity ^0.4.18;

contract Shark {
    string[10] public species;
    address[] public owners;
    mapping (address => SharkObject) owners
    struct SharkObject {
        uint speed;
        uint strength;
        string type;
    }

    function createBasicShark() public {
        owners[msg.sender] = SharkObject(10, 10, "black tip reef shark");
    } 

    function trainShark() public {
        owners[msg.sender]; 
        // TODO: Increase Speed or Strength
    }  
    //TODO: Double check struct syntax
    function getShark() public view returns (struct) {
        return owners[msg.sender];

    }
}

pragma solidity ^0.4.18;

contract Shark {
    string[10] public species;
    address[] public owners;
    struct SharkObject {
        uint speed;
        uint strength;
        string type;
    }

    function createBasicShark() public {
        owners[SharkObject(10, 10, "black tip reef shark")] = msg.sender;        
    }   
}
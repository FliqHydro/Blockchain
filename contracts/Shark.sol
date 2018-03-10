pragma solidity ^0.4.18;

contract Shark {
    string[10] public species;
    SharkObject[] public sharks;
    mapping (uint => address) owners;
    mapping (address=> uint) ownerSharkCount;
    struct SharkObject {
        uint speed;
        uint strength;
        string typeOfShark;
        uint winCount;
        uint level;
        uint lossCount;
    }

    function createBasicShark() public {
        uint id = sharks.push(SharkObject(10, 10, "blacktip reef shark", 0, 1, 0)) - 1;
        owners[id] = msg.sender;
        ownerSharkCount[msg.sender]++;
    } 

    function trainShark(uint _sharkId) public {
        require(msg.sender == owners[_sharkId]);
        sharks[_sharkId].speed ++;
        sharks[_sharkId].strength ++; 
        // TODO: Increase Speed or Strength
    }  
    //TODO: Double check struct syntax
    function getShark() public view returns (uint[]) {
        uint[] memory result = new uint[](ownerSharkCount[msg.sender]);
        uint counter = 0;
        for (uint i = 0; i < sharks.length; i++) {
            if (owners[i] == msg.sender) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}

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

    modifier onlyOwnerOf(uint _sharkId) {
        require(msg.sender == owners[_sharkId]);
        _;
    }

    function createBasicShark() public {
        uint id = sharks.push(SharkObject(10, 10, "blacktip reef shark", 0, 1, 0)) - 1;
        owners[id] = msg.sender;
        ownerSharkCount[msg.sender]++;
    } 

    function trainShark(uint _sharkId) public onlyOwnerOf(_sharkId) {
        sharks[_sharkId].speed ++;
        sharks[_sharkId].strength ++; 
    }  

    function getShark(uint _sharkId) public onlyOwnerOf(_sharkId) returns (uint speed, uint strenght, string typeOfShark, uint winCount, uint level, uint lossCount) {
      SharkObject storage shark = sharks[_sharkId];
      return (shark.speed, shark.strength, shark.typeOfShark, shark.winCount, shark.level, shark.lossCount);
    }

    function getSharks() public view returns (uint[]) {
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

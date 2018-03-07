pragma solidity ^0.4.18;

import "./Shark.sol";

contract SharkRace is Shark {
  uint randNonce = 0;
  uint attackVictoryProbability = 70;

  function randMod(uint _modulus) internal returns(uint) {
    randNonce++;
    return uint(keccak256(now, msg.sender, randNonce)) % _modulus;
  }

  function sharkRace(uint _sharkId, uint _targetId) external  {
    require (msg.sender == owners[_sharkId]);
    SharkObject storage myShark = sharks[_sharkId];
    SharkObject storage enemyShark = sharks[_targetId];
    uint rand = randMod(100);
    if (rand <= attackVictoryProbability) {
//myShark.winCount++;
      //myShark.level++;
      //enemyShark.lossCount++;

    } else {
      myShark.lossCount++;
      enemyShark.winCount++;
    }
    
  }
}
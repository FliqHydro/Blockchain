var Shark = artifacts.require("./Shark.sol");
var SharkRace = artifacts.require("./SharkRace.sol");

// var ERC721 = artifacts.require("./erc721.sol");
// var SafeMath = artifacts.require("./SafeMath.sol");

var SharkOwnership = artifacts.require("./SharkOwnership.sol");

module.exports = function(deployer) {
  deployer.deploy(Shark);
  deployer.deploy(SharkRace);

  // deployer.deploy(ERC721);
  // deployer.deploy(SafeMath);

  deployer.deploy(SharkOwnership);
};

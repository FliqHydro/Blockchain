// var ConvertLib = artifacts.require("./ConvertLib.sol");
var Shark = artifacts.require("./Shark.sol");

module.exports = function(deployer) {
  deployer.deploy(Shark);
};

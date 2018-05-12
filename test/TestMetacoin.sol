pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Shark.sol";

// contract TestMetacoin {

//   function testInitialBalanceUsingDeployedContract() public {
//     MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());

//     uint expected = 10000;

//     Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
//   }

//   function testInitialBalanceWithNewMetaCoin() public {
//     MetaCoin meta = new MetaCoin();

//     uint expected = 10000;

//     Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
//   }

// }

contract TestShark {
  // function beforeEach() {
  //   someValue = 5;
  // }

  function testInitialBalanceUsingDeployedContract() public {
    Shark shark = Shark(DeployedAddresses.Shark());
    shark.createBasicShark();

    uint expected = 10000;

    // Assert.equal(shark.getBalance(tx.origin), expected, "Owner should have 10000 Shark initially");
    // Assert.equal(shark.species(), expected, "Owner should have 10000 Shark initially");
  }

  // function testInitialBalanceWithNewMetaCoin() public {
  //   Shark shark = new Shark();

  //   uint expected = 10000;

  //   Assert.equal(shark.getBalance(tx.origin), expected, "Owner should have 10000 Shark initially");
  // }

}

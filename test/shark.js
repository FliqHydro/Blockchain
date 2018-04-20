var Shark = artifacts.require("./Shark.sol");

contract('Shark', function(accounts) {
  it("access the shark owners", function() {
    var account_one = accounts[0];
    var shark;
    return Shark.deployed().then((instance) => {
      shark = instance;
      return instance.getSharks.call();
    })
      .then((balance) => {
        assert.equal(balance.length, 0, "No owners initially");
        return shark.createBasicShark();
      })
      .then((block) => {

        return shark.getSharks.call();

      })
      .then((sharkArray) => {

        assert.equal(sharkArray.length, 1, "Add one shark after calling createBasicShark");

      })

  });
});

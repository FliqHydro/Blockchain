var Shark = artifacts.require("./Shark.sol");
var SharkRace = artifacts.require("./SharkRace.sol");

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

  it("can train a shark", function() {
    var account_one = accounts[0];
    var shark;
    var sharkId;
    return Shark.deployed().then((instance) => {
      shark = instance;
      return instance.getSharks.call();
    })
      .then((sharkArray) => {
        sharkId = sharkArray[0].toNumber();

        assert.equal(sharkArray.length, 1, "Theres a shark already assigned to the shark");

        return shark.getShark.call(sharkId);
      })
      .then((data) => {
        let speed = 10;
        let strength = 10;
        let type = 'blacktip reef shark';
        let winCount = 0;
        let level = 1;
        let lossCount = 0;

        assert.equal(data[0], speed, "The speed of the shark is 10");
        assert.equal(data[1], strength, "The strength of the shark is 10");
        assert.equal(data[2], type, "The type of shark is a: " + type);
        assert.equal(data[3], winCount, "The win count of the shark is 0");
        assert.equal(data[4], level, "The level of the shark is 1");
        assert.equal(data[5], lossCount, "The loss count of the shark is 0");

        return shark.trainShark(sharkId);
      })
      .then((data) => {
        return shark.getShark.call(sharkId);
      })
      .then((data) => {
        let speed = 11;
        let strength = 11;
        let type = 'blacktip reef shark';
        let winCount = 0;
        let level = 1;
        let lossCount = 0;

        assert.equal(data[0], speed, "The speed of the shark is 11");
        assert.equal(data[1], strength, "The strength of the shark is 11");
        assert.equal(data[2], type, "The type of shark is a: " + type);
        assert.equal(data[3], winCount, "The win count of the shark is 0");
        assert.equal(data[4], level, "The level of the shark is 1");
        assert.equal(data[5], lossCount, "The loss count of the shark is 0");

        return shark.trainShark(sharkId);
      })


  });
});

contract('SharkRace', function(accounts) {

  it("able to  race shark", function() {
    var account_one = accounts[0];
    var account_two = accounts[1];
    var shark;
    var sharkId;
    var enemySharkId;
    var enemyShark;

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
        sharkId = sharkArray[0].toNumber();

        assert.equal(sharkArray.length, 1, "Add one shark after calling createBasicShark");
        return shark.getShark.call(sharkId);
      })
      .then((data) => {
        let speed = 10;
        let strength = 10;
        let type = 'blacktip reef shark';
        let winCount = 0;
        let level = 1;
        let lossCount = 0;

        assert.equal(data[0], speed, "The speed of the shark is 10");
        assert.equal(data[1], strength, "The strength of the shark is 10");
        assert.equal(data[2], type, "The type of shark is a: " + type);
        assert.equal(data[3], winCount, "The win count of the shark is 0");
        assert.equal(data[4], level, "The level of the shark is 1");
        assert.equal(data[5], lossCount, "The loss count of the shark is 0");

        return shark.createBasicShark( {from: account_two})
      })
      .then((block) => {

        return shark.getSharks.call( {from: account_two} );

      })
      .then((sharkArray) => {
        enemySharkId = sharkArray[0].toNumber();

        assert.equal(sharkArray.length, 1, "Add one shark after calling createBasicShark");
        return shark.getShark.call(enemySharkId);
      })
      .then((data) => {
        let speed = 10;
        let strength = 10;
        let type = 'blacktip reef shark';
        let winCount = 0;
        let level = 1;
        let lossCount = 0;

        assert.equal(data[0], speed, "The speed of the shark is 10");
        assert.equal(data[1], strength, "The strength of the shark is 10");
        assert.equal(data[2], type, "The type of shark is a: " + type);
        assert.equal(data[3], winCount, "The win count of the shark is 0");
        assert.equal(data[4], level, "The level of the shark is 1");
        assert.equal(data[5], lossCount, "The loss count of the shark is 0");

        return SharkRace.deployed().then((instance) => {
          instance.sharkRace(sharkId, enemySharkId)
        })
          .then((data) => {
            console.log(data)
          })

      })

  });

});

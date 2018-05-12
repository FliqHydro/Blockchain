import "../stylesheets/app.css";

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import shark_artifacts from '../../build/contracts/Shark.json'
import shark_race_artifacts from '../../build/contracts/SharkRace.json'
import shark_ownership_artifacts from '../../build/contracts/SharkOwnership.json'

var Shark = contract(shark_artifacts);
var SharkRace = contract(shark_race_artifacts);
var SharkOwnership = contract(shark_ownership_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    Shark.setProvider(web3.currentProvider);
    SharkRace.setProvider(web3.currentProvider);
    SharkOwnership.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.error("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      self.setEventHandlers();
    });
  },

  setEventHandlers: function() {
    var self = this;

    // Creating a basic shark from the index page
    $("#basicShark").click(function(e) {
      var shark

      Shark.deployed().then((instance) => {
        shark = instance;

        return shark.createBasicShark({from: account})
      }).then((data) => {
        alert('Shark created, start training now!');
      }).catch((e) => {
        console.error(e)
        alert('There was an error');
      })
    })

    // Get sharks
    $("#getSharks").click(function(e) {
      var shark

      Shark.deployed().then((instance) => {
        shark = instance;

        return shark.getSharks({from: account})
      }).then((data) => {

        $("#ownedSharks").empty();

        data.forEach((id) => {

          shark.getShark(id, {from: account}).then((shark) => {

            $("#ownedSharks").append(`
              <tr>
                <th scope="row">${shark[2]}</th>
                <td>${shark[4]}</td>
                <td>
                  <span class="strength">${shark[1]}</span>
                  <button class="btn btn-secondary">Train Strength</button>
                </td>
                <td>
                  <span class="speed">${shark[0]}</span>
                  <button class="btn btn-secondary">Train Speed</button>
                </td>
              </tr>`)

          })


        })

      }).catch((e) => {
        console.error(e)
        alert('There was an error');
      })
    })

  },

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});

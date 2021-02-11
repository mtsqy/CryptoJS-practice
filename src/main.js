const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('05b89bb7173d4263ce4cb1f8e993898c008a271b577094656cfdc5e96257c346');
const myWalletAddress = myKey.getPublic('hex');

let cryptoCoin = new Blockchain();

// Create first transaction
const tx1 = new Transaction(myWalletAddress, 'address2', 10);
tx1.signTranscation(myKey);

// Mine Block
cryptoCoin.addTransaction(tx1);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 5);
tx2.signTranscation(myKey);
cryptoCoin.addTransaction(tx2);

console.log(`Starting the miner...`)
cryptoCoin.minePendingTransaction(myWalletAddress)

console.log(`Balance of user is ${cryptoCoin.getBalanceOfAddress(myWalletAddress)}`)

cryptoCoin.chain[1].amount = 1;

console.log('Blockchain valid?', cryptoCoin.isChainValid() ? 'Yes' : 'No');



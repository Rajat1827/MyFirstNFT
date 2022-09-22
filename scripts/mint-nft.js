require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

console.log(JSON.stringify(contract.abi));

const contractAddress = "0xC5074631Ee582cC0001250b9C03331D3E2F43F75";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmYgHk5GBCeReKdnxQMr44MFr8qem8gupEhznK8YvLFe7W"
);
  
//The hash of your transaction is:  0x6827d81f04ba578f92c844cd248404647646b07fc37346f54e9d0c5e278e4593 
//The hash of your transaction is:  0x42ef90c0790bb3ccc6b93f0188c6b2610730d2b7e2fece60db6ef481666046ee 
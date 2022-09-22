async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT");
  
    
    const myNFT = await MyNFT.deploy();
    console.log("Contract deployed to address:", myNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

    //Contract deployed to address: 0xC5074631Ee582cC0001250b9C03331D3E2F43F75
const { expect } = require("chai");

describe("Defi contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let camping
  let campingContract
  let MyToken
  let ERC20
 
 
it("Deploy the contract ", async function(){
  
  [  per1, per2 ] = await ethers.getSigners();

  campingContract = await hre.ethers.getContractFactory("campingContract");
  camping = await campingContract.deploy();
  await camping.deployed();
  console.log("smart contract deploy here ",camping.address);

  MyToken = await hre.ethers.getContractFactory("MyToken");
  ERC20 = await MyToken.deploy();
  await ERC20.deployed();
  console.log("smart contract deploy here ",ERC20.address);

 })


it("this is call to mint function ", async function(){

  const mint= await ERC20.mint(per1.address,1000);
  const balance = await ERC20.balanceOf(per1.address);
  console.log("this is owner minted balance ## ",balance.toString());

})

it("This is approve function call ",async function(){
  const cheek = await ERC20.approve(camping.address,1000000000000000);
})


it("This is Tokenaddress function call ",async function(){
  const cheek = await camping.ERC20Token(ERC20.address);
})

it("this is call for stratCamping camping function ", async function(){
  const mint= await camping.stratCamping(10);
})


it("This is transfer function call",async function(){
  const cheek = await camping.connect(camping.address).transfer(camping.address,1);
  const Contractbalance = await camping.balanceOf(camping.address);
  console.log("Contractbalance && : ",Contractbalance.toString());
})

// it("this is withdrawCampingAmount call ",async function(){
//   const withdraw= await camping.withdrawCampingAmount(1);
//   const balance = await camping.balanceOf(per2.address);
//   const Contractbalance = await camping.balanceOf(camping.address);
//   console.log("after withdraw Contract balance && : ",Contractbalance.toString());
//   console.log("after withdraw sender balance ## ",balance.toString());
// });


// it("this is withdrawCampingAmount call ",async function(){
//     const withdraw= await camping.AllAmountWithdraw();
//     const balance = await ERC20.balanceOf(per1.address);
//     const Contractbalance = await camping.balanceOf(camping.address);
//     console.log("after withdraw Contract balance && : ",Contractbalance.toString());
//     console.log("after withdraw sender balance ## ",balance.toString());
//   });

// // await network.provider.send("evm_increaseTime", [3600])
// // await network.provider.send("evm_mine")
    

    
});

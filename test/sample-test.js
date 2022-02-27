const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

// const { BN, constants, expectEvent, expectRevert} = require('@openzeppelin/test-helpers')
// const { expect, assert } = require("chai");
// const { ethers, upgrades, network } = require("hardhat");

// var ExploitMe1, ExploitMe2;
// var Exploitor1, Exploitor2;
// var Alice, Bob, Charlie;

// const DECIMALS = 18;
// function weiToEthEn(wei) { return Number(ethers.utils.formatUnits(wei.toString(), DECIMALS)).toLocaleString('en') }
// function weiToEth(wei) { return Number(ethers.utils.formatUnits(wei.toString(), DECIMALS)) }
// function ethToWei(eth) { return ethers.utils.parseUnits(eth.toString(), DECIMALS); }
// function uiAddr(address) { return "{0x" + address.substring(2, 6).concat('...') + "}" ; }

// describe("Build a test bed", function () {

// 	it("Test signers, defined in your hardhat.config.js, are ready.".green, async function () {
// 		[Master, Alice, Bob, Charlie] = await ethers.getSigners();
// 		console.log("\tMaster's address = %s, balance = %s ETH.", uiAddr(addr = await Master.getAddress()), weiToEthEn(await ethers.provider.getBalance(addr)) );
// 		console.log("\tAlice's address = %s, balance = %s ETH.", uiAddr(addr = await Alice.getAddress()), weiToEthEn(await ethers.provider.getBalance(addr)) );
// 		console.log("\tBob's address = %s, balance = %s ETH.", uiAddr(addr = await Bob.getAddress()), weiToEthEn(await ethers.provider.getBalance(addr)) );
// 		console.log("\tCharlie's address = %s, balance = %s ETH.", uiAddr(addr = await Charlie.getAddress()), weiToEthEn(await ethers.provider.getBalance(addr)) );
// 	});

//   it("Deploy ExploitMe contracts.", async function () {
//     var Factory = await ethers.getContractFactory("ExploitMe1", Alice);
//     ExploitMe1 = await Factory.deploy();
//     await ExploitMe1.deployed();

//     var balance = await ethers.provider.getBalance(ExploitMe1.address);
//     console.log("\tExploitMe1 was deployed with ETH balance: %s ETH.", balance);

//     Factory = await ethers.getContractFactory("ExploitMe2", Alice);
//     ExploitMe2 = await Factory.deploy();
//     await ExploitMe2.deployed();

//     var balance = await ethers.provider.getBalance(ExploitMe2.address);
//     console.log("\tExploitMe2 was deployed with ETH balance: %s ETH.", balance);

//   });

//   it("Deploy Exploitor contracts.", async function () {
//     var Factory = await ethers.getContractFactory("Exploitor", Bob);
//     Exploitor1 = await Factory.deploy(ExploitMe1.address);
//     await Exploitor1.deployed();

//     var amount = 10;
//     var tx = await Bob.sendTransaction({
//       to: Exploitor1.address,
//       value: ethToWei(amount),
//     });
//     tr = await tx.wait();

//     var balance = await ethers.provider.getBalance(Exploitor1.address);
//     console.log("\tExploitor1 was deployed with ExploitMe1, and received %s ETH.", amount);

//     Factory = await ethers.getContractFactory("Exploitor", Bob);
//     Exploitor2 = await Factory.deploy(ExploitMe2.address);
//     await Exploitor2.deployed();

//     var amount = 10;
//     var tx = await Bob.sendTransaction({
//       to: Exploitor2.address,
//       value: ethToWei(amount),
//     });
//     await tx.wait();

//     var balance = await ethers.provider.getBalance(Exploitor2.address);
//     console.log("\tExploitor2 was deployed with ExploitMe2, and received %s ETH.", amount);
//   });
// });

// describe("Deposit more than 1 ether on Explo in a single block.\n", function () {

//   it("Deposit 1 ETH directly.".yellow, async function () {
//     var balance = await ethers.provider.getBalance(ExploitMe1.address);
//     console.log("\tTester: balance of ExploitMe1: %s ETH.", weiToEthEn(balance) );

//     var amount = 1;
//     var tx = await Alice.sendTransaction({
//       to: ExploitMe1.address,
//       value: ethToWei(amount),
//     });
//     await tx.wait();
//     console.log("\tAlice sent %s ETH to ExploitMe1.".yellow, amount.toLocaleString('En'));

//     var balance = await ethers.provider.getBalance(ExploitMe1.address);
//     console.log("\tTester: balance of ExploitMe1: %s ETH.", weiToEthEn(balance) );
//   });

//   it("Deposit on ExploitMe1 in a trickish manner.".yellow, async function () {

//     Exploitor1 = Exploitor1.connect(Charlie);

//     var balance0 = (await ExploitMe1.deposits(Charlie.address)).balance;
//     console.log("\tCharlie: Balance0 = ", BigInt(balance0));

//     var tx = await Exploitor1.depositTricky(2);
//     await tx.wait();

//     var balance1 = (await ExploitMe1.deposits(Charlie.address)).balance;
//     console.log("\tCharlie: Balance1 = ", BigInt(balance1));

//     console.log("\tCharlie: Balance increment = ", BigInt(balance1) - BigInt(balance0) );
//   });

//   it("Deposit, once more, on ExploitMe1 in a trickish manner.".yellow, async function () {

//     Exploitor1 = Exploitor1.connect(Charlie);

//     var balance0 = (await ExploitMe1.deposits(Charlie.address)).balance;
//     console.log("\tCharlie: Balance0 = ", BigInt(balance0));

//     var tx = await Exploitor1.depositTricky(5);
//     await tx.wait();

//     var balance1 = (await ExploitMe1.deposits(Charlie.address)).balance;
//     console.log("\tCharlie: Balance1 = ", BigInt(balance1));

//     console.log("\tCharlie: Balance increment = ", BigInt(balance1) - BigInt(balance0) );
//   });

//   it("Deposit on ExploitMe2 in a trickish manner.".yellow, async function () {

//     Exploitor2 = Exploitor2.connect(Charlie);

//     var balance0 = (await ExploitMe2.deposits(Charlie.address)).balance;
//     console.log("\tCharlie: Balance0 = ", BigInt(balance0));

//     var tx = await Exploitor2.depositTricky(5);
//     await tx.wait();

//     var balance1 = (await ExploitMe2.deposits(Charlie.address)).balance;
//     console.log("\tCharlie: Balance1 = ", BigInt(balance1));

//     console.log("\tCharlie: Balance increment = ", BigInt(balance1) - BigInt(balance0) );
//   });

//   it("Deposit, once more, on ExploitMe2 in a trickish manner.".yellow, async function () {

//     Exploitor2 = Exploitor2.connect(Charlie);

//     var balance0 = (await ExploitMe2.deposits(Charlie.address)).balance;
//     console.log("\tCharlie: Balance0 = ", BigInt(balance0));

//     var tx = await Exploitor2.depositTricky(5);
//     await tx.wait();

//     var balance1 = (await ExploitMe2.deposits(Charlie.address)).balance;
//     console.log("\tCharlie: Balance1 = ", BigInt(balance1));

//     console.log("\tCharlie: Balance increment = ", BigInt(balance1) - BigInt(balance0) );
//   });

// });

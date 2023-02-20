import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Seasonal Bridge Bsc test network", () => {
  const adminAddress = "0x76c4945D01D7D2861fB0ad52FC01297959E10fB0";
  let Token;
  let springToken: Contract,
    summerToken: Contract,
    autumnToken: Contract,
    winterToken: Contract,
    bscBridgeContract: Contract,
    deployer: SignerWithAddress,
    admin: SignerWithAddress;
  describe("Deploy", () => {
    it("Should deploy the contracts", async () => {
      [deployer, admin] = await ethers.getSigners();

      console.log("deployer: ", deployer.address);
      console.log("admin: ", adminAddress);

      Token = await ethers.getContractFactory("Spring");
      springToken = await Token.deploy(adminAddress);
      await springToken.deployed();
      console.log("springToken address: ", springToken.address);

      // Token = await ethers.getContractFactory("Summer");
      // summerToken = await Token.deploy(adminAddress);
      // await summerToken.deployed();
      // console.log("summerToken address: ", summerToken.address);

      // Token = await ethers.getContractFactory("Autumn");
      // autumnToken = await Token.deploy(adminAddress);
      // await autumnToken.deployed();
      // console.log("autumnToken address: ", autumnToken.address);

      // Token = await ethers.getContractFactory("Winter");
      // winterToken = await Token.deploy(adminAddress);
      // await winterToken.deployed();
      // console.log("winterToken address: ", winterToken.address);

      console.log(
        "springToken verify: ",
        `npx hardhat verify --contract "contracts/Spring.sol:Spring" --network bscTestnet ${springToken.address} ${adminAddress}`
      );
      // console.log(
      //   "summerToken verify: ",
      //   `npx hardhat verify --contract "contracts/Summer.sol:Summer" --network bscTestnet ${summerToken.address} ${adminAddress}`
      // );
      // console.log(
      //   "autumnToken verify: ",
      //   `npx hardhat verify --contract "contracts/Autumn.sol:Autumn" --network bscTestnet ${autumnToken.address} ${adminAddress}`
      // );
      // console.log(
      //   "winterToken verify: ",
      //   `npx hardhat verify --contract "contracts/Winter.sol:Winter" --network bscTestnet ${winterToken.address} ${adminAddress}`
      // );

      const BscBridgeContract = await ethers.getContractFactory("BscBridge");
      bscBridgeContract = await BscBridgeContract.deploy(adminAddress);
      console.log("bscBridgeContract address: ", bscBridgeContract.address);
      console.log(
        "bscBridgeContract verify: ",
        `npx hardhat verify --contract "contracts/BscBridge.sol:BscBridge" --network bscTestnet ${bscBridgeContract.address} ${adminAddress}`
      );
    });
  });
});

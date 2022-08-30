import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import "hardhat-etherscan-abi";
import "solidity-coverage";
import "hardhat-deploy";
import { task } from "hardhat/config";
import { compileSetting } from "./scripts/deployTool";
import { RPCS } from "./scripts/network";


const dotenv = require("dotenv");
dotenv.config();
// import Colors = require("colors.ts");
// Colors.enable();

task("accounts", "Prints the list of accounts", async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    let address = await account.getAddress();
    console.log(
      address,
      (await bre.ethers.provider.getBalance(address)).toString()
    );
  }
});

// task("deploy", "deploy contract")
//   .setAction(
//     async ({ wtoken }, { ethers, run, network }) => {
//       await run("compile");
//       const [deployer] = await ethers.getSigners();

//       const factory = await deployContract(
//         "contracts/ERC721AMint.sol:ERC721AMint",
//         network.name,
//         ethers.getContractFactory,
//         deployer
//       ) as ERC721AMint;
//     }
//   );
// // npx hardhat getroot --json ./leaves.json
// task("getroot", "set root")
//   .addParam("json", "json file")
//   .setAction(
//     async ({ json }, { ethers, run, network }) => {
//       let jsonArr = JSON.parse(readFileSync(json).toString());
//       let hashArr:any[] = [];
//       for (let i = 0; i < jsonArr.length; i++) {
//         hashArr[i] = utils.defaultAbiCoder.encode(["uint256", "address"], [BN(jsonArr[i].amount), jsonArr[i].address]);
//       }
//       const leaves = hashArr.map(x => ethers.utils.keccak256(x));
//       const tree = new MerkleTree(leaves, ethers.utils.keccak256, { sort: true });
//       const root = "0x" + tree.getRoot().toString('hex')
//       console.log('root:', root)
//     }
//   );
// // npx hardhat makeproof --json ./leaves.json
// task("makeproof", "make proof")
//   .addParam("json", "json file")
//   .setAction(
//     async ({ json }, { ethers, run, network }) => {
//       let jsonArr = JSON.parse(readFileSync(json).toString());
//       let hashArr:any[] = [];
//       for (let i = 0; i < jsonArr.length; i++) {
//         hashArr[i] = utils.defaultAbiCoder.encode(["uint256", "address"], [BN(jsonArr[i].amount), jsonArr[i].address]);
//       }
//       const leaves = hashArr.map(x => ethers.utils.keccak256(x));
//       const tree = new MerkleTree(leaves, ethers.utils.keccak256, { sort: true });
//       const root = "0x" + tree.getRoot().toString('hex')

//       console.log(root)

//       for (let i = 0; i < jsonArr.length; i++) {
//         const leaf = ethers.utils.keccak256(hashArr[i]);
//         const proof = tree.getHexProof(leaf);
//         jsonArr[i].proof = (JSON.stringify(proof)).replace(/\"/g, '');
//         jsonArr[i].leaf = leaf;
//         console.log("verify:", tree.verify(proof, leaf, root))
//         console.log("proof", proof)
//       }
//       writeFileSync(json, JSON.stringify(jsonArr));

//     }
//   );

// task("veri", "verify contracts").setAction(
//   async ({ }, { ethers, run, network }) => {
//     if (allowVerifyChain.indexOf(network.name) > -1) {
//       await run(
//         "verify:verify",
//         getContractJson(network.name, "ERC20MintablePauseableUpgradeable")
//       );
//     }
//   }
// );

export default {
  networks: RPCS,
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY,
  },
  solidity: {
    compilers: [compileSetting("0.8.4", 200)],
  },
  mocha: {
    timeout: 200000,
  },
};

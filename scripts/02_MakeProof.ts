import { Deploy } from "./Deploy";
import { ethers } from "hardhat";
import { utils } from 'ethers';
import { readFileSync, writeFileSync } from "fs";
import { MerkleTree } from 'merkletreejs';

const json = './Addresses.json';

async function main() {
  let jsonArr = JSON.parse(readFileSync(json).toString());
  let hashArr: any[] = [];
  for (let i = 0; i < jsonArr.length; i++) {
    hashArr[i] = utils.defaultAbiCoder.encode(["address"], [jsonArr[i].address]);
  }
  const leaves = hashArr.map(x => ethers.utils.keccak256(x));
  const tree = new MerkleTree(leaves, ethers.utils.keccak256, { sort: true });
  const root = "0x" + tree.getRoot().toString('hex')

  console.log('root', root)

  for (let i = 0; i < jsonArr.length; i++) {
    const leaf = ethers.utils.keccak256(hashArr[i]);
    const proof = tree.getHexProof(leaf);
    jsonArr[i].proof = (JSON.stringify(proof)).replace(/\"/g, '');
    jsonArr[i].leaf = leaf;
    console.log("verify:", tree.verify(proof, leaf, root))
    console.log("proof", proof)
  }
  writeFileSync(json, JSON.stringify(jsonArr));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

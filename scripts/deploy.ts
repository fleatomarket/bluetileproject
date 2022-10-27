import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();

  const BlueTile = await ethers.getContractFactory('BlueTile');
  const blueTile = await BlueTile.deploy(owner.address, {});

  await blueTile.deployed();

  console.log(
    `BlueTile contract with owner ${owner.address} deployed to ${blueTile.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

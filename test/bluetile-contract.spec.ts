import '@nomiclabs/hardhat-ethers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BlueTileContract } from '../src';
import { BlueTile } from '../typechain-types';

describe('BlueTile', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBlueTileFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, minter, friend, stranger, buyer] = await ethers.getSigners();

    const BlueTile = await ethers.getContractFactory('BlueTile');
    const blueTile = await BlueTile.deploy(owner.address);

    return { blueTile, owner, minter, friend, stranger, buyer };
  }

  describe('Scenarios', () => {
    let blueTile: BlueTile;
    this.beforeAll(async () => {
      const { blueTile: contract } = await loadFixture(deployBlueTileFixture);
      blueTile = contract;
    });
    it('Should deploy', async function () {
      const { blueTile } = await loadFixture(deployBlueTileFixture);
      expect(blueTile.address).to.be.not.empty;
    });
    it('tile doesnt exist', async () => {
      const [, minter] = await ethers.getSigners();
      const blueTileContract = new BlueTileContract(blueTile.address, minter);
      const result = await blueTileContract.idExists('0x01');
      expect(result).to.equal(false);
    });
    it('should mint new tile', async () => {
      const [owner, minter] = await ethers.getSigners();
      const blueTileContract = new BlueTileContract(blueTile.address, owner);
      await blueTileContract.mintId(minter.address, '0x01', 100);
      const result = await blueTileContract.idExists('0x01');
      expect(result).to.equal(true);
    });
    it('cant mint same tile again', async () => {
      const [owner, minter] = await ethers.getSigners();
      const blueTileContract = new BlueTileContract(blueTile.address, owner);
      //eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await expect(
        blueTileContract.mintId(minter.address, '0x01', 100)
      ).to.be.revertedWith('BlueTileProject: tile already minted');
    });
    it('should mint by tile array', async () => {
      const [owner, minter] = await ethers.getSigners();
      const tiles = [
        9, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
      ];
      const blueTileContract = new BlueTileContract(blueTile.address, owner);
      await blueTileContract.mint(minter.address, tiles, 100);
      const result = await blueTileContract.idExists(
        '0x4d6784905ce917a8811bbc752a4f2089c43afc9b2cdd5c1be4d4a25cc7873178'
      );
      expect(result).to.equal(true);
    });
    it('can transfer', async () => {
      const [, minter, friend] = await ethers.getSigners();
      const blueTileContract = new BlueTileContract(blueTile.address, minter);
      await blueTileContract.transfer(
        minter.address,
        friend.address,
        '0x01',
        25
      );
      const myBalance = await blueTileContract.balanceOf(
        minter.address,
        '0x01'
      );
      const friendsBalance = await blueTileContract.balanceOf(
        friend.address,
        '0x01'
      );
      expect(myBalance).to.equal(75);
      expect(friendsBalance).to.equal(25);
    });
    it('only owner can mint', async () => {
      const [, minter] = await ethers.getSigners();
      const blueTileContract = new BlueTileContract(blueTile.address, minter);
      //eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await expect(
        blueTileContract.mintId(minter.address, '0x02', 100)
      ).to.be.revertedWith('BlueTileProject: must have minter role to mint');
    });
  });
});

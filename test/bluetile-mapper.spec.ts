import '@nomiclabs/hardhat-ethers';
import { expect } from 'chai';
import { tilesToNFT } from '../src/bluetile-mapper';

describe('BlueTile Mapper', function () {
  describe('Scenarios', () => {
    it('From Tiles to NFT', function () {
      const tiles = [
        9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
      const nftId = tilesToNFT(tiles);
      expect(nftId).to.equal(
        '0x1ecbce438b70553aff86f88672dab7075ffa731ddd0713875b6f9659522f71ce'
      );
    });
  });
});

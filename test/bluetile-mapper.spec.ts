import '@nomiclabs/hardhat-ethers';
import { expect } from 'chai';
import { tilesToNFT, titleToData } from '../src/bluetile-mapper';

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
    it('From Title to id', function () {
      const data = titleToData("hello world");
      expect(data).to.equal(
        '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'
      );
    });
  });
});

import { ethers } from 'ethers';

export const tilesToNFT = (tiles: number[]): string => {
  const dataHexString = ethers.utils.hexlify(tiles);
  const hash = ethers.utils.keccak256(dataHexString);
  return hash;
};

export const titleToData = (title: string): string => ethers.utils.id(title);

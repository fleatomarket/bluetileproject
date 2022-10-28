import { ethers } from 'ethers';
import { BlueTile__factory } from '../typechain-types';
import { BlueTile } from '../typechain-types/contracts/BlueTile';
import { tilesToNFT, titleToData } from './bluetile-mapper';

// import BlueTileContractJson from "../artifacts/contracts/BlueTile.sol/BlueTile.json";

// const BlueTileContractABI = BlueTileContractJson.abi;

export class BlueTileContract {
  contract: BlueTile;
  constructor(
    contractAddress: string,
    signerOrProvider: ethers.Signer | ethers.providers.Provider
  ) {
    this.contract = BlueTile__factory.connect(
      contractAddress,
      signerOrProvider
    );
  }

  async exists(tiles: number[]): Promise<boolean> {
    const id = tilesToNFT(tiles);
    return await this.idExists(id);
  }

  async idExists(id: string): Promise<boolean> {
    return await this.contract.exists(id);
  }

  async mint(
    to: string,
    tiles: number[],
    title: string,
    quantity: number
  ): Promise<string> {
    const id = tilesToNFT(tiles);
    const titleData = titleToData(title);
    await this.mintId(to, id, titleData, quantity);
    return id;
  }

  async mintId(
    to: string,
    id: string,
    data: string,
    quantity: number
  ): Promise<ethers.ContractTransaction> {
    return await this.contract.mint(to, id, quantity, data);
  }

  async transfer(
    from: string,
    to: string,
    id: string,
    dataString: string,
    quantity: number
  ): Promise<ethers.ContractTransaction> {
    return await this.contract.safeTransferFrom(
      from,
      to,
      id,
      quantity,
      ethers.utils.id(dataString)
    );
  }

  async approveAll(
    operator: string,
    approved: boolean
  ): Promise<ethers.ContractTransaction> {
    return await this.contract.setApprovalForAll(operator, approved);
  }

  async balanceOf(account: string, id: string): Promise<number> {
    return (await this.contract?.balanceOf(account, id))?.toNumber() ?? 0;
  }
}

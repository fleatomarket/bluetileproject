import { ethers } from 'ethers';
import { BlueTile__factory } from '../typechain-types';
import { BlueTile } from '../typechain-types/contracts/BlueTile';

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

  async exists(id: string): Promise<boolean> {
    return await this.contract.exists(id);
  }

  async mint(
    to: string,
    id: string,
    quantity: number
  ): Promise<ethers.ContractTransaction> {
    return await this.contract.mint(to, id, quantity, '0x00');
  }

  async transfer(
    from: string,
    to: string,
    id: string,
    quantity: number
  ): Promise<ethers.ContractTransaction> {
    return await this.contract.safeTransferFrom(from, to, id, quantity, '0x00');
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

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import './BlueTileMinterPauser.sol';
import './ERC1155Royalty.sol';

/**
 * @title FleatoNFT
 * Fleato NFT contract
 */
contract BlueTile is AccessControlEnumerable, BlueTileMinterPauser,ERC1155Supply, ERC1155Royalty {
    /**
     * @dev Mints `initialSupply` amount of token and transfers them to `owner`.
     * Allows royalty, and receiver to be set
     * 
     */
    constructor(
        address owner
    ) BlueTileMinterPauser('https://btp.fleato.com/{id}.json') {

    }

    /**
     * @dev See {ERC1155-_beforeTokenTransfer}.
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155Royalty, ERC1155Supply, BlueTileMinterPauser) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC1155Royalty, BlueTileMinterPauser, ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TroopNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(address => uint256[]) public mynfts;

  constructor() ERC721("Troop NFT", "TRP") {}

  mapping(address => Troop[]) public userTroops;

  struct Troop {
    uint256 id;
    uint256 hp;
    string url;
    bool isDeployed;
  }

  function mint(address _to, string memory _tokenURI_) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(_to, newItemId);
    _setTokenURI(newItemId, _tokenURI_);
    mynfts[_to].push(newItemId);
    userTroops[msg.sender].push(Troop(newItemId, 3, "/spacetroop.png", false));

    _tokenIds.increment();
    return newItemId;
  }

  function getMyNFTs(address _owner) public view returns (Troop[] memory){
    return userTroops[_owner];
  }
}
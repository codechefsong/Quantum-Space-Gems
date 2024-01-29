// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TroopNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(address => uint256[]) public mynfts;

  constructor() ERC721("Troop NFT", "TRP") {}

  Troop[] public troops;
  mapping(address => uint256[]) public userTroops;

  struct Troop {
    uint256 id;
    uint256 nftId;
    uint256 hp;
    uint256 oxygenAmount;
    string url;
    bool isDeployed;
  }

  function mint(address _to, string memory _tokenURI_) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(_to, newItemId);
    _setTokenURI(newItemId, _tokenURI_);
    mynfts[_to].push(newItemId);
    troops.push(Troop(newItemId, newItemId, 3, 30, "/spacetroop.png", false));
    userTroops[_to].push(newItemId);

    _tokenIds.increment();
    return newItemId;
  }

  function getMyNFTs(address _owner) public view returns (Troop[] memory){
    Troop[] memory newTroops = new Troop[](userTroops[_owner].length);

    for (uint i = 0; i < userTroops[_owner].length; i++) {
      Troop memory newTroop = troops[userTroops[_owner][i]];
      newTroops[i] = newTroop;
    }

    return newTroops;
  }

  function getNonDeployTroops(address _owner) public view returns (Troop[] memory){
    uint troopsCount = 0;
    uint troopsId = 0;
   
    for (uint i = 0; i < userTroops[_owner].length; i++) {
      if (troops[userTroops[_owner][i]].isDeployed == false) {
        troopsCount += 1;
      }
    }

    Troop[] memory nonDeployTroops = new Troop[](troopsCount);

    for (uint i = 0; i < userTroops[_owner].length; i++) {
      if (troops[userTroops[_owner][i]].isDeployed == false) {
        Troop memory newTroop = troops[userTroops[_owner][i]];
        nonDeployTroops[troopsId] = newTroop;
      }
    }

    return nonDeployTroops;
  }

  function setTroopDeployed(uint256 id) public {
    troops[id].isDeployed = true;
  }

  function usedOxygen(uint256 id, uint256 amount) public {
    if (amount > troops[id].oxygenAmount) {
      troops[id].oxygenAmount = 0;
      troops[id].isDeployed = false;
    }
    else{
      troops[id].oxygenAmount -= amount;
    }
  }

  function getOxygen(uint256 id, uint256 amount) public {
    troops[id].oxygenAmount += amount;
  }

  function loseHP(uint256 id) public {
    troops[id].hp -= 1;
    if ( troops[id].hp == 0) {
      troops[id].isDeployed = false;
    }
  }
}
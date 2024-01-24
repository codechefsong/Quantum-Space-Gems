// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./GemToken.sol";
import "./TroopNFT.sol";

contract SpaceETH {
    GemToken public gemToken;
    TroopNFT public troopNFT;

    address public immutable owner;
    Box[] public grid;
    uint256[] public nums;
    mapping(uint256 => GemField) public gemFields;

    struct Box {
        uint256 index;
        uint256 id;
        string typeGrid;
        string content;
        uint256 nftId;
        uint256 up;
        uint256 down;
        uint256 left;
        uint256 right;
    }

    struct GemField {
        uint256 index;
        uint256 position;
        uint256 hp;
        address owner;
        uint256 startdate;
    }

    constructor(address _owner, address _tokenAddress, address _nftAddress) {
        owner = _owner;
        gemToken = GemToken(_tokenAddress);
        troopNFT = TroopNFT(_nftAddress);

        grid.push(Box(0, 0, "base", "-", 0, 999, 6, 999, 1));
        grid.push(Box(1, 1, "base", "-", 0, 999, 7, 0, 2));
        grid.push(Box(2, 2, "base", "-", 0, 999, 8, 1, 3));
        grid.push(Box(3, 3, "base", "-", 0, 999, 9, 2, 4));
        grid.push(Box(4, 4, "base", "-", 0, 999, 10, 3, 5));
        grid.push(Box(5, 5, "base", "-", 0, 999, 11, 4, 999));
        
        grid.push(Box(6, 6, "base", "-", 0, 0, 12, 999, 7));
        grid.push(Box(7, 7, "base", "-", 0, 1, 13, 6, 8));
        grid.push(Box(8, 8, "base", "-", 0, 2, 14, 7, 9));
        grid.push(Box(9, 9, "base", "-", 0, 3, 15, 8, 10));
        grid.push(Box(10, 10, "base", "-", 0, 4, 16, 9, 11));
        grid.push(Box(11, 11, "base", "-", 0, 5, 17, 10, 999));

        grid.push(Box(12, 12, "base", "-", 0, 6, 18, 999, 13));
        grid.push(Box(13, 13, "base", "-", 0, 7, 19, 12, 14));
        grid.push(Box(14, 14, "base", "-", 0, 8, 20, 13, 15));
        grid.push(Box(15, 15, "base", "-", 0, 9, 21, 14, 16));
        grid.push(Box(16, 16, "base", "-", 0, 10, 22, 15, 17));
        grid.push(Box(17, 17, "base", "-", 0, 11, 23, 16, 999));

        grid.push(Box(18, 18, "base", "-", 0, 12, 24, 999, 19));
        grid.push(Box(19, 19, "base", "-", 0, 13, 25, 18, 20));
        grid.push(Box(20, 20, "base", "-", 0, 14, 26, 19, 21));
        grid.push(Box(21, 21, "base", "-", 0, 15, 27, 20, 22));
        grid.push(Box(22, 22, "base", "-", 0, 16, 28, 21, 23));
        grid.push(Box(23, 23, "base", "-", 0, 17, 29, 22, 999));

        grid.push(Box(24, 24, "base", "-", 0, 18, 999, 999, 25));
        grid.push(Box(25, 25, "base", "-", 0, 19, 999, 24, 26));
        grid.push(Box(26, 26, "base", "-", 0, 20, 999, 25, 27));
        grid.push(Box(27, 27, "base", "-", 0, 21, 999, 26, 28));
        grid.push(Box(28, 28, "base", "-", 0, 22, 999, 27, 29));
        grid.push(Box(29, 29, "base", "-", 0, 23, 999, 28, 999));

        gemFields[1] = GemField(0, 1, 3, address(0), 0);
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function getGrid() public view returns (Box[] memory){
        return grid;
    }

    function getNums() public view returns (uint256[] memory){
        return nums;
    }

    function getGemFieldByID(uint256 index) public view returns (GemField memory){
        return gemFields[index];
    }

    function placeSpaceShip(uint256 index, uint256 nftId) public {
        grid[index].content = "0";
        grid[index].nftId = nftId;

        nums.push(index);
        troopNFT.setTroopDeployed(nftId);
    }

    function movePlayer(uint256 oldIndex, uint256 newIndex) public {
        Box memory data1 = grid[oldIndex];
        Box memory data2 = grid[newIndex];
        grid[oldIndex].content = data2.content;
        grid[oldIndex].nftId = data2.nftId;
        grid[newIndex].content = data1.content;
        grid[newIndex].nftId = data1.nftId;

        troopNFT.usedOxygen(data1.nftId, 1);
    }

    function attackTroop(uint256 nftId, uint256 defenderIndex) public {
        Box memory defender = grid[defenderIndex];

        troopNFT.usedOxygen(nftId, 5);
        troopNFT.loseHP(defender.nftId);
    }

    function capture(uint256 id) public {
        GemField storage gem = gemFields[id];
        gem.hp -= 3;

        Box memory currentBox = grid[id];
        troopNFT.usedOxygen(currentBox.nftId, 3);

        if (gem.hp == 0) {
            gem.owner = msg.sender;
            gem.startdate = block.timestamp;
            gem.hp += 3;
        }
    }

    function mineGem(uint256 id) public {
        GemField storage gem = gemFields[id];
        require(gem.owner == msg.sender, "You do not own this gem fields");

        uint256 amount = block.timestamp - gem.startdate;
        gemToken.mint(msg.sender, 1 * amount);
        gem.startdate = block.timestamp;

        Box memory currentBox = grid[id];
        troopNFT.usedOxygen(currentBox.nftId, 10);
    }

    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    receive() external payable {}
}
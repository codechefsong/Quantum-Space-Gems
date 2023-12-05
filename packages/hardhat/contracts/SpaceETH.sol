// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./GemToken.sol";

contract SpaceETH {
    GemToken public gemToken;

    address public immutable owner;
    Box[] public grid;
    uint256[] public nums;
    mapping(uint256 => GemField) public gemFields;

    struct Box {
        uint256 index;
        uint256 id;
        string typeGrid;
        string content;
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

    constructor(address _owner, address _tokenAddress) {
        owner = _owner;
        gemToken = GemToken(_tokenAddress);

        grid.push(Box(0, 0, "base", "-", 999, 6, 999, 1));
        grid.push(Box(1, 1, "base", "-", 999, 7, 0, 2));
        grid.push(Box(2, 2, "base", "-", 999, 8, 1, 3));
        grid.push(Box(3, 3, "base", "-", 999, 9, 2, 4));
        grid.push(Box(4, 4, "base", "-", 999, 10, 3, 5));
        grid.push(Box(5, 5, "base", "-", 999, 11, 4, 999));
        
        grid.push(Box(6, 6, "base", "-", 0, 12, 999, 7));
        grid.push(Box(7, 7, "base", "-", 1, 13, 6, 8));
        grid.push(Box(8, 8, "base", "-", 2, 14, 7, 9));
        grid.push(Box(9, 9, "base", "-", 3, 15, 8, 10));
        grid.push(Box(10, 10, "base", "-", 4, 16, 9, 11));
        grid.push(Box(11, 11, "base", "-", 5, 17, 10, 999));

        grid.push(Box(12, 12, "base", "-", 6, 18, 999, 13));
        grid.push(Box(13, 13, "base", "-", 7, 19, 12, 14));
        grid.push(Box(14, 14, "base", "-", 8, 20, 13, 15));
        grid.push(Box(15, 15, "base", "-", 9, 21, 14, 16));
        grid.push(Box(16, 16, "base", "-", 10, 22, 15, 17));
        grid.push(Box(17, 17, "base", "-", 11, 23, 16, 999));

        grid.push(Box(18, 18, "base", "-", 12, 24, 999, 19));
        grid.push(Box(19, 19, "base", "-", 13, 25, 18, 20));
        grid.push(Box(20, 20, "base", "-", 14, 26, 19, 21));
        grid.push(Box(21, 21, "base", "-", 15, 27, 20, 22));
        grid.push(Box(22, 22, "base", "-", 16, 28, 21, 23));
        grid.push(Box(23, 23, "base", "-", 17, 29, 22, 999));

        grid.push(Box(24, 24, "base", "-", 18, 999, 999, 25));
        grid.push(Box(25, 25, "base", "-", 19, 999, 24, 26));
        grid.push(Box(26, 26, "base", "-", 20, 999, 25, 27));
        grid.push(Box(27, 27, "base", "-", 21, 999, 26, 28));
        grid.push(Box(28, 28, "base", "-", 22, 999, 27, 29));
        grid.push(Box(29, 29, "base", "-", 23, 999, 28, 999));

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

    function placeSpaceShip(uint256 index) public {
        grid[index].content = "0";

        nums.push(index);
    }

    function movePlayer(uint256 oldIndex, uint256 newIndex) public {
        Box memory data1 = grid[oldIndex];
        Box memory data2 = grid[newIndex];
        grid[oldIndex] = data2;
        grid[newIndex] = data1;
        grid[oldIndex].index = data1.index;
        grid[oldIndex].id = data1.id;
        grid[newIndex].index = data2.index;
        grid[newIndex].id = data2.id;
    }

    function capture(uint256 id) public {
        GemField storage gem = gemFields[id];
        gem.hp -= 3;

        if (gem.hp == 0) {
            gem.owner = msg.sender;
            gem.startdate = block.timestamp;
            gem.hp += 3;
        }
    }

    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    receive() external payable {}
}
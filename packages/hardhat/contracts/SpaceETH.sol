// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract SpaceETH {
    address public immutable owner;
    Box[] public grid;
    uint256[] public nums;

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

    constructor(address _owner) {
        owner = _owner;

        grid.push(Box(0, 0, "base", "-", 999, 5, 999, 1));
        grid.push(Box(1, 1, "base", "-", 999, 6, 0, 2));
        grid.push(Box(2, 2, "base", "-", 999, 7, 1, 3));
        grid.push(Box(3, 3, "base", "-", 999, 8, 2, 4));
        grid.push(Box(4, 4, "base", "-", 999, 9, 3, 999));
        grid.push(Box(5, 5, "base", "-", 0, 10, 999, 6));
        grid.push(Box(6, 6, "base", "-", 1, 11, 5, 7));
        grid.push(Box(7, 7, "base", "-", 2, 12, 6, 8));
        grid.push(Box(8, 8, "base", "-", 3, 13, 7, 9));
        grid.push(Box(9, 9, "base", "-", 4, 14, 8, 999));
        grid.push(Box(10, 10, "base", "-", 5, 16, 999, 11));
        grid.push(Box(11, 11, "base", "-", 6, 17, 10, 12));
        grid.push(Box(12, 12, "base", "-", 7, 18, 11, 13));
        grid.push(Box(13, 13, "base", "-", 8, 19, 12, 14));
        grid.push(Box(14, 14, "base", "-", 9, 15, 13, 999));
        grid.push(Box(15, 15, "base", "-", 10, 20, 999, 16));
        grid.push(Box(16, 16, "base", "-", 11, 21, 15, 17));
        grid.push(Box(17, 17, "base", "-", 12, 22, 16, 18));
        grid.push(Box(18, 18, "base", "-", 13, 23, 17, 19));
        grid.push(Box(19, 19, "base", "-", 14, 24, 18, 999));
        grid.push(Box(20, 20, "base", "-", 15, 999, 999, 21));
        grid.push(Box(21, 21, "base", "-", 16, 999, 20, 22));
        grid.push(Box(22, 22, "base", "-", 17, 999, 21, 23));
        grid.push(Box(23, 23, "base", "-", 18, 999, 22, 24));
        grid.push(Box(24, 24, "base", "-", 19, 999, 23, 999));
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

    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    receive() external payable {}
}
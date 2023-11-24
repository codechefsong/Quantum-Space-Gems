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
    }

    constructor(address _owner) {
        owner = _owner;

        uint256 id = 0;

        for (uint256 row = 0; row < 5; row++) {
            for (uint256 col = 0; col < 5; col++) {
                grid.push(Box(id, id, "base", "-"));
                id++;
            }
        }
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

    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    receive() external payable {}
}
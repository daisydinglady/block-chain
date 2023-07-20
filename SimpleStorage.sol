// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract SimpleStorage {
    uint256 public favourateNumber;

    function setNum(uint256 _num) public {
        favourateNumber = _num;
    }

    function getNum() public view returns (uint256) {
        return favourateNumber;
    }
}

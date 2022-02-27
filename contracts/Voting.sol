// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract Voting is Ownable {
	string public proposal;
	uint public agrees;
	uint public disagrees;
	bool public voted = false;
	event Proposal();
	mapping(address=>uint) votes;

	constructor() {
		
	}

	function addText(string memory _proposal) public {
		proposal = _proposal;
        emit Proposal();
	}

	function setAgree() public {
		address _account = msg.sender;
		require(votes[_account]==0, "already taken");
		agrees++;
		voted = true;
		votes[_account] = 1;
	}
	
	function setDisagree() public {
		address _account = msg.sender;
		require(votes[_account]==0, "already taken");
		disagrees++;
		voted = true;
		votes[_account] = 2;
	}
}
pragma solidity ^0.4.18;

import "./SharkRace.sol";
import "./erc721.sol";
import "./SafeMath.sol";

contract SharkOwnership is SharkRace, ERC721 {

    using SafeMath for uint256;

    mapping (uint => address) sharkApprovals;

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerSharkCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return owners[_tokenId];
    }

     function _transfer(address _from, address _to, uint256 _tokenId) private {
            ownerSharkCount[_to] = ownerSharkCount[_to].add(1);
        ownerSharkCount[_from] = ownerSharkCount[_from].sub(1);
        owners[_tokenId] = _to;
        Transfer(_from, _to, _tokenId);
     }

    function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
       
    }

    function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        sharkApprovals[_tokenId] = _to;
        Approval(msg.sender, _to, _tokenId);
        
    }

    function takeOwnership(uint256 _tokenId) public {
        require(sharkApprovals[_tokenId] == msg.sender);
        address owner = owners[_tokenId];
        _transfer(owner, msg.sender, _tokenId);
    }
}

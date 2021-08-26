// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol';
import "./Nft.sol";
contract IPFSStore {
    using Counters for Counters.Counter;
    Counters.Counter private tokenId;
    event NewToken(uint256 indexed info, Nft token);
    struct IPFSInfo {
        uint tokenId;
        string name;
        string IPFSLink;
        string hash;
    }
    mapping(uint => Nft) public tokenByID;
    IPFSInfo [] private allTokens;
    function createToken(string memory _name, string memory _symbol, string memory _hash, string memory _IPFSLink) public {
        Nft _token = new Nft( _name, _symbol);
        _token.mint(msg.sender, tokenId.current(), _hash, _IPFSLink );
        tokenByID[tokenId.current()] = _token;
        allTokens.push (IPFSInfo({
            tokenId: tokenId.current(),
            name: _name,
            IPFSLink: _IPFSLink,
            hash: _hash
            }));
        emit NewToken(tokenId.current(), _token);
        tokenId.increment();
    }
    function getAllTokens () public view returns (IPFSInfo [] memory Tokens){
        Tokens = allTokens;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;
import "https://github.com/0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";
/**
 * @dev This is an example contract implementation of NFToken with metadata extension.
 */
contract Nft is
NFTokenMetadata,
Ownable
{
    mapping (uint256 => string) tokenHashMap;
    mapping (uint256 => string) tokenIPFSURIMap;
    /**
     * @dev Contract constructor. Sets metadata extension `name` and `symbol`.
     */
    constructor(string memory _nftName, string memory _nftSymbol)
    {
        nftName = _nftName;
        nftSymbol = _nftSymbol;
    }
    /**
     * @dev Mints a new NFT.
     * @param _to The address that will own the minted NFT.
     * @param _tokenId of the NFT to be minted by the msg.sender.
     * @param _uri String representing RFC 3986 URI.
     */
    function mint(
        address _to,
        uint256 _tokenId,
        string calldata _uri,
        string calldata _hash
    )
    external
    onlyOwner
    {
        super._mint(_to, _tokenId);
        tokenHashMap[_tokenId] = _hash;
        tokenIPFSURIMap[_tokenId] = _uri;
        super._setTokenUri(_tokenId, _uri);
    }
    function getTokenHash( uint256 tokenId) public view returns(string memory hash){
        return tokenHashMap[tokenId];
    }
    function getTokenURI( uint256 tokenId) public view returns(string memory hash){
        return tokenHashMap[tokenId];
    }
}
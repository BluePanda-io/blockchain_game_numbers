pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract NFT  {

    using SafeMath for uint;


    string public name = "NFT Game";

    string public symbol = "NFTG";

    //mapping from token ID to owner address
    mapping (uint256 => address) private _tokenOwner;

    //mapping from owner to number of owened tokens
    mapping (address => uint256) private _OwnedTokensCount;

    event Transfer(address indexed from, address indexed to,uint256 value);


    // array to store the NFTs
    string [] public NFTs;
    mapping(string => bool) private _NFT_exists;

    constructor() public {
        
    }

    function _mint(address _to, uint256 _tokenId) internal {
        require(_to!=address(0), 'ERC721: minting to the zero address');
        require(_tokenOwner[_tokenId]==address(0),'ERC721: token already exist'); // Require that this token ID dont exist 

        _tokenOwner[_tokenId] = _to;
        _OwnedTokensCount[_to] = _OwnedTokensCount[_to].add(1);


        emit Transfer(address(0),_to,_tokenId);

        _addTokensToAllTokenEnumarate(_to,_tokenId);
    }

    function mint(string memory _NFT) public {

        require(_NFT_exists[_NFT]==false,'NFT: error already excist');
     
        NFTs.push(_NFT);


        uint _id = NFTs.length - 1;

        _mint(msg.sender,_id);


        _NFT_exists[_NFT] = true;

        
    }


    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner!=address(0), 'ERC721 balanceOf: Address is not zero');

        return _OwnedTokensCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address) {
        address _owner = _tokenOwner[_tokenId];

        require(_owner!=address(0), 'ERC721 ownerOf: we dont have an owner');

        return _owner;
    }



    //  ---------------------------- enumerable of the Tokens ----------------

    uint256[] private _allTokens; // We have all the tokens that was minted


    mapping(uint256 => uint256) private _allTokensIndex; // maping from tokenId to position in _allTokens Array

    mapping(address => uint256[]) private _ownedTokens; // maping from owner to list of all owner token ids

    mapping(uint256 => uint256) private _ownedTokensIndex;// mapping from token ID to findex of the owner tokens list 
    // basically we say for the tokenId were is on the list of the users tokens


    function _addTokensToAllTokenEnumarate( address to, uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;

        _ownedTokens[to].push(tokenId);
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;

        _allTokens.push(tokenId);
    }

    function totalSupply() public view returns(uint256){
        return _allTokens.length;
    }

    function tokenByIndex(uint256 index) public view returns (uint256){
        require(index<totalSupply(),"global insdex is out of bouds!");
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner,uint256 index) public view returns (uint256){
        require(index<_ownedTokens[owner].length,"global insdex is out of bouds!");

        return _ownedTokens[owner][index];
    }
    //  ---------------------------- enumerable of the Tokens ----------------


    //  ---------------------------- Transfer NFTs ----------------

    mapping (uint256 => address) private _tokenApprovals;


    function transferFrom (address _from, address _to,uint256 _tokenId) public returns (bool){

        require(_tokenOwner[_tokenId]!=address(0),'ERC721: token already exist'); // Require that this token ID dont exist 

        require(_to!=address(0),'ERC721: address dont excist '); // Require that this token ID dont exist 

        require(_from==_tokenOwner[_tokenId],'ERC721: You need to actually have the NFT'); // Require that this token ID dont exist 


        
        _tokenOwner[_tokenId] = _to; // change who is the owner of this tokenId

        _OwnedTokensCount[_from] = _OwnedTokensCount[_from].sub(1);
        _OwnedTokensCount[_to] = _OwnedTokensCount[_to].add(1);

        //delete element from _ownedTokens


        emit Transfer(_from,_to,_tokenId);


        return (true);
    }

    //  ---------------------------- Transfer NFTs ----------------


}
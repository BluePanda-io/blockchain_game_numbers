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


}
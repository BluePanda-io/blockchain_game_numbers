pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract Token {
    using SafeMath for uint;


    string public name = "My Name";

    string public symbol = "TR";

    uint256 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor() public {
        totalSupply = 1000000 * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }


    function transfer(address _to, uint256 _value) public returns (bool success) {
        // require(msg.sender!='0x0000000000000000');
        require(balanceOf[msg.sender]>=_value);
        // balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        // balanceOf[_to] = balanceOf[_to] + _value;

        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);

        return(true);
    }


}

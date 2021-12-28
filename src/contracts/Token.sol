pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract Token {
    using SafeMath for uint;


    string public name = "My Name";

    string public symbol = "TR";

    uint256 public maxAllowanceCoin = 400;

    uint256 public decimals = 18;
    uint256 public totalSupply;

    address public gameAddress;
    uint256 public speedTokenGeneration = 100;

    uint256 public betValueGame = 5;




    mapping(address => uint256) public balanceOf;
    mapping(address => uint) public timeStampLastPlay;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to,uint256 value);
    event Approve(address indexed owner, address indexed spender,uint256 value);
    // indexed means taht we can subscrive to events that only are connected to us 

    constructor() public {
        totalSupply = 1000000 * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;

        gameAddress = msg.sender;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender]>=_value);
        
        
        _transfer(msg.sender,_to,_value);

        return(true);
    }



    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to!=address(0));

        balanceOf[_from] = balanceOf[_from].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);

        emit Transfer(_from, _to,_value);

    }

    

    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_spender!=address(0));
        allowance[msg.sender][_spender] = allowance[msg.sender][_spender].add(_value);

        emit Approve(msg.sender, _spender,_value);

        return (true);

    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(balanceOf[_from]>=_value);
        require(allowance[_from][msg.sender]>=_value);

        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
        _transfer(_from,_to,_value);

        return (true);
    }

    function transferFromGame(address _from, address _to, uint256 _value) public returns (bool success){
        require(balanceOf[_from]>=_value);
        require(allowance[_from][msg.sender]>=_value);

        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
        _transfer(_from,_to,_value);

        return (true);
    }

    function _allowedTokensToPlay(address _from) internal {

        if (timeStampLastPlay[_from]==0){
            allowance[gameAddress][_from] = (maxAllowanceCoin*60)/100;
            // allowance[gameAddress][_from] = maxAllowanceCoin;

            timeStampLastPlay[_from] = block.timestamp;
        } else {

            uint256 differenceTime = block.timestamp.sub(timeStampLastPlay[_from]);

            uint256 extraAllowance = (maxAllowanceCoin*differenceTime)/speedTokenGeneration;


            if (extraAllowance!=0){

                allowance[gameAddress][_from] = allowance[gameAddress][_from].add(extraAllowance);

                if (allowance[gameAddress][_from]>maxAllowanceCoin){
                    allowance[gameAddress][_from] = maxAllowanceCoin;
                }

                timeStampLastPlay[_from] = block.timestamp;

            }
            
        }
        
    }

    function allowedTokensToPlay() public returns (bool success){

       _allowedTokensToPlay(msg.sender);

        return (true);
    }

    function startGame() public returns (bool success){ // Here we are starting the game and then in the front end we are deciding and sending the prices! (so here we are just getting cash fromt the user in order for him to have the ability to participate on the game)

       _allowedTokensToPlay(msg.sender); // Check How much coins you allow to play before

        require(allowance[gameAddress][msg.sender]>=betValueGame); // You need to have allowance of coins to play

        if (balanceOf[msg.sender]>betValueGame){
            balanceOf[msg.sender] = balanceOf[msg.sender].sub(betValueGame); // You bet this amount of your coin
            
            // allowance[gameAddress][msg.sender] = allowance[gameAddress][msg.sender].sub(betValueGame); // And comes out of your allowance too

        }


        return (true);
    }


}

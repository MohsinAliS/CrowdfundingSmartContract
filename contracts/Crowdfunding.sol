// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract campingContract {
    

    mapping (address=> mapping(uint256 => data)) public record;
   
    uint256 recordId;
    IERC20 token;
    
    struct data{
    uint256 sendingAmount;
    }


   
    bool camping;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public targetAmount;
    

    function ERC20Token(address _token)public{
         token = IERC20(_token);
    }


    function stratCamping(uint256 _targetAmount) public { 
        require(block.timestamp>endTime,"camping is runnig");
        require(balanceCheek()==0,"Remain balance is in account");
        targetAmount=_targetAmount*10**18;
        camping = true;
        startTime =block.timestamp;
        endTime = block.timestamp + 30;
    } 
    
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(block.timestamp<endTime,"you cant send because camping is ended");
        recordId++;
        console.log("msg.sender",msg.sender);
        token.transferFrom(msg.sender,to,amount*10**18);
        uint256 temp = record[msg.sender][recordId].sendingAmount; 
        record[msg.sender][recordId]=data(temp+amount*10**18);
        return true;
        
    }


    function withdrawCampingAmount(uint256 Id) public {
    require(block.timestamp>endTime,"you cant withdraw because camping is runnig");
    require(balanceCheek()<targetAmount,"targetAmount is reached");
       
        uint256 temp = record[msg.sender][Id].sendingAmount;
    require(temp>0,"amount is 0");
       token.transfer(msg.sender, temp);
        record[msg.sender][Id].sendingAmount = 0;
    }
    

    function AllAmountWithdraw()public{
        require(block.timestamp>endTime,"camping is running");
        require(balanceCheek()>=targetAmount,"targetAmount is not reached");   
        token.transfer(msg.sender, balanceCheek());

    }
    


    function balanceCheek() public view returns(uint256){
     return token.balanceOf(address(this));
    }
   
   
    function campingRemainTime()public view returns(uint256){
        return endTime-block.timestamp;
    }

    function campareCamping()public view returns(uint){

        return  targetAmount-balanceCheek() ;
    }


}
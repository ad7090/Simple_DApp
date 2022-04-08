    
    // SPDX-License-Identifier: GPL-3.0
    pragma solidity >=0.4.22 <0.9.0;

    contract Ideall_Test {
        
        string public name ;
        
        function Set_name(string memory _name) public {
               name = _name;
        }
         function Get_name() public view returns(string memory) {
              return name;
        }
    }
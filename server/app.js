let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json()); 

///`WEB3
const pb_guest = '0x73459c4780dDa076C0B10EF70859131bFd65e877'
const pv_guest = '0c0ad2580e2369cb4fd2a31ecc39e5b2938756980606298c311bf7f2f163ccc2'

let pr_al ='https://data-seed-prebsc-1-s1.binance.org:8545' //Ropsten

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(pr_al));
const contarctTx = '0x95acb1bA50Ed1444CbC13ABc99Ee1e214907D312'
const abiArray = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "Set_name",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Get_name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let Contract = new web3.eth.Contract(
  abiArray,
  contarctTx
);
//
web3.eth.defaultAccount = pb_guest;
const  edc = async()=>{

  web3.eth.accounts.wallet.add(pv_guest)
  web3.eth.getAccounts().then(console.log)


}
edc()
///FUN web3
const  set_name = async(name) =>{ 

	
  let res = await Contract.methods.Set_name(name) 
.send({
  from: pb_guest, // default from address 
  gasLimit: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
gas: web3.utils.toHex(800000),
}).then((res)=>{
  console.log(res)
  return res
})
return res


}
const  get_name = async() =>{ 
let res = await Contract.methods.Get_name().call()

return res


}

/*********************************************************    */
app.get("/getName",async(req, res, next)=>{

  let result = await get_name()

  return res.status(200).send({
    status: {
        code: 200,
        description: "get name"
    },
    data: result
  });
})
app.post("/setName", async(req, res, next)=>{
  let {name} = req.body
  let result = await set_name(name)

  return res.status(200).send({
    status: {
        code: 200,
        description: "set name"
    },
    data: result
  });
}) 
/*********************************************************    */

app.listen(4000, () => console.log("connect To port:4000" ));
//*****************************************************************

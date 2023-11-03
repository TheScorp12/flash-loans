import './App.css';
import React from 'react';
import {useState,useEffect} from 'react';
import Web3 from 'web3';
import requestflashloan from './actions/requestflashloan';
import getbalance from './actions/getbalance';
import withdraw from './actions/withdraw';
const { ethers } = require("ethers");


function App() {
  let owneraddress = "00"
  //process.env.REACT_APP_OWNER_ADDRESS;
  let provider;
  console.log(owneraddress);
  const[address,setAddress] = useState('');
  const [isAddress, setIsAddress] = useState(false);
  const[Balance, setBalance] = useState('0');
  const [BalanceString,setBalancestring] = useState('');
  const [formDetails, setFormDetails] = useState({ amount: 1 });
  const changeHandler = (event) => {
    let name = event.target.name;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };


  const detectCurrentProvider = () => {
    if (window.ethereum) {
      provider = window.ethereum;
      return provider;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
      return provider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        setAddress(userAccount[0]);
        //console.log(address);
      }
    } catch (err) {
      console.log(err);
    }
    return address;
  };
onConnect();


  useEffect(() => {
    if( address === owneraddress){
      setIsAddress(true)
    }else{
      setIsAddress(false)
    }
  }, [address, owneraddress])

  useEffect(() => {
    if( Balance != 0){
      setBalancestring("Balance is: " + Balance + " USDC")
    }else{
      setBalancestring(false)
    }
  }, [Balance])

  
  const RequestHandler = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    requestflashloan(signer,formDetails.amount);
  }

  const getbalHandler = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const balance = await getbalance(signer);
    console.log(balance);
    setBalance(balance);
  }
  const WithdrawHandler = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    withdraw(signer);
  }

  return (
    <div className="App">
      {
        isAddress ? <div><button onClick={getbalHandler}>get balance</button><text>{BalanceString}</text><div><button onClick={WithdrawHandler}>Withdraw</button></div></div> 
        
        : 
        
        <div><div className="input-box">
        <span className="details">Amount (USDC) </span>
        <input
          onChange={changeHandler}
          name="amount"
          type="text"
          value={formDetails.amount}
          placeholder="Enter the Amount to be loaned"
          required
        />
      </div><button onClick={RequestHandler}>Request flash loan</button> </div>
      } </div>
  );
}

export default App;


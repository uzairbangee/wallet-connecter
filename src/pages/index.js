import React, { useEffect , useState } from "react"
import {Wallet} from "../Wallet/Wallet";

export default function Home() {
  const wallet = new Wallet("metamask");
  const coinbase_wallet = new Wallet("coinbase");
  const [account, setAccount] = useState(undefined);
  const [text, setText] = useState("")

  useEffect(() => {
      //  wallet.;
      (async()=>{
        try {
          const account = await wallet.getAccount();
          console.log("account address ---------->",account);
          account && account.length && setAccount(account)            
        } catch (error) {
          // setAccount(false);
          console.log("error in getting accounts ----->",error)
        }
      })()

    // coinbase_wallet.connect();
  }, [])

  const connectMetaMaskWallet = async () => {
    try {
      const account  = await wallet.connect();
      console.log("account after connecting wallet --->", account); 
    } catch (error) {
      console.log("error in connecting wallet ---->", error)
    }
  }

  
  const connectCoinbaseWallet = async () => {
    try {
      const account  = await coinbase_wallet.connect();
      console.log("account after connecting coinbase wallet --->", account); 
    } catch (error) {
      console.log("error in connecting- coinbase wallet ---->", error)
    }
  }

  const disConnectWallet = async () => {
    try {
      // await wallet;
    } catch (error) {
      console.log("error in connecting meta mask wallet ---->", error)
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const signature = await wallet.sign(text)
      console.log("wallet signature --->",signature);  
    }catch(err){
      console.log("------ signature approval rejected ------ ", err);
    }
  }

  const handleChangeNetwork = async() => {
      await wallet.changeNetwork({
        chainId: '0x13881',
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        chainName: "Matic Mumbai",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
      })
  }


  return (
      // <button onClick={connectWallet}>Hello world!</button>
      account ? <>
      <button onClick={disConnectWallet}>Logout</button>
      <h4>account address is {account}</h4>
      <form onSubmit={handleSubmit}>
        <label>sign Msg:</label>
        <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
        <button type="submit" >Sign Msg</button>
      </form>
      <button onClick={handleChangeNetwork} >change network</button>
      </> :
      <>
            <button onClick={connectMetaMaskWallet}>connect metamask wallet!</button>
            <button onClick={connectCoinbaseWallet}>connect coinbase wallet!</button>

      </>
    )
}

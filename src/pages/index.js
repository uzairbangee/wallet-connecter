import React, { useEffect } from "react"
import {Wallet} from "../Wallet";

export default function Home() {
  const wallet = new Wallet("metamask");
  const coinbase_wallet = new Wallet("coinbase");

  useEffect(() => {
    // wallet.connect();

    // coinbase_wallet.connect();
  }, [])

  const connectWallet = async () => {
    await wallet.connect();
  }



  return <button onClick={connectWallet}>Hello world!</button>
}

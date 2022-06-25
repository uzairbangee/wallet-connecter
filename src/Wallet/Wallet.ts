import { Web3Provider } from '@ethersproject/providers';
import WalletLink, { WalletLinkProvider } from 'walletlink';
import { addNetwork } from './types';
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { MetaMaskWallet } from './MetaMask';
// import { InjectedConnector } from '@web3-react/injected-connector';
// import { useState, useEffect } from 'react';
// import { useWeb3React } from '@web3-react/core';

declare global {
    interface Window {
      ethereum: WalletLinkProvider | undefined;
    }
}

export interface AbstractConnectorArguments {
    supportedChainIds?: number[];
}

export interface ConnectorUpdate<T = number | string> {
    provider?: any;
    chainId?: T;
    account?: null | string;
}

export type WalletProviderType = "metamask" | "coinbase";

export const getLibrary = (provider: any) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
};

// interface WalletClient {
//     walletProvider: WalletProviderType;
//     connect: () => void;
// }

export class Wallet {
    walletProvider: WalletProviderType;
    provider: Web3Provider | undefined;
    // instance : MetaMaskWallet | CoinbaseWallet;

    constructor(walletProvider: WalletProviderType) {
        this.walletProvider = walletProvider;
        console.log("from wallet class initialization --->",this.walletProvider)
        
        if(this.walletProvider === "metamask"){
            this.ConnectMetaMaskInstance()
        }
        
        if(this.walletProvider === "coinbase"){
            console.log("from coinbase condition")
                this.ConnectCoinbaseInstance()
        }
            // this.instance = new CoinbaseWallet(this.walletProvider);
        // else if(this.walletProvider === "coinbase")
          
            // this.provider = new MetaMaskWallet(this.walletProvider);
    }

    private ConnectCoinbaseInstance(){
        const DEFAULT_ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934`
        const DEFAULT_CHAIN_ID = 1
        
        const coinbaseWallet = new WalletLink({
           appName: "web3wallets",
        })

        const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)
        this.provider = getLibrary(ethereum)
    }

    private ConnectMetaMaskInstance(){
        if (typeof (window as any).ethereum !== "undefined"){
            const providers = (window as any).ethereum.providers;
            const eth = providers?.find((p: { isMetaMask: any; }) => p.isMetaMask)
            this.provider = getLibrary(eth); // <-- LOOK HERE
        }
    }

            // if (typeof (window as any).ethereum !== "undefined")
    // ethereum = (window as any).ethereum;

    // walletProvider: WalletProviderType;
    // provider: Web3Provider;
    // // selectedWallet : MetaMaskWallet | CoinbaseWallet | undefined;
    // publicAddress: string[] = []; 

    // constructor(walletProvider: WalletProviderType) {
    //     this.walletProvider = walletProvider;
    //     // if(this.walletProvider === "metamask"){
    //     //    this.selectedWallet = new MetaMaskWallet(this.walletProvider);
    //     // }
    //     // else if(this.walletProvider === "coinbase"){
    //     //     this.selectedWallet = new CoinbaseWallet(this.walletProvider);
    //     // }
    //     // else{
    //     //     this.selectedWallet = undefined
    //     // }
    //     let ethereum: any;
    //     if (typeof (window as any).ethereum !== "undefined")
    //     ethereum = (window as any).ethereum;
    //     this.provider = getLibrary(ethereum);
    // }

    async connect() {
        if(!this.provider) { return [] }
        const accounts = await this.provider.provider.request?.({ method: 'eth_requestAccounts' })
        return accounts
        // this.selectedWallet?.connect()
        // if(this.walletProvider === "metamask"){
        //     new MetaMaskWallet(this.walletProvider).connect();
        // }
        // else if(this.walletProvider === "coinbase"){
        //     new MetaMaskWallet(this.walletProvider).connect();
        // }
    }

    async getAccounts() {
        if(!this.provider) { return [] }
        const accounts = await this.provider.provider.request?.({ method: 'eth_accounts' })
        return accounts
    }
    
    async getAccount() {
        return (await this.getAccounts())[0];
    }

    async sign(message:any) {
        // let address = await this.getAccount()
        // let provider = new Web3Provider(window.ethereum, 'any')
        let signer = this.provider?.getSigner(0)
        let signature = await signer?.signMessage(message)
        return signature
    }

    async changeNetwork(network:addNetwork) {
        return await this.provider?.send('wallet_addEthereumChain', [network]);
    }



    // switch(name) {
    //     case "homestead":
    //         baseUrl = "https://api.etherscan.io";
    //         break;
    //     case "ropsten":
    //         baseUrl = "https://api-ropsten.etherscan.io";
    //         break;
    //     case "rinkeby":
    //         baseUrl = "https://api-rinkeby.etherscan.io";
    //         break;
    //     case "kovan":
    //         baseUrl = "https://api-kovan.etherscan.io";
    //         break;
    //     case "goerli":
    //         baseUrl = "https://api-goerli.etherscan.io";
    //         break;
    //     case "smartchain":
    //         baseUrl = "https://api.bscscan.com";
    //         break;
    //     default:
    //         throw new Error("unsupported network");
    // }


    // on(event:any, callback:any) {
    //     let internalCallback
    //     switch (event) {
    //     //   case 'account':
    //     //     internalCallback = (accounts:string[]) => callback(accounts[0])
    //     //     window.ethereum?.on('accountsChanged', internalCallback)
    //     //     break
    //       case 'accountsChanged':
    //         internalCallback = (accounts:string[]) => callback(accounts)
    //         window.ethereum?.on('accountsChanged', internalCallback)
    //         console.log(" -----> hello from event listner from account changed <----")
    //         break
    //       case 'network':
    //         internalCallback = (chainId:string) => callback(chainId)
    //         window.ethereum?.on('chainChanged', internalCallback)
    //         break
    //       case 'disconnect':
    //         internalCallback = callback
    //         window.ethereum?.on('disconnect', internalCallback)
    //         break
    //     }
    //     return internalCallback
    //   }
    
    
}


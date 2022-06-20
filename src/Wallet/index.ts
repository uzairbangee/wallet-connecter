import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

declare global {
    interface Window {
      ethereum: any;
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

interface WalletClient {
    walletProvider: WalletProviderType;
    connect: () => void;
}

export class Wallet {
    walletProvider: WalletProviderType;

    protected provider: Web3Provider;

    constructor(walletProvider: WalletProviderType) {
        this.walletProvider = walletProvider;
    }

    async connect() {
        if(this.walletProvider === "metamask"){
            new MetaMaskWallet(this.walletProvider).connect();
        }
        else if(this.walletProvider === "coinbase"){
            new MetaMaskWallet(this.walletProvider).connect();
        }
    }

}

export class MetaMaskWallet extends Wallet implements WalletClient {
    
    constructor(walletProvider: WalletProviderType) {
        super(walletProvider);
        this.walletProvider = walletProvider;
        let ethereum: any;
        if (typeof (window as any).ethereum !== "undefined")
            ethereum = (window as any).ethereum;
        this.provider = getLibrary(ethereum);
    }

    async connect() {
        console.log("this.provider ", this.provider)
        
        this.provider.provider.send({method: "eth_requestAccounts", key: []});
    }
}

export class CoinbaseWallet extends Wallet implements WalletClient {
    
    constructor(walletProvider: WalletProviderType) {
        super(walletProvider);
        this.walletProvider = walletProvider;
        let ethereum: any;
        if (typeof (window as any).ethereum !== "undefined")
            ethereum = (window as any).ethereum;
        this.provider = getLibrary(ethereum);
    }

    async connect() {
        console.log("I am called")
        // await this.provider.send("eth_requestAccounts", []);
    }

    async logout() {
        console.log("I am logout")
        // await this.provider.send("eth_requestAccounts", []);
    }
}

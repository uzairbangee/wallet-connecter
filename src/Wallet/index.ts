import {MetaMaskWallet} from './MetaMask'
import {CoinbaseWallet} from './Coinbase'

const wallets = {
    MetaMaskWallet,
    CoinbaseWallet
}

const supported_wallets = [
    wallets.MetaMaskWallet,
    wallets.CoinbaseWallet,
    // wallets.WalletConnect,
    // wallets.WalletLink
]

const instances = {}


  
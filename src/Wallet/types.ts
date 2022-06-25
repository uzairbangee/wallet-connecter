export interface addNetwork{
    chainId:string
    rpcUrls:string[]
    chainName:string
    blockExplorerUrls:string
    nativeCurrency:currency
}

interface currency{
    name:string
    symbol:string
    decimals:number
}
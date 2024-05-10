import React, { useState, useEffect } from 'react';
import { Text, SimpleGrid, Container } from '@mantine/core';
import { ChainId, Token, WETH9, CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { Pair, Route, Trade } from '@uniswap/v2-sdk'
import { ethers } from 'ethers';
import UniSwapV2PoolABI from '../../public/ABI/UniSwapV2PoolABI.json'



const GetPrice = () => {
    // const [price, setPrice] = useState<null | Pair<Token, Token>>();


    async function fetchPrice() {

        const chainId = 42161

        const MOR = new Token(chainId, '0x092bAaDB7DEf4C3981454dD9c0A0D7FF07bCFc86', 18, 'MORPHEUS');
        const WETH = new Token(chainId, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH');
        const provider = new ethers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');

        // console.log(provider);



        // console.log(MOR);
        // console.log(WETH9[42161]);


        const pairAddress = Pair.getAddress(MOR, WETH9[42161])
        const pairContract = new ethers.Contract("0xEa7678D926Cbd8A4b882A551E6700CD721Cac473", UniSwapV2PoolABI, provider)

        // console.log(pairAddress);
        // console.log(pairContract);

        try {
            const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/arbitrum/0xE5Cf22EE4988d54141B77050967E1052Bd9c7F7A`);
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }


        const reserves = await pairContract["getReserves"]()
        // console.log(reserves);

        const reserve0 = BigInt(reserves[0]);
        const reserve1 = BigInt(reserves[1]);
        const reserve2 = BigInt(reserves[2]);

        console.log(reserve1)

        // const [reserve0, reserve1, reserve2] = reserves

        console.log(reserve1, reserve2);



        const tokens = [MOR, WETH9[MOR.chainId]]
        const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]

        console.log(token0);


        const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve1.toString()), CurrencyAmount.fromRawAmount(token1, reserve2.toString()))
        console.log(pair);

        const route = new Route([pair], WETH9[MOR.chainId], MOR)

        console.log(route.midPrice.toSignificant(6)) // 1901.08
        console.log(route.midPrice.invert().toSignificant(6)) // 0.000526017

        const trade = new Trade(route, CurrencyAmount.fromRawAmount(WETH9[MOR.chainId], '1000000000000000000'), TradeType.EXACT_INPUT)


        console.log(trade.executionPrice.toSignificant(6)) // 1894.91

        return pair

    }
    fetchPrice()

    return (
        <div>
            {/* <h1>Price: {price.token0.symbol} / {price.token1.symbol}</h1>
            <h2>{price.token0.symbol} Amount: {price.token0.toString()}</h2>
            <h2>{price.token1.symbol} Amount: {price.token1.toString()}</h2>
            <h2>Price: {price.priceOf(price.token0, price.token1).toSignificant(6)}</h2> */}
        </div>
    )

}


export default GetPrice;
import React, { useState, useEffect } from 'react';
import { Flex, Card, Text } from '@mantine/core';

const FetchPrice = () => {
    // Define state variables to store the prices
    const [priceMOR, setPriceMOR] = useState(null);
    const [liqudity, setLiquidity] = useState(0);
    const [volumeh24, setVolumeh24] = useState(0);
    const [volumeh1, setVolumeh1] = useState(null);
    const [volumem5, setVolumem5] = useState(null);
    const [priceWETH, setPriceWETH] = useState(null);

    useEffect(() => {
        // Fetch prices when component mounts
        const fetchPrices = async () => {
            try {
                // Make API call to fetch latest prices
                const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/arbitrum/0xE5Cf22EE4988d54141B77050967E1052Bd9c7F7A`);
                const data = await response.json();
                // console.log(data.pairs[0].volume);

                // Extract prices from response data
                const morPrice = data.pairs[0].priceUsd;
                const liqudity = data.pairs[0].liquidity.usd / 1000000
                const volumeh24 = data.pairs[0].volume.volumeh24 / 1000000
                const volumeh1 = data.pairs[0].volume.volumeh1
                const volumem5 = data.pairs[0].volume.volumem5
                const wethPrice = data.priceWETH;

                // Store prices in state variables
                setPriceMOR(morPrice);
                setLiquidity(liqudity)
                setVolumeh24(volumeh24)
                setVolumeh1(volumeh1)
                setVolumem5(volumem5)
                setPriceWETH(wethPrice);
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        };
        fetchPrices(); // Call fetchPrices function
    }, []);

    // Render component content
    return (
        <Card shadow={"sm"} padding={"sm"} radius={"lg"}>
            <Flex gap={0}>
                <Text>MOR Price: </Text><Text ml={5} mr={20} fw={700}> $ {priceMOR}</Text>
                <Text>Liquidity: </Text><Text ml={5} fw={700}> $ {liqudity.toFixed(1)} M</Text>
            </Flex>
        </Card>
    );
};

export default FetchPrice;

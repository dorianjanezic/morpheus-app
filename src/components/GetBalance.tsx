import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Input, Button, Text, Flex, Box, Card, Loader, Title } from '@mantine/core';
import CardData from './Card';
import abi from '../../public/ABI/MorpheusABI.json'
import Claim from './Claim';

const GetBalance: React.FC = () => {
    const [userAddress, setUserAddress] = useState('');
    const [userBalance, setUserBalance] = useState<number | null>(null);
    const [capitalBalance, setCapitalBalance] = useState<number>(0);
    const [communityBalance, setCommunityBalance] = useState<number>(0);
    const [totalWeights, setTotalWeights] = useState<string>('');
    const [addressWeights, setAddressWeights] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserAddress(e.target.value);
    };

    const fetchBalance = async () => {
        try {
            setLoading(true)
            if (!ethers.isAddress(userAddress)) {
                setError('Invalid Ethereum address');
                return;
            }
            const provider = new ethers.JsonRpcProvider('https://cloudflare-eth.com/');
            const morpheusAIAddress = '0x47176B2Af9885dC6C4575d4eFd63895f7Aaa4790';
            const contract = new ethers.Contract(morpheusAIAddress, abi, provider);
            const balance = await contract.getCurrentUserReward('1', userAddress);
            const capitalBalance = await contract.getCurrentUserReward("0", userAddress)
            const communityBalance = await contract.getCurrentUserReward("2", userAddress)
            const addressWeights = await contract.usersData(userAddress, "1")
            const poolsData = await contract.poolsData("1")
            const pools = await contract.pools("1")
            console.log(pools);

            const startTime = pools[0]
            const interval = pools[1]
            const initReward = ethers.formatUnits(pools[5], 18)
            const decrease = ethers.formatUnits(pools[6], 18)
            const timestampToday = new Date().getTime() / 1000;
            // const daysDecrease = Math.floor((timestampToday - startTime) / interval)
            // const currentReward = Number(initReward) - (Number(decrease) * daysDecrease)
            // console.log(currentReward)


            setAddressWeights(ethers.formatUnits(addressWeights[1], 0))
            setTotalWeights(ethers.formatUnits(poolsData[2], 0))
            setUserBalance(balance);
            setCapitalBalance(capitalBalance)
            setCommunityBalance(communityBalance)
            setError(null);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setError('Error fetching balance');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            {/* <Card shadow="sm" padding="lg" radius="md" withBorder> */}
            {/* <ConnectButton /> */}
            <Title style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>
                Morpheus Community Website
            </Title>
            <Flex mb={20} justify={"center"} gap={20}>
                <Claim />
            </Flex>
            <Card shadow={"sm"} padding={"xl"} radius={"lg"}>
                <Title size={"xl"} tt={"uppercase"} ta={"center"} mb={20}>Check Balance</Title>
                <Flex justify={"center"} gap={20}>
                    <Box w={"50%"}>
                        <Input value={userAddress} onChange={handleInputChange} placeholder='Input your address' />
                    </Box>
                    <Button onClick={fetchBalance}>Check Balance</Button>
                </Flex>
                <Flex mt={15} justify={"center"}>
                    {error && <Text c={"red"}>Error: {error}</Text>}
                </Flex>
            </Card>
            {/* </Card> */}
            {loading ? <Flex mt={100} justify={"center"}><Loader size={"xl"} /></Flex> :
                <Box mt={100}>
                    {userBalance !== null && (
                        <Box>
                            <Flex gap={20} justify={"center"}>
                                <CardData label='Code contribution balance' value={`${ethers.formatUnits(userBalance, 18)} MOR`} />
                                <CardData label='Capital contribution balance' value={`${ethers.formatUnits(capitalBalance, 18)} MOR`} />
                                <CardData label='Community contribution balance' value={`${ethers.formatUnits(communityBalance, 18)} MOR`} />
                            </Flex>
                            <Flex justify={"center"} mt={50} gap={20}>
                                <CardData label='Total weights' value={totalWeights} />
                                <CardData label='Address weights' value={addressWeights} />
                                <CardData label='Address weights %' value={(Number(addressWeights) / Number(totalWeights) * 100).toFixed(4)} />
                            </Flex>
                        </Box>
                    )}
                </Box>
            }
        </Box>
    );
};

export default GetBalance;

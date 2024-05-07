import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Input, InputWrapper, Button, Group, Text, Flex, Box, Card, Highlight, Loader } from '@mantine/core';
import abi from '../../public/ABI/MorpheusABI.json'

const GetBalance: React.FC = () => {
    const [userAddress, setUserAddress] = useState('');
    const [userBalance, setUserBalance] = useState<number | null>(null);
    const [capitalBalance, setCapitalBalance] = useState<number>(0);
    const [communityBalance, setCommunityBalance] = useState<number>(0);
    const [totalWeights, setTotalWeights] = useState<string>('');
    const [addressWeights, setAddressWeights] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // New loading state
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
            // const pools = await contract.pools("1")
            // const startTime = pools[0]
            // const interval = pools[1]
            // const initReward = ethers.formatUnits(pools[5], 18)
            // const decrease = ethers.formatUnits(pools[6], 18)
            // const timestampToday = new Date().getTime() / 1000;
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
            <Flex justify={"center"} gap={20}>
                <Box w={"50%"}>
                    <Input value={userAddress} onChange={handleInputChange} placeholder='Input your address' />
                </Box>
                <Button onClick={fetchBalance}>Check Balance</Button>
            </Flex>
            <Flex mt={5} justify={"center"}>
                {error && <Text c={"red"}>Error: {error}</Text>}
            </Flex>
            {loading ? <Flex mt={100} justify={"center"}><Loader size={"xl"} /></Flex> :
                <Box mt={100}>
                    {userBalance !== null && (
                        <Box>
                            <Flex gap={20} justify={"center"}>
                                <Card shadow="sm" padding="lg" radius="md" withBorder w={"fit-content"}>
                                    <Text size='lg' tt="uppercase" ta="center">Code contribution balance</Text>
                                    <Text ta="center" fw={700}> {ethers.formatUnits(userBalance, 18)} MOR</Text>
                                </Card>
                                <Card shadow="sm" padding="lg" radius="md" withBorder w={"fit-content"}>
                                    <Text size='lg' tt="uppercase" ta="center">Capital contribution balance</Text>
                                    <Text ta="center" fw={700}> {ethers.formatUnits(capitalBalance, 18)} MOR</Text>
                                </Card>
                                <Card shadow="sm" padding="lg" radius="md" withBorder w={"fit-content"}>
                                    <Text size='lg' tt="uppercase" ta="center">Community contribution balance</Text>
                                    <Text ta="center" fw={700}>{ethers.formatUnits(communityBalance, 18)} MOR</Text>
                                </Card>

                            </Flex>
                            <Flex justify={"center"} mt={50} gap={20}>
                                <Card shadow="sm" padding="lg" radius="md" withBorder w={"fit-content"}>
                                    <Text size='lg' tt="uppercase" ta="center">Total weights</Text>
                                    <Text ta="center" fw={700}>{totalWeights}</Text>
                                </Card>
                                <Card shadow="sm" padding="lg" radius="md" withBorder w={"fit-content"}>
                                    <Text size='lg' tt="uppercase" ta="center">Address weights</Text>
                                    <Text ta="center" fw={700}>{addressWeights}</Text>
                                </Card>
                                <Card shadow="sm" padding="lg" radius="md" withBorder w={"fit-content"}>
                                    <Text size='lg' tt="uppercase" ta="center">Address weights %</Text>
                                    <Text ta="center" fw={700}>{(Number(addressWeights) / Number(totalWeights) * 100).toFixed(4)}</Text>
                                </Card>
                            </Flex>
                        </Box>
                    )}
                </Box>
            }
        </Box>
    );
};

export default GetBalance;

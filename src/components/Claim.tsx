import React, { useState } from 'react';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract, useSendTransaction } from 'wagmi'
import abi from '../../public/ABI/MorpheusABI.json'
import { Card, Input, Flex, Button, List, Title, Code } from '@mantine/core'
import { parseEther } from 'viem'
import { encodeFunctionData } from 'viem'

const Claim = () => {
    const [pool, setPool] = useState("");
    const [address, setAddress] = useState<string>("")
    const to = "0x47176B2Af9885dC6C4575d4eFd63895f7Aaa4790" as `0x${string}`

    const handlePoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPool(e.target.value);
    };
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const { data: txHash, sendTransaction, error, isPending } = useSendTransaction()

    async function Claim() {
        const data = encodeFunctionData({
            abi: abi,
            functionName: 'claim',
            args: [pool, address]
        })
        sendTransaction({ to, value: parseEther('0.001'), data: data })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash })

    return (
        <>
            <Card>
                <Title size={"xl"} tt={"uppercase"} ta={"center"} mb={20}>Claim rewards</Title>
                <List size='lg'>
                    <List.Item>- <Code color='morpheus'>claim: 0.001</Code> - this is the amount of ETH that you will send with the transaction to pay for mint on the destination network. Any excess will be returned to you.</List.Item>
                    <List.Item>- <Code color='morpheus'>poolId_: pool identifier</Code> enter 0 for capital providers pool or 1 for code providers pool.</List.Item>
                    <List.Item>- <Code color='morpheus'>receiver_(address)</Code> Input the address that will receive the minted MOR tokens.</List.Item>
                </List>
                <Flex mt={20} gap={20} justify={"center"}>
                    <Input value={pool} onChange={handlePoolChange} placeholder="Pool ID" required></Input>
                    <Input value={address} onChange={handleAddressChange} placeholder="Address" required></Input>
                    <Button
                        disabled={isPending}
                        onClick={Claim}
                    >
                        {isPending ? 'Confirming...' : 'Claim'}
                    </Button>
                </Flex>
                {txHash && <div>Transaction Hash: {txHash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {error && (
                    <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                )}
            </Card>
        </>
    )
}

export default Claim
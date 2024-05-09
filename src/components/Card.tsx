import React from 'react';
import { Card, Text } from '@mantine/core';

const CardData = ({
    label,
    value
}: {
    label: string,
    value: any
}) => {
    return (
        <Card opacity={0.8} shadow={"sm"} padding={"lg"} radius={"md"} withBorder w={"fit-content"}>
            <Text size='md' tt="uppercase" ta="center">{label}</Text>
            <Text ta="center" fw={700}>{value}</Text>
        </Card>
    );
};

export default CardData;
import { Box, Title, Image } from '@mantine/core';
import React, { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <Box pos={"relative"} style={{ maxWidth: 1200, margin: 'auto', minHeight: '100vh', padding: "2rem" }}>
            <Image pos={"absolute"} left={0} top={0} src={"/morpheus-ecosystem.png"} opacity={0.2} />
            {children}
        </Box>
    )
}

export default Wrapper
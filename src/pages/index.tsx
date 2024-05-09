import GetBalance from "@/components/GetBalance";
import Wrapper from "@/components/Wrapper";
import { Image, Box, Flex } from "@mantine/core";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Claim from "@/components/Claim";

export default function Home() {
  return (
    <Box>
      <Flex justify={"end"} p={20}>
        <ConnectButton />
      </Flex>
      <Wrapper>
        <GetBalance />
        {/* <Claim /> */}
      </Wrapper>
    </Box>
  );
}

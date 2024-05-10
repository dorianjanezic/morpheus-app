import GetBalance from "@/components/GetBalance";
import Wrapper from "@/components/Wrapper";
import { Image, Box, Flex } from "@mantine/core";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import FetchPrice from "@/components/FetchPrice";

export default function Home() {
  return (
    <Box>
      <Flex justify={"space-between"} p={20}>
        <FetchPrice />
        <ConnectButton />
      </Flex>
      <Wrapper>
        <GetBalance />
      </Wrapper>
    </Box>
  );
}

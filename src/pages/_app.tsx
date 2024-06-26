import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { getDefaultConfig, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit';
import { config } from "../../config";
import { createTheme, MantineProvider } from '@mantine/core';
import '@rainbow-me/rainbowkit/styles.css';
import '@mantine/core/styles.css';
import merge from 'lodash.merge';

const queryClient = new QueryClient()

const theme = createTheme({
  colors: {
    morpheus: [
      "#e6feee",
      "#d4f6e2",
      "#adecc6",
      "#82e0a7",
      "#5ed68d",
      "#46d17c",
      "#38ce73",
      "#28b561",
      "#1ca254",
      "#008c45"
    ]
  },
  primaryColor: 'morpheus'
});

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#1ca254",
    connectButtonBackground: 'transparent',
  },
  shadows: {
    connectButton: 'none'
  }
} as Theme);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myTheme} modalSize="compact">
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Component {...pageProps} />
          </MantineProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

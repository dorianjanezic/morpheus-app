import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from "../../config";
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

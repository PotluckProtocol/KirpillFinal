import { config } from '@/config';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from 'wagmi';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function App({ Component, pageProps }: AppProps) {
  createWeb3Modal({
    wagmiConfig: config,
    projectId: 'a732de194116ea96621b9098df69891d',
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    themeMode: 'dark',
  });

  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

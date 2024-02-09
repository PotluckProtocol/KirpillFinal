import { fantom } from 'wagmi/chains';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

const projectId = '1373ebbfab65316d0afc91c0c1ad0df7';

// 2. Create wagmiConfig
const metadata = {
  name: 'Kirpill vs Food',
  description: 'Kirpill vs Food',
  url: 'https://kirpillvsfood.xyz', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const config = defaultWagmiConfig({
  chains: [fantom],
  ssr: true,
  projectId,
  metadata,
});

export const minterAddress = '0x0D8535b6c70694F59984e81216d147399b0d38f5';
export const nftAddress = '0xcdDc65b2C383F7812265544857D32b38a9E43F6e';
export const fridgeAddress = '0xCBeeca35e692B02f4F284F5b715c72c212F25e9F';
export const kcalAddress = '0x92b598deBd3f4c9d99C40c5542E1F4450841fCf2';

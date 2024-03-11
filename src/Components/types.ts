export type NftData = {
    nftimage: string;
    name: string;
    supply: number;
    minted: number;
    price: number;
    income: number;
    contract: string;
    totalSupply: number;
    slug: string;
    team: string;
  };
export const yokiAddress = '0x2e6ff2a374844ed25E4523da53292a89B93e8905';
export const RPC = 'https://rpc.startale.com/astar-zkevm';

interface CardData {
  title: string;
  value: number | string;
}

export interface CardsProps {
  data: CardData[];
}

export const yoportLink = 'https://yoki.astar.network/en/floors/';
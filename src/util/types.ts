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

interface CardData {
  title: string;
  value: number | string;
}

export interface CardsProps {
  data: CardData[];
}


export type OmaStats = {
  totalOMAs: number;
  totalTxOver30: number;
  totalResults: number;
};

export type PlayerStats = {
  users: number;
  players: number;
};
import React from 'react';
import NftTable from './NftTable';
import { NftData } from './types'; // adjust the path as needed

const rows: NftData[] = [
  { nftimage: 'image', name: 'Frozen yoghurt', supply: 159, minted: 6.0, price: 24, income: 4.0, contract: '0x1234', team: 'Yoki Origins' },
  { nftimage: 'image', name: 'Ice cream sandwich', supply: 237, minted: 9.0, price: 37, income: 4.3, contract: '0x1234', team: 'Yoki Origins' },
  { nftimage: 'image', name: 'Eclair', supply: 262, minted: 16.0, price: 24, income: 6.0, contract: '0x1234', team: 'Yoki Origins' },
  { nftimage: 'image', name: 'Cupcake', supply: 305, minted: 3.7, price: 67, income: 4.3, contract: '0x1234', team: 'Yoki Origins' },
  { nftimage: 'image', name: 'Gingerbread', supply: 356, minted: 16.0, price: 49, income: 3.9, contract: '0x1234', team: 'Yoki Origins' },
];

const FetchNfts: React.FC = () => {
    return (
        <div className="nft-table-container">
      <NftTable data={rows} />
      </div>    );
};

export default FetchNfts;
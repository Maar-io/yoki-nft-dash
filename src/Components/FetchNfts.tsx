import React, { useState, useEffect } from 'react';
import NftTable from './NftTable';
import { NftData } from './types'; // adjust the path as needed


const FetchNfts: React.FC = () => {
  const [rows, setRows] = useState<NftData[]>([]);

  useEffect(() => {
    fetch('/nfts.json')
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map((item: NftData) => ({
          ...item,
          minted: Math.floor(Math.random() * 1000), 
        }));
        setRows(updatedData);
      });
  }, []);

    return (
        <div className="nft-table-container">
      <NftTable data={rows} />
      </div>    );
};

export default FetchNfts;
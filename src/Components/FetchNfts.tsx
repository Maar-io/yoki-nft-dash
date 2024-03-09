import React, { useState, useEffect } from 'react';
import NftTable from './NftTable';
import { NftData } from './types'; // adjust the path as needed
import { ethers } from 'ethers';

const RPC = 'https://rpc.startale.com/astar-zkevm';

const contractABI = [
  "function totalSupply() view returns (uint256)"
];

const provider = new ethers.providers.JsonRpcProvider(RPC);

const FetchNfts: React.FC = () => {
  const [rows, setRows] = useState<NftData[]>([]);

  useEffect(() => {
    fetch('/nfts.json')
      .then(response => response.json())
      .then(async data => {
        const updatedData = await Promise.all(data.map(async (item: NftData) => {
          const contract = new ethers.Contract(item.contract, contractABI, provider);
          const minted = await contract.totalSupply();
          return { ...item, minted: minted.toNumber() };
        }));
        setRows(updatedData);
      });
  }, []);

  return (
    <div className="nft-table-container">
      <NftTable data={rows} />
    </div>
  );
};

export default FetchNfts;
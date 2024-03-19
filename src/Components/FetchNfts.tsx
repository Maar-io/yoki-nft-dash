import React, { useState, useEffect, useContext } from 'react';
import NftTable from './NftTable';
import { NftData } from '../util/types';
import { RPC } from '../util/const';
import { ethers } from 'ethers';
import PartnerNftsContext from './PartnerNftsContext';

const contractABI = [
  "function totalSupply() view returns (uint256)"
];

const provider = new ethers.providers.JsonRpcProvider(RPC);

const FetchNfts: React.FC = () => {
  const [rows, setRows] = useState<NftData[]>([]);
  const { partnerNfts, setPartnerNfts } = useContext(PartnerNftsContext);

  useEffect(() => {
    var partnerNftMinted: number = 0;
    fetch('/nfts.json')
      .then(response => response.json())
      .then(async data => {
        const updatedData = await Promise.all(data.map(async (item: NftData) => {
          if (item.totalSupply === 0) {

            const contract = new ethers.Contract(item.contract, contractABI, provider);
            const minted = await contract.totalSupply();
            partnerNftMinted += minted.toNumber();
            return { ...item, minted: minted.toNumber() };
          }
          else {
            // needed because of a bug in Kyushu contract which does not have totalSupply()
            partnerNftMinted += item.totalSupply;
            return { ...item, minted: item.totalSupply };
          }
        }));
        setPartnerNfts(partnerNftMinted);
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
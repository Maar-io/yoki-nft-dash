import React, { useState, useEffect } from 'react';
import NftTable from './NftTable';
import { NftData, yokiAddress, RPC } from './types'; 
import { ethers } from 'ethers';

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
          if (item.totalSupply === 0) {
            
            const contract = new ethers.Contract(item.contract, contractABI, provider);
            const minted = await contract.totalSupply();
            return { ...item, minted: minted.toNumber() };
          }
          else {
            // needed because of a bug in Kyushu contract which does not have totalSupply()
            return { ...item, minted: item.totalSupply };
          }

  }));
  setRows(updatedData);
});
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const contract = new ethers.Contract(yokiAddress, contractABI, provider);
  
  //     // Call the first function
  //     const yokiCnt = await contract.totalSupply();
  
  //     // Call the second function
  //     // const omaCnt = await contract.otherFunction(); 
  //     setYokiCnt(yokiCnt);
  //     setOmaCnt(0);
  //   };
  
  //   fetchData();
  // }, []);

 


return (
  <div className="nft-table-container">
    <NftTable data={rows} />
  </div>
);
};

export default FetchNfts;
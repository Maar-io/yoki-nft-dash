import React, { useState, useEffect } from 'react';
import { CardsProps, OmaStats, PlayerStats } from '../util/types';
import { yokiAddress, RPC } from '../util/const';
import { ethers } from 'ethers';
import contractABI from '../yoki-abi.json';
import Cards from './Cards';
import PartnerNftsContext from './PartnerNftsContext';
import { fetchOmaPage } from '../util/oma';
import { fetchPlayersPage } from '../util/players';

const provider = new ethers.providers.JsonRpcProvider(RPC);

const YokiSum: React.FC = () => {
  const [yokiCnt, setYokiCnt] = useState<number>(0);
  const [omaCnt, setOmaCnt] = useState<number>(0);
  const { partnerNfts } = React.useContext(PartnerNftsContext);
  const [omaStats, setOmaStats] = useState<OmaStats>({
    totalOMAs: 0,
    totalTxOver30: 0,
    totalResults: 0
  });
  const [playerStats, setPlayerStats] = useState<PlayerStats>({ users: 0, players: 0 }); // new state variable


  useEffect(() => {
    fetchOmaPage(0, 0, 0, 0)
      .then(data => {
        setOmaStats(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchPlayersPage(0, 0, 0)
      .then(data => {
        setPlayerStats(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const contract = new ethers.Contract(yokiAddress, contractABI, provider);

      // Call the first function
      const totalCnt = await contract["totalSupply()"]();

      // Call the second function
      const omaCnt = await await contract["totalSupply(uint256)"](0);

      const liveYoki = totalCnt.toNumber() - omaCnt.toNumber();
      setYokiCnt(liveYoki);
      setOmaCnt(omaCnt.toString());
    };

    fetchData();
  }, [partnerNfts]);

  const cardData = [
    {
      title: 'Total Users/Players',
      value: `${playerStats.users}/${playerStats.players}`
    },
    { title: 'Live Yoki', value: yokiCnt },
    { title: 'Oma in circulation', value: omaCnt },
    { title: 'Project NFTs', value: partnerNfts },
    {
      title: 'TxOMA/bigTx/numTx', value: `${omaStats.totalOMAs}/${omaStats.totalTxOver30}/${omaStats.totalResults}`
    },
  ];

  return (
    <div>
      <Cards data={cardData} />
    </div>
  );
};

export default YokiSum;
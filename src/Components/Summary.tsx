import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { yokiAddress, RPC } from './types';
import { ethers } from 'ethers';
import contractABI from '../yoki-abi.json';

// const contractABI = [
//   "function totalSupply() view returns (uint256)",
//   "function totalSupply(uint256) view returns (uint256)",
// ];

const provider = new ethers.providers.JsonRpcProvider(RPC);

const Summary: React.FC = () => {
  const [yokiCnt, setYokiCnt] = useState<number>(0);
  const [omaCnt, setOmaCnt] = useState<number>(0);

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
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      {[{ title: 'Live Yokis', value: yokiCnt }, { title: 'Oma in circulation', value: omaCnt }].map((item, index) => (
        <Card key={index} className="card">
          <CardContent className="card-content">
            <Typography variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="h4"> {/* Change this line */}
              {item.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Summary;
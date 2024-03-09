import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardsProps } from './types';

const Cards: React.FC<CardsProps> = ({ data }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      {data.map((item, index) => (
        <Card key={index} className="card">
          <CardContent className="card-content">
            <Typography variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="h4">
              {item.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
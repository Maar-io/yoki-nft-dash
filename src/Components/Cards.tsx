import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardsProps } from '../util/types';
import Grid from '@mui/material/Grid';

const Cards: React.FC<CardsProps> = ({ data }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card className="card">
            <CardContent className="card-content">
              <Typography variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="h4">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
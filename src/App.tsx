import React, { useState } from 'react';
import './App.css';
import FetchNfts from './Components/FetchNfts';
import YokiSum from './Components/YokiSum';
import PartnerNftsContext from './Components/PartnerNftsContext';

function App() {
  const [partnerNfts, setPartnerNfts] = useState(null);


  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>
            Yoki Origins NFT dashboard
          </p>
        </header>
        <PartnerNftsContext.Provider value={{ partnerNfts, setPartnerNfts }}>
          <YokiSum />
          <FetchNfts />
        </PartnerNftsContext.Provider >
      </div>
    </>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import FetchNfts from './Components/FetchNfts';
import YokiSum from './Components/YokiSum';
import PartnerNftsContext from './Components/PartnerNftsContext';
import logo from './logo.png'; // path to your logo file

function App() {
  const [partnerNfts, setPartnerNfts] = useState(null);


  return (
    <>
      <div className="App">
        <header className="App-header">
        <img src={logo} alt="Logo" style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '100px' }} />          <p>
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

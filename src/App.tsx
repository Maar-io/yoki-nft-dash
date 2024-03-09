import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchNfts from './Components/FetchNfts';
import Summary from './Components/Summary';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Yoki Origins NFT dashboard
        </p>
      </header>
      <Summary />

      <div className="nft-table-container">
        <FetchNfts />
      </div>
    </div>
  );
}

export default App;

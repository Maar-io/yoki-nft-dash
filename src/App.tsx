import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchNfts from './Components/FetchNfts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Yoki Origins NFT dashboard
        </p>
      </header>

      <div className="nft-table-container">
        <FetchNfts />
      </div>
    </div>
  );
}

export default App;

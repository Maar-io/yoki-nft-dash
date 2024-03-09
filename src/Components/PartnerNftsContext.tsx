import React, { Dispatch, SetStateAction } from 'react';


interface ContextType {
    partnerNfts: null | any; // replace any with the type of your data
    setPartnerNfts: Dispatch<SetStateAction<any>>; // replace any with the type of your data
  }
  
  const PartnerNftsContext = React.createContext<ContextType>({
    partnerNfts: null,
    setPartnerNfts: () => {},
  });

export default PartnerNftsContext;
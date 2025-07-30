import React, { createContext, useContext, useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { initializeWeb3 } from '../utils/web3Init';

const Web3Context = createContext();

function getLibrary(provider) {
  return new Web3Provider(provider, 'any');
}

export function Web3ContextProvider({ children }) {
  useEffect(() => {
    // Initialize Web3 before mounting the provider
    initializeWeb3();
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  );
}

export function useWeb3Context() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within a Web3ContextProvider');
  }
  return context;
}
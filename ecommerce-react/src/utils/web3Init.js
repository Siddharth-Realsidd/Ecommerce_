export const initializeWeb3 = () => {
  if (typeof window.ethereum !== 'undefined') {
    return window.ethereum;
  }
  
  // Only attempt to inject if ethereum doesn't exist
  const ethereum = {
    // Your ethereum configuration here
  };
  
  if (!window.ethereum) {
    Object.defineProperty(window, 'ethereum', {
      value: ethereum,
      writable: true,
      configurable: true
    });
  }
  
  return window.ethereum;
};
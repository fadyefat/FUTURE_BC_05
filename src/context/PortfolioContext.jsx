import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('cryptoPortfolio');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (coin, quantity) => {
    setPortfolio((prev) => {
      const existing = prev.find((p) => p.id === coin.id);
      if (existing) {
        return prev.map((p) =>
          p.id === coin.id ? { ...p, quantity: parseFloat(p.quantity) + parseFloat(quantity) } : p
        );
      }
      return [...prev, { ...coin, quantity: parseFloat(quantity) }];
    });
  };

  const removeFromPortfolio = (id) => {
    setPortfolio((prev) => prev.filter((coin) => coin.id !== id));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};
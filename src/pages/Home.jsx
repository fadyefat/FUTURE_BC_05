import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMarketCoins } from '../services/api';
import Loader from '../components/Loader';
import '../styles/main.css';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getMarketCoins();
        setCoins(data);
      } catch (err) {
        setError('Failed to load market data. Rate limit may be exceeded.');
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <div className="error-msg glass-panel" style={{marginTop: '50px'}}>{error}</div>;

  return (
    <div className="container">
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Live <span className="text-gradient">Market Data</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track the top 50 cryptocurrencies in real-time</p>
      </div>

      <input 
        type="text" 
        placeholder="Search coins..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="glass-panel"
        style={{
          width: '100%',
          padding: '15px',
          color: 'white',
          border: '1px solid var(--glass-border)',
          marginBottom: '30px',
          outline: 'none'
        }}
      />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        {filteredCoins.map(coin => (
          <Link to={`/coin/${coin.id}`} key={coin.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-panel" style={{ padding: '20px', transition: 'transform 0.2s', cursor: 'pointer', height: '100%' }} 
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <img src={coin.image} alt={coin.name} style={{ width: '40px', height: '40px', marginRight: '15px' }} />
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>{coin.name}</h3>
                  <span style={{ textTransform: 'uppercase', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{coin.symbol}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Price</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>${coin.current_price.toLocaleString()}</p>
                </div>
                <div className={coin.price_change_percentage_24h >= 0 ? 'up' : 'down'}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
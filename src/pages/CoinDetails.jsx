import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCoinDetails } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';
import Loader from '../components/Loader';
import Toast from '../components/Toast'; // <--- Import Toast
import '../styles/main.css';

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState('');
  const [toastMsg, setToastMsg] = useState(null); // <--- State for toast message
  const { addToPortfolio } = usePortfolio();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleAdd = () => {
    if (!qty || isNaN(qty)) return;

    addToPortfolio({ 
      id: coin.id, 
      name: coin.name, 
      symbol: coin.symbol, 
      image: coin.image.large,
      current_price: coin.market_data.current_price.usd 
    }, qty);

    // Show Custom Toast instead of alert
    setToastMsg(`${qty} ${coin.symbol.toUpperCase()} added to portfolio!`);
    setQty('');
  };

  if (loading) return <Loader />;
  if (!coin) return <div className="error-msg">Coin not found</div>;

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      
      {/* <--- Render Toast if message exists */}
      {toastMsg && (
        <Toast 
          message={toastMsg} 
          onClose={() => setToastMsg(null)} 
        />
      )}

      <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src={coin.image.large} alt={coin.name} style={{ width: '80px' }} />
          <div>
            <h1 style={{ fontSize: '2.5rem' }}>{coin.name} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{coin.symbol}</span></h1>
            <div className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              ${coin.market_data.current_price.usd.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Market Cap</p>
            <h3>${coin.market_data.market_cap.usd.toLocaleString()}</h3>
          </div>
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>24h High</p>
            <h3 className="up">${coin.market_data.high_24h.usd.toLocaleString()}</h3>
          </div>
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>24h Low</p>
            <h3 className="down">${coin.market_data.low_24h.usd.toLocaleString()}</h3>
          </div>
        </div>

        {/* Add to Portfolio Section */}
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>Add to Portfolio</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="number" 
              placeholder="Quantity" 
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="glass-panel"
              style={{ padding: '10px', color: 'white', width: '200px', outline: 'none' }}
            />
            <button onClick={handleAdd} className="btn-neon">
              Add Asset
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 style={{ marginBottom: '10px' }}>About</h3>
          <p 
            style={{ lineHeight: '1.6', color: '#ccc' }} 
            dangerouslySetInnerHTML={{ __html: coin.description.en ? coin.description.en.split('. ')[0] + '.' : 'No description available.' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
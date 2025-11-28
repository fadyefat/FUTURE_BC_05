import { usePortfolio } from '../context/PortfolioContext';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Portfolio = () => {
  const { portfolio, removeFromPortfolio } = usePortfolio();

  const totalValue = portfolio.reduce((acc, item) => {
    return acc + (item.quantity * item.current_price);
  }, 0);

  return (
    <div className="container">
      <div className="glass-panel" style={{ margin: '40px 0', padding: '30px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>Total Balance</p>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem' }}>
          ${totalValue.toLocaleString()}
        </h1>
      </div>

      {portfolio.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Your portfolio is empty</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>Start by adding coins from the market.</p>
          <Link to="/" className="btn-neon">Go to Market</Link>
        </div>
      ) : (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--glass-border)' }}>
              <tr>
                <th style={{ padding: '20px' }}>Asset</th>
                <th style={{ padding: '20px' }}>Quantity</th>
                <th style={{ padding: '20px' }}>Price</th>
                <th style={{ padding: '20px' }}>Total Value</th>
                <th style={{ padding: '20px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '30px', borderRadius: '50%' }} />
                    {item.name}
                  </td>
                  <td style={{ padding: '20px' }}>{item.quantity}</td>
                  <td style={{ padding: '20px' }}>${item.current_price.toLocaleString()}</td>
                  <td style={{ padding: '20px', color: 'var(--neon-blue)' }}>
                    ${(item.quantity * item.current_price).toLocaleString()}
                  </td>
                  <td style={{ padding: '20px' }}>
                    <button 
                      onClick={() => removeFromPortfolio(item.id)} 
                      className="btn-neon btn-danger"
                      style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
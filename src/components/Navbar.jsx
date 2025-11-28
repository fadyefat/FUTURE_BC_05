import { Link } from 'react-router-dom';
import '../styles/main.css';

const Navbar = () => {
  return (
    <nav className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <span className="text-gradient">CRYPTO</span>TRACK
        </Link>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Market</Link>
          <Link to="/portfolio" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Portfolio</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
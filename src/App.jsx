import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Home from './pages/Home';
import CoinDetails from './pages/CoinDetails';
import Portfolio from './pages/Portfolio';
import { PortfolioProvider } from './context/PortfolioContext';
import './styles/main.css';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Background />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<CoinDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
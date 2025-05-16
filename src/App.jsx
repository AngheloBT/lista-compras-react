import { Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { Checkout } from './pages/Checkout'

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white p-3 flex gap-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/checkout" className="hover:underline">Resumen</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;

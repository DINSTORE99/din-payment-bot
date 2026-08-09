import { Link } from "react-router-dom";
import { CreditCard, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">
          <CreditCard size={18} />
        </span>
        <span>DIN PAY</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Beranda</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/history">Riwayat</Link>
      </nav>

      <Link to="/login" className="nav-button">
        Masuk
      </Link>

      <button className="mobile-menu" aria-label="Menu">
        <Menu size={21} />
      </button>
    </header>
  );
}

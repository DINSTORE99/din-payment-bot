import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>DIN PAY</strong>
        <span>Payment Gateway</span>
      </div>

      <div className="footer-links">
        <Link to="/">Beranda</Link>
        <Link to="/payment">Pembayaran</Link>
        <Link to="/history">Riwayat</Link>
      </div>

      <p>© {new Date().getFullYear()} DIN PAY. All rights reserved.</p>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { ArrowUpRight, CreditCard, Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <section className="container section">
      <div className="page-title">
        <span className="eyebrow">DASHBOARD</span>
        <h1>Dashboard DIN PAY</h1>
        <p>Dashboard dasar sudah siap. Login dan data transaksi akan ditambahkan.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Wallet size={21} />
          <span>Saldo</span>
          <strong>Rp 0</strong>
        </div>
        <div className="stat-card">
          <CreditCard size={21} />
          <span>Transaksi</span>
          <strong>0</strong>
        </div>
      </div>

      <div className="empty-card">
        <h2>Belum ada transaksi</h2>
        <p>Mulai transaksi pertama kamu melalui halaman pembayaran.</p>
        <Link to="/payment" className="primary-button">
          Buat pembayaran <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}

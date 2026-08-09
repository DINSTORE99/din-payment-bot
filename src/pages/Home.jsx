import { ArrowRight, CheckCircle2, LockKeyhole, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentCard from "../components/PaymentCard";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">DIN PAYMENT GATEWAY</span>

          <h1>
            Pembayaran
            <br />
            <span>lebih sederhana.</span>
          </h1>

          <p className="hero-text">
            Platform pembayaran DIN PAY untuk mengelola transaksi dengan
            cepat, aman, dan mudah.
          </p>

          <div className="hero-actions">
            <Link to="/payment" className="primary-button">
              Mulai pembayaran <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="secondary-button">
              Masuk akun
            </Link>
          </div>

          <div className="trust-row">
            <span><CheckCircle2 size={16} /> Sistem siap digunakan</span>
            <span><LockKeyhole size={16} /> Data terlindungi</span>
          </div>
        </div>

        <div className="hero-orb">
          <div className="orb-inner">
            <span>DIN</span>
            <strong>PAY</strong>
            <small>PAYMENT GATEWAY</small>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SYSTEM</span>
            <h2>Semua pembayaran dalam satu platform.</h2>
          </div>
          <p>
            Struktur awal DIN PAY sudah disiapkan untuk integrasi autentikasi,
            database, dan payment gateway.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <Zap size={22} />
            <h3>Cepat</h3>
            <p>Alur transaksi dibuat sederhana dan responsif.</p>
          </div>

          <div className="feature-card">
            <LockKeyhole size={22} />
            <h3>Aman</h3>
            <p>Secret key backend tidak ditempatkan di frontend.</p>
          </div>

          <div className="feature-card">
            <CheckCircle2 size={22} />
            <h3>Terstruktur</h3>
            <p>Frontend, API, dan database dipisahkan dengan jelas.</p>
          </div>
        </div>

        <PaymentCard />
      </section>
    </>
  );
}
